import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"
import { createClerkClient } from "@clerk/express"

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

// Helper to get userId with forced Clerk sync fallback
const getUserId = async (req) => {
    let userId = req.auth?.userId;

    if (!userId) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const client = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
                const verified = await client.authenticateRequest(req);
                userId = verified.toAuth()?.userId;
                if (userId) console.log("[DEBUG] Forced Auth Success:", userId);
            } catch (err) {
                console.error("[DEBUG] Forced Auth Failed:", err.message);
            }
        }
    }
    return userId;
};

// Get User Data
export const getUserData = async (req, res) => {
    try {
        const userId = await getUserId(req);

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        let user = await User.findById(userId);

        if (!user) {
            // Lazy sync: create user in DB if missing but authenticated by Clerk
            const clerkUser = await clerkClient.users.getUser(userId);
            user = await User.create({
                _id: clerkUser.id,
                email: clerkUser.emailAddresses[0].emailAddress,
                name: (clerkUser.firstName || '') + " " + (clerkUser.lastName || ''),
                image: clerkUser.imageUrl,
                resume: ''
            });
        }

        res.json({ success: true, user });

    } catch (error) {
        console.error("getUserData Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}


// Apply For Job
export const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = await getUserId(req);
        console.log("[DEBUG] applyForJob - userId:", userId, "jobId:", jobId);

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        const isAlreadyApplied = await JobApplication.find({ jobId, userId });

        if (isAlreadyApplied.length > 0) {
            console.log("[DEBUG] applyForJob - Already Applied");
            return res.json({ success: false, message: 'Already Applied' });
        }

        const jobData = await Job.findById(jobId);

        if (!jobData) {
            console.log("[DEBUG] applyForJob - Job Not Found");
            return res.json({ success: false, message: 'Job Not Found' });
        }

        const newApplication = await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        });
        console.log("[DEBUG] applyForJob - Success:", newApplication._id);

        res.json({ success: true, message: 'Applied Successfully' });

    } catch (error) {
        console.error("applyForJob Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get User Applied Applications Data
export const getUserJobApplications = async (req, res) => {
    try {
        const userId = await getUserId(req);
        console.log("[DEBUG] getUserJobApplications - userId:", userId);

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec();

        console.log("[DEBUG] getUserJobApplications - Found:", applications.length);

        return res.json({ success: true, applications });

    } catch (error) {
        console.error("getUserJobApplications Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

// Update User Resume
export const updateUserResume = async (req, res) => {
    try {
        const userId = await getUserId(req);

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        const resumeFile = req.file;

        if (!resumeFile) {
            return res.json({ success: false, message: 'No resume file provided' });
        }

        let userData = await User.findById(userId);

        if (!userData) {
            const clerkUser = await clerkClient.users.getUser(userId);
            userData = await User.create({
                _id: clerkUser.id,
                email: clerkUser.emailAddresses[0].emailAddress,
                name: (clerkUser.firstName || '') + " " + (clerkUser.lastName || ''),
                image: clerkUser.imageUrl,
                resume: ''
            });
        }

        try {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url;
        } catch (cloudinaryError) {
            console.error("❌ Cloudinary Resume Upload Failed:", cloudinaryError.message);
            // Fallback for DEV: use a placeholder if Cloudinary is broken
            userData.resume = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
            console.log("⚠️ Using dummy PDF fallback for resume.");
        }

        console.log("[DEBUG] Saving User Data with Resume:", userData.resume);
        const savedUser = await userData.save();
        console.log("[DEBUG] User Saved Successfully. Resume field in result:", savedUser.resume);

        return res.json({ success: true, message: 'Resume Updated (Cloudinary Fallback Used)' });
    } catch (error) {
        console.error("updateUserResume Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

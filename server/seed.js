import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";
import Company from "./models/Company.js";
import JobApplication from "./models/JobApplication.js";

dotenv.config({ path: "./.env", override: true });

const companiesData = [
    { name: "Slack", email: "jobs@slack.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/512px-Slack_icon_2019.svg.png" },
    { name: "Microsoft", email: "careers@microsoft.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png" },
    { name: "Amazon", email: "work@amazon.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png" },
    { name: "Walmart", email: "hiring@walmart.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Walmart_logo_2008.svg/512px-Walmart_logo_2008.svg.png" },
    { name: "Samsung", email: "recruit@samsung.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/512px-Samsung_Logo.svg.png" },
    { name: "Adobe", email: "jobs@adobe.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Adobe_Corporate_Logo.png/512px-Adobe_Corporate_Logo.png" },
    { name: "Google", email: "careers@google.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/512px-Google_%22G%22_logo.svg.png" },
    { name: "Meta", email: "jobs@meta.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png" },
    { name: "Netflix", email: "work@netflix.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png" },
    { name: "Apple", email: "careers@apple.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png" },
    { name: "Uber", email: "jobs@uber.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/512px-Uber_logo_2018.svg.png" },
    { name: "Airbnb", email: "hiring@airbnb.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_Belo.svg/512px-Airbnb_Logo_Belo.svg.png" },
    { name: "Spotify", email: "jobs@spotify.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_with_text.svg/512px-Spotify_logo_with_text.svg.png" },
    { name: "Stripe", email: "work@stripe.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png" },
    { name: "Dropbox", email: "jobs@dropbox.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_logo_2017.svg/512px-Dropbox_logo_2017.svg.png" },
    { name: "Oracle", email: "careers@oracle.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png" },
    { name: "Tesla", email: "work@tesla.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png" }
];

const jobsData = [
    { title: "Full Stack Developer", location: "California", level: "Senior Level", category: "Programming", salary: 82000, description: "Build scalable web applications with modern tech stacks." },
    { title: "Data Scientist", location: "New York", level: "Intermediate Level", category: "Data Science", salary: 72000, description: "Analyze big data and build predictive models." },
    { title: "UI/UX Designer", location: "Bangalore", level: "Beginner Level", category: "Designing", salary: 61000, description: "Create beautiful and intuitive user interfaces." },
    { title: "DevOps Engineer", location: "Washington", level: "Senior Level", category: "Programming", salary: 53000, description: "Automate deployment pipelines and manage cloud infra." },
    { title: "Software Engineer", location: "Hyderabad", level: "Intermediate Level", category: "Programming", salary: 91000, description: "Develop and maintain high-quality software solutions." },
    { title: "Network Engineer", location: "Bangalore", level: "Senior Level", category: "Networking", salary: 77000, description: "Manage and optimize global network infrastructure." },
    { title: "Project Manager", location: "Bangalore", level: "Senior Level", category: "Management", salary: 60000, description: "Lead cross-functional teams to deliver impactful products." },
    { title: "Mobile App Developer", location: "Hyderabad", level: "Intermediate Level", category: "Programming", salary: 112000, description: "Build native mobile experiences for iOS and Android." },
    { title: "Cloud Architect", location: "Hyderabad", level: "Senior Level", category: "Programming", salary: 96000, description: "Design scalable cloud solutions for high availability." },
    { title: "Technical Writer", location: "Mumbai", level: "Intermediate Level", category: "Marketing", salary: 72000, description: "Create clear and concise documentation for complex systems." },
    { title: "Cybersecurity Analyst", location: "Mumbai", level: "Intermediate Level", category: "Cybersecurity", salary: 62000, description: "Protect systems and data from evolving security threats." },
    { title: "Business Analyst", location: "Mumbai", level: "Intermediate Level", category: "Management", salary: 68000, description: "Optimize business processes through data-driven insights." },
    { title: "Marketing Specialist", location: "Chennai", level: "Beginner Level", category: "Marketing", salary: 77000, description: "Drive engagement and growth through creative campaigns." },
    { title: "Graphic Designer", location: "Chennai", level: "Intermediate Level", category: "Designing", salary: 91000, description: "Develop visual identities and marketing collateral." },
    { title: "Software Tester", location: "Chennai", level: "Intermediate Level", category: "Programming", salary: 123000, description: "Ensure software quality through comprehensive testing." },
    { title: "Network Security Engineer", location: "Bangalore", level: "Senior Level", category: "Cybersecurity", salary: 87000, description: "Implement robust security measures for enterprise networks." },
    { title: "Cloud Engineer", location: "Hyderabad", level: "Intermediate Level", category: "Programming", salary: 102000, description: "Manage and scale cloud-based application infrastructure." }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB for seeding");

        await Job.deleteMany({});
        await Company.deleteMany({});
        await JobApplication.deleteMany({});

        // Create Companies
        const createdCompanies = await Company.insertMany(
            companiesData.map(c => ({ ...c, password: "hashedpassword123" }))
        );
        console.log(`✅ ${createdCompanies.length} companies created`);

        // Create Jobs with unique companyIds (1-to-1 mapping)
        const jobsToSeed = jobsData.map((job, index) => {
            const company = createdCompanies[index]; // Each job gets a unique company
            return {
                ...job,
                visible: true,
                date: Date.now(),
                companyId: company._id
            };
        });

        await Job.insertMany(jobsToSeed);
        console.log(`✅ ${jobsToSeed.length} jobs seeded successfully with text-inclusive logos!`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error.message);
        process.exit(1);
    }
};

seedDB();

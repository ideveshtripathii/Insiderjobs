import dotenv from "dotenv";
dotenv.config();

if (process.env.NODE_ENV !== 'production') {
    console.log("✅ Environment Variables Loaded (Development)");
}

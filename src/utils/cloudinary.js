import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// 1. Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Check environment variables
console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API key:", process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing");
console.log("API secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");

// 3. Upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

       // console.log("File uploaded successfully:", response.url);

        // Remove local temporary file after successful upload
       // if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
       // }

        return response;

    } catch (error) {
        console.log("Cloudinary upload error:", error);

        // // Remove temporary file if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export { uploadOnCloudinary };

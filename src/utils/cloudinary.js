//This is for upload photos and videos on cloudinary

import { v2 as cloudinary } from "cloudinary";
import fs from "fs"


(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    })
})

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if (!localFilePath) return null
        //upload file onthe cloudinary
           const response  = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })
         //file has been uploaded successfully 
         console.log("File uploded on cloudinary successfully",response.url)//it gives url after upolding the file 
         return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        // remove the locally saved temporory file as the upload opration got failed
        return null;
        
    }


}

export {uploadOnCloudinary}
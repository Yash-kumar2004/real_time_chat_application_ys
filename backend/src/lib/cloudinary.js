import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';

// ✅ Load environment variables BEFORE using them
dotenv.config();


// console.log("ENV values for Cloudinary:");
// console.log("cloud_name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("api_key:", process.env.CLOUDINARY_API_KEY);
// console.log("api_secret:", process.env.CLOUDINARY_API_SECRET);


cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
        api_key:process.env.CLOUDINARY_API_KEY, // Your
        api_secret:process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
})

export default cloudinary
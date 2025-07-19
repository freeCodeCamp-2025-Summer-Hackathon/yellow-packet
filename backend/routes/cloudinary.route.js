    import express from "express";
    import { v2 as cloudinary } from "cloudinary";
    import dotenv from "dotenv";

    dotenv.config();

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const router = express.Router();

    router.get("/api/cloudinary-signature", async (req, res) => {
      try {
        /* We can add conditions here based on user roles, etc.
        For example, only authenticated shelter users can request a signature. */
        const timestamp = Math.round(new Date().getTime() / 1000);
        const params = {
          timestamp: timestamp,
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, // Use an upload preset for validation
        };

        const signature = cloudinary.utils.api_sign_request(
          params,
          process.env.CLOUDINARY_API_SECRET
        );

        res.status(200).json({
          signature: signature,
          timestamp: timestamp,
          cloudname: process.env.CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.CLOUDINARY_API_KEY,
          uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
        });
      } catch (err) {
        console.error("Cloudinary signature generation failed:", err);
        res.status(500).json({ success: false, error: err.message });
      }
    });

    export default router;
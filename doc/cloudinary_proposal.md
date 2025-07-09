# Cloudinary Integration Proposal for PetMatch

## Overview

PetMatch needs a reliable solution to store and deliver pet images for each shelter. Cloudinary provides hosted media storage, a global content delivery network, automatic optimizations, and on-the-fly transformations. This proposal outlines how to store images, how the backend will handle uploads and metadata, and how the frontend will retrieve and display images.

    Before settling on Cloudinary, I explored the possibility of storing and serving pet images directly from our own server. While feasible for a basic MVP, it introduced several issues: handling file uploads, ensuring secure storage, serving assets with proper caching headers, scaling for global users, and guarding against DDoS/image spam. We'd also need to implement image transformations manually for responsive viewing. Cloudinary solves all of that out of the box, offloading media concerns entirely so we can focus on building PetMatch.

---

## Image Storage Strategy

- Create a Cloudinary account and configure a dedicated media folder structure

  - We will use a structured `publicId` format like: `shelters/{shelterId}/pets/{petId}/headshot`

- Leverage Cloudinary’s free tier (25 GB managed media, 25 GB transformations) during development

- Rely on Cloudinary’s CDN for global caching and low-latency delivery

- Enable automatic format negotiation (WebP/AVIF) and quality optimizations without additional code

- Cloudinary assigns a `publicId` to each uploaded image. It acts as both the asset’s unique name and its path within your account. This string includes folder structure and filename (without extension), letting us organize images logically by shelter and pet.

- Instead of letting Cloudinary auto-generate the `publicId`, we can define it manually when uploading an image for clarity and traceability. For example:
  `publicId: "shelters/42/pets/456/headshot"`

---

## Backend Integration

1. Install and configure the Cloudinary SDK in our Node.js backend

   - Use the `cloudinary` npm package
   - Store `cloud_name`, `api_key`, and `api_secret` as environment variables to keep credentials secure

2. Implement an upload endpoint in Express

   - Accept a Base64 image string or multipart form data from the frontend
   - Use the naming convention `shelters/{shelterId}/pets/{petId}/headshot` for `public_id` to keep the storage structure consistent
   - Call `cloudinary.uploader.upload` with the image and custom `public_id`
   - Receive `public_id` and `secure_url` from Cloudinary's response

3. Store image metadata in our MongoDB database alongside pet and shelter records
   ```json
   {
     "shelterId": 42,
     "petId": 456,
     "publicId": "shelters/42/pets/456/headshot",
     "imageUrl": "https://res.cloudinary.com/<cloud_name>/image/upload/shelters/42/pets/456/headshot.jpg",
     "uploadedAt": "2025-07-08T19:00:00Z"
   }
   ```
4. Example of upload endpoint:
   `routes/imageUpload.js (Express Endpoint)`

   ```jsx
   import express from "express";
   import { v2 as cloudinary } from "cloudinary";
   import Pet from "../models/Pet.js"; // if this is our mongoose model
   import dotenv from "dotenv";

   dotenv.config();

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
   });

   const router = express.Router();

   router.post("/api/images/upload", async (req, res) => {
     try {
       const { petId, shelterId, imageBase64 } = req.body;

       const publicId = `shelters/${shelterId}/pets/${petId}/headshot`;

       const result = await cloudinary.uploader.upload(imageBase64, {
         public_id: publicId,
         overwrite: true,
       });

       const imageUrl = result.secure_url;

       await Pet.findByIdAndUpdate(petId, {
         publicId: publicId,
         imageUrl: imageUrl,
         uploadedAt: new Date(),
       });

       res.status(200).json({ success: true, imageUrl, publicId });
     } catch (err) {
       console.error("Cloudinary upload failed:", err);
       res.status(500).json({ success: false, error: err.message });
     }
   });

   export default router;
   ```

---

## Frontend Integration

- On pet creation or editing of pet pages, we can use Cloudinary’s hosted upload widget or a custom file input to select images.

  - I recommend we opt for using Cloudinary's hosted upload widget, as it is incredibly quick and easy to include with a few lines of code, but if we want a custom react component that looks like it belongs on our site, we could maybe make that a sprint 4 feature (if time permits), totally up to the team.

  - Example:

    ```jsx
       <button id="upload_widget" class="cloudinary-button">Upload files</button>
       <script src="https://upload-widget.cloudinary.com/latest/global/all.js" type="text/javascript"></script>
       <script type="text/javascript">
       var myWidget = cloudinary.createUploadWidget({
       cloudName: 'my_cloud_name',
       uploadPreset: 'my_preset'}, (error, result) => {
          if (!error && result && result.event === "success") {
             console.log('Done! Here is the image info: ', result.info);
          }
       }
       )
       document.getElementById("upload_widget").addEventListener("click", function(){
          myWidget.open();
       }, false);
       </script>
    ```

- After upload, we receive the `secure_url` and `public_id` from the backend response. Store these in our application state and send to the pet-create API.

  - Once we POST to our backend upload endpoint (/api/images/upload), it responds with:
    - secure_url: the HTTPS CDN URL for the image
    - public_id: the structured file ID stored in Cloudinary
  - Our frontend should take this response and:
    - Store the data in our form state (e.g. inside a React hook)
    - Include these values in our pet-create API request so they’re linked to the pet record

- When rendering pet cards or detail views, fetch pet data from the backend and bind the `imageUrl` to an `<img>` element. `loading="lazy"` allows us to defer loading until the image scrolls into view, using less bandwidth and making the page load faster.

  Example:

  ```jsx
  <img
    src={pet.imageUrl}
    alt={`Photo of ${pet.name}`}
    loading="lazy"
    style={{ width: "100%", height: "auto" }}
  />
  ```

- Use `srcset` and transformation parameters in the URL for responsive sizing if needed (this is one of the reasons we save both the public_url and the public_id, as our public_id is a reference to the image that allows us to perform transformations on it; resize, crop, etc.)

  - Example:

    ```jsx
    <img
      src={`https://res.cloudinary.com/<cloud_name>/image/upload/w_600/${pet.publicId}.jpg`}
      srcSet={`
       https://res.cloudinary.com/<cloud_name>/image/upload/w_300/${pet.publicId}.jpg 300w,
       https://res.cloudinary.com/<cloud_name>/image/upload/w_600/${pet.publicId}.jpg 600w,
       https://res.cloudinary.com/<cloud_name>/image/upload/w_900/${pet.publicId}.jpg 900w
    `}
      sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px"
      alt={`Photo of ${pet.name}`}
      loading="lazy"
    />
    ```

  - This technique improves performance across devices without needing breakpoints in our CSS

---

## Security and Access Control

- Keep Cloudinary credentials secure in environment variables

- Validate file type and size on the backend before uploading. Cloudinary accepts most file types, and we don’t want random junk hitting our upload flow. We should:

  - Check that the file is an image (image/jpeg, image/png, etc.)
  - Limit size to avoid huge uploads (e.g. max 2MB)
  - This can be enforced before passing the image to Cloudinary.

    Example:

    `middleware/validateImage.js`

    ```jsx
    export default function validateImage(req, res, next) {
      const { imageBase64 } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: "Missing image data." });
      }

      // Check MIME type using data URL prefix
      const matches = imageBase64.match(/^data:(image\/\w+);base64,/);

      if (!matches || !["image/jpeg", "image/png"].includes(matches[1])) {
        return res
          .status(400)
          .json({ error: "Invalid image type. Only JPG and PNG allowed." });
      }

      // Estimate file size from Base64 length (not perfect, but works for limits)
      const sizeInBytes =
        (imageBase64.length * 3) / 4 -
        (imageBase64.endsWith("==") ? 2 : imageBase64.endsWith("=") ? 1 : 0);
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (sizeInBytes > maxSize) {
        return res
          .status(413)
          .json({ error: "Image is too large. Max size is 2MB." });
      }

      next(); // Pass to Cloudinary upload route
    }
    ```

    Usage in `routes/imageUpload.js`

    ```jsx
    import validateImage from "../middleware/validateImage.js";

    router.post("/api/images/upload", validateImage, async (req, res) => {
      // Safe to proceed — file type and size passed validation
      // Cloudinary upload logic goes here (check above in Backend Integration for example)
    });
    ```

- Enforce authorization checks to ensure no anonymous uploads

  - Example:

    `requireAuth.js` middleware:

    ```jsx
    import jwt from "jsonwebtoken";

    export default function requireAuth(req, res, next) {
      const token = req.cookies.accessToken;
      if (!token)
        return res.status(401).json({ error: "Authentication required" });

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        res.status(403).json({ error: "Invalid or expired token" });
      }
    }
    ```

    `requireShelter.js` middleware:

    ```jsx
    export default function requireShelter(req, res, next) {
      if (req.user?.role !== "shelter") {
        return res.status(403).json({ error: "Shelter access only" });
      }
      next();
    }
    ```

    Used together in a route:

    ```jsx
    import express from "express";
    import requireAuth from "../middleware/requireAuth.js";
    import requireShelter from "../middleware/requireShelter.js";

    router.post(
      "/api/images/upload",
      requireAuth,
      requireShelter,
      async (req, res) => {
        // Image upload logic here (see above in "Backend Integration" for example)
      }
    );
    ```

- Rely on Cloudinary’s HTTPS delivery and automatic DDoS protection

  - The image URLs we receive from Cloudinary use HTTPS by default:

    - This keeps requests encrypted (important for privacy and security)
    - Cloudinary’s edge network blocks suspicious traffic before it hits our origin
    - We don’t need to configure TLS or caching headers manually — it’s all baked in

---

## Next Steps:

1. Provision a Cloudinary account and obtain credentials (free tier will more than suffice for MVP)

2. Add Cloudinary SDK to the backend and implement the upload API

3. Create a simple React component for image uploads and previews

4. Update pet creation and detail views to include image display

5. Test upload, storage, and delivery workflows under various network conditions

> Implementing Cloudinary will minimize infrastructure overhead, streamline development, and ensure pet images are delivered quickly and reliably to users around the world.

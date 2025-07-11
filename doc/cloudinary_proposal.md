# Cloudinary Integration Proposal for PetMatch

## Overview

PetMatch needs a reliable solution to store and deliver pet images for each shelter. Cloudinary provides hosted media storage, a global content delivery network, automatic optimizations, and on-the-fly transformations. This proposal outlines how to store images, how the backend will handle _metadata_, and how the frontend will _directly upload images to Cloudinary and then notify the backend_. It also covers how the frontend will retrieve and display images.

Before settling on Cloudinary, I explored the possibility of storing and serving pet images directly from our own server. While feasible for a basic MVP, it introduced several issues: handling file uploads, ensuring secure storage, serving assets with proper caching headers, scaling for global users, and guarding against DDoS/image spam. We'd also need to implement image transformations manually for responsive viewing. Cloudinary solves all of that out of the box, offloading media concerns entirely so we can focus on building PetMatch.

---

## Image Storage Strategy

- Create a Cloudinary account and configure a dedicated media folder structure

  [x] Done, `Cloud name: dpenpix4z`

- Leverage Cloudinary’s free tier (25 Credits a month for free, each credit is equal to 1000 transformations / 1GB of storage space / 1 GB of bandwidth) during development. This will be more than enough for our MVP.

- Rely on Cloudinary’s CDN for global caching and low-latency delivery

- Enable automatic format negotiation (WebP/AVIF) and quality optimizations without additional code

  - Cloudinary's automatic format selection feature `f_auto` automatically delivers the most suitable image format (WebP, AVIF, or others) based on the user's browser.
    To enable this, we simply add f_auto to your image delivery URLs. For example:
    https://res.cloudinary.com/dpenpix4z/image/upload/w_400,f_auto/{public_id}.jpg
    Al

- Cloudinary automatically generates a unique `publicId` for each uploaded image. This `publicId` acts as both the asset’s unique name and its path within your account. When performing signed uploads initiated from the frontend via the Cloudinary upload widget, we will leverage Cloudinary's ability to auto-generate the `publicId` as part of the simplified and secure upload workflow.

---

## Backend Integration

1.  Install and configure the Cloudinary SDK in our Node.js backend.

    - Use the `cloudinary` npm package.
    - Store `cloud_name`, `api_key`, and `api_secret` as environment variables to keep credentials secure. These credentials are essential for generating secure upload signatures and for any server-side management tasks (e.g., deleting images, fetching details).

2.  Implement an endpoint to provide a secure upload signature to the frontend.

    - The frontend will request a signature from this endpoint before initiating a direct upload to Cloudinary.
    - This signature ensures that the upload request is authorized by our application.

3.  Implement an endpoint to receive and store image metadata from the frontend.

    - After a successful direct upload to Cloudinary, the frontend will receive the `publicId` and `secure_url` from Cloudinary.
    - The frontend will then send this `publicId` and `secure_url` to our backend.
    - Our backend will store this image metadata in our MongoDB database alongside the relevant pet and shelter records.

4.  Example of signature generation endpoint:
    `routes/cloudinarySignature.js (Express Endpoint)`

    ```jsx
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
    ```

## Frontend Integration

- On pet creation or editing pages, we will use Cloudinary’s hosted upload widget for direct, signed uploads. This offloads the file handling and validation to Cloudinary and streamlines our frontend development.

  - We will first make an API call to our backend (`/api/cloudinary-signature`) to obtain a secure upload signature, timestamp, cloud name, API key, and upload preset.
  - This signature will be used with the Cloudinary upload widget to perform a secure, authenticated upload directly from the user's browser to Cloudinary.
  - Cloudinary upload presets, configured in the Cloudinary dashboard, will enforce file type and size validation on their server, ensuring that only valid images are stored. This provides a robust security check even if client-side validation is bypassed.

  - Example using the Cloudinary Upload Widget with a signed request (conceptual):

    ```jsx
       <button id="upload_widget" class="cloudinary-button">Upload Pet Photo</button>
       <script src="https://upload-widget.cloudinary.com/latest/global/all.js" type="text/javascript"></script>
       <script type="text/javascript">
       // Function to get signature from the backend
       async function getCloudinarySignature() {
           const response = await fetch('/api/cloudinary-signature');
           if (!response.ok) {
               throw new Error('Failed to get Cloudinary signature');
           }
           return response.json();
       }

       document.getElementById("upload_widget").addEventListener("click", async function(){
           try {
               const { signature, timestamp, cloudname, apiKey, uploadPreset } = await getCloudinarySignature();

               var myWidget = cloudinary.createUploadWidget({
                   cloudName: cloudname,
                   apiKey: apiKey,
                   uploadPreset: uploadPreset, // Ensure this points to a signed preset
                   signature: signature,
                   timestamp: timestamp,
                   // public_id is auto-generated by Cloudinary since we omit it
               }, (error, result) => {
                   if (!error && result && result.event === "success") {
                       console.log('Done! Here is the image info: ', result.info);
                   } else if (error) {
                       console.error("Cloudinary upload widget error:", error);
                   }
               });

               myWidget.open();
           } catch (err) {
               console.error("Error setting up Cloudinary widget:", err);
               alert("Could not open upload widget. Please try again.");
           }
       }, false);
       </script>
    ```

- After a successful direct upload to Cloudinary, the frontend receives the `public_id` and `secure_url` directly from Cloudinary's upload widget response.

  - **For New Pet Creation:** These values should be temporarily stored in the frontend's form state. When the user submits the entire "Create Pet" form, the `public_id` and `secure_url` will be included in the POST request to the backend's new pet creation endpoint (e.g., `/api/pets`), where they will be saved as part of the new pet's record.
  - **For Editing an Existing Pet:** The `public_id` and `secure_url` can be sent in a PUT request to the backend's image metadata update endpoint to modify the existing pet's image.

## Security and Access Control

- Keep Cloudinary credentials secure in environment variables.

- **Leverage Cloudinary Upload Presets for File Validation:**

  - Instead of validating file type and size on our backend for direct uploads, we will configure **upload presets** in the Cloudinary dashboard.
  - These presets allow us to define server-side rules for incoming uploads, such as:
    - **Allowed file types:** (e.g., `jpg`, `png`, `webp`)
    - **Maximum file size:** (e.g., `2MB`)
    - **Image dimensions:** (e.g., minimum/maximum width/height)
  - When the frontend uses the Cloudinary upload widget with a signed request that includes this preset, Cloudinary will validate the file against these rules _before_ storing it. If the file does not meet the criteria, Cloudinary wont' allow the file to upload and instead will return an error. This is a secure and efficient way to enforce constraints without burdening our own backend with file processing.

- Enforce authorization checks for signature generation and metadata storage:

  - We will use middleware on our backend to ensure that only authenticated and authorized users (specifically, users with the "shelter" role) can:

    - Request a secure upload signature from `/api/cloudinary-signature`.
    - Submit image metadata (public_id, secure_url) to our pet creation/update endpoints (e.g., `/api/pets` or `/api/pets/:petId`).

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

    Used together in backend routes (e.g., for signature generation or pet creation):

    ```jsx
    import express from "express";
    import requireAuth from "../middleware/requireAuth.js";
    import requireShelter from "../middleware/requireShelter.js";

    // Example for signature generation endpoint
    router.get(
      "/api/cloudinary-signature",
      requireAuth,
      requireShelter,
      async (req, res) => {
        // Cloudinary signature generation logic here
      }
    );

    // Example for creating a new pet (where image metadata is also sent)
    router.post("/api/pets", requireAuth, requireShelter, async (req, res) => {
      // Logic to create pet record and save image metadata
    });
    ```

- Rely on Cloudinary’s HTTPS delivery and automatic DDoS protection:

  - The image URLs we receive from Cloudinary use HTTPS by default:
    - This keeps requests encrypted (important for privacy and security).
    - Cloudinary’s edge network blocks suspicious traffic before it hits our origin.
    - We don’t need to configure TLS or caching headers manually — it’s all baked in.

---

## Next Steps:

1.  Provision a Cloudinary account, configure necessary **upload presets** for validation (file type, size), and obtain API credentials (free tier will more than suffice for MVP).

2.  Add Cloudinary SDK to the backend and implement the **signature generation endpoint** (`/api/cloudinary-signature`) and the **metadata storage endpoint** (e.g., `/api/pets` for new pets, or a `PUT /api/pets/:petId` for updates).

3.  Create a simple React component that integrates the Cloudinary **upload widget** for image selection and direct uploads, handling the signature request and subsequent metadata submission.

4.  Update pet creation and detail views to integrate the image upload component, display image previews, and handle the `publicId` and `secure_url` within the pet data.

5.  Test the complete workflow: signature generation, direct frontend upload to Cloudinary, backend metadata storage, and image retrieval/display under various network conditions.

**Implementing Cloudinary will minimize infrastructure overhead, streamline development, and ensure pet images are delivered quickly and reliably to users around the world.**

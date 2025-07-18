import express from "express";
import { Shelter, User, PetProfile } from "../schemas/schema.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userExist = await User.findById({ username: req.body.email }).lean();
    if (!userExist) {
      return res.status(404).json({ error: "User not found" });
    }
    const shelterExists = await Shelter.findById({
      id: req.body.user_id,
    }).lean();

    if (!shelterExists) {
      return res.status(400).json({ error: "Shelter doesn't exist" });
    }

    const petExists = await PetProfile.findById({ id: req.body.pet_id }).lean();
    if (!petExists) {
      return res.status(400).json({ error: "Shelter doesn't exist" });
    }
    const request = await Request.create({
      user_id: userExist._id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      city: req.body.city,
      bio: req.body.bio,
    });

    return res.status(201).json({
      error: false,
      message: "Request created successfully",
      data: request,
    });
  } catch (error) {
    return handleError(error, res);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Request.find({}).lean();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Request.findById(req.params.id).lean();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!result) {
      return res.status(404).json({ error: "Request not found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id).lean();
    return res.json({ message: "Request deleted", data: request });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;

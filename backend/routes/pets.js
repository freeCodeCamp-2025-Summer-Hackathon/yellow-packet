
import express from 'express';
import Pet from '../models/petModel.js'; // Use import and add .js extension

const router = express.Router();



// Get all pets
router.get('/', async (req, res) => {
  try {





    const pets = await Pet.find({});
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get a single pet
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new pet
router.post('/', async (req, res) => {
  const pet = new Pet(req.body);
  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (error)_ {
    res.status(400).json({ message: error.message });
  }
});

// Update a pet
router.put('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a pet
router.delete('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; // Use export default instead of module.exports
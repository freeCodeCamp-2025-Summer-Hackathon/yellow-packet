import { PetProfile, AdopterProfile } from "../schemas/schema.js";

export const addPetProfile = async (values) => {
	try {
		const result = await PetProfile.create(values);
		return {
			error: false,
			message: "Pet added successfully",
			data: result.toJSON(),
		};
	} catch (error) {
		return { error: true, message: error.message };
	}
};

export const updatePetProfile = async (id, values) => {
	try {
		const result = await PetProfile.findByIdAndUpdate(id, values, {
			new: true,
			runValidators: true,
		}).lean();
		if (!result) {
			return { error: true, message: "Pet not found" };
		}
		return { error: false, data: result };
	} catch (error) {
		return { error: true, message: error.message };
	}
};

export const deletePetProfile = async (id) => {
	try {
		const result = await PetProfile.findByIdAndDelete(id).lean();
		if (!result) {
			return { error: true, message: "Pet not found" };
		}
		return { error: false, message: "Pet deleted", data: result };
	} catch (error) {
		return { error: true, message: error.message };
	}
};

export const getAllPets = async (params) => {
	try {
		const result = await PetProfile.find(params).lean();
		return { error: false, data: result };
	} catch (error) {
		return { error: true, message: error.message };
	}
};

export const getPet = async (id) => {
	try {
		const result = await PetProfile.findById(id).lean();
		return { error: false, data: result };
	} catch (error) {
		return { error: true, message: error.message };
	}
};
export const getFavouritePets = async (params) => {
	try {
		if (!params.user_id) {
			return { error: true, message: "User ID is required (_id)" };
		}
		const result = await AdopterProfile.find({ _id: params.user_id }).lean();
		if (!result) {
			return { error: true, message: "Adopter not found" };
		}
		const favouritePets = result.favourite_pets;
		const pets = await PetProfile.find({
			pet_uid: { $in: favouritePets },
		}).lean();
		if (!pets) {
			return { error: true, message: "No favourite pets found" };
		}
		return { error: false, data: result };
	} catch (error) {
		return { error: true, message: error.message };
	}
};

export const addFavouritePet = async (user_id, petUid) => {
	try {
		const adopter = await AdopterProfile.findById(user_id).lean();
		if (!adopter) {
			return { error: true, message: "Adopter not found" };
		}
		if (adopter.favourite_pets.includes(petUid)) {
			return { error: true, message: "Pet already in favourites" };
		}
		adopter.favourite_pets.push(petUid);
		const updatedAdopter = await AdopterProfile.findByIdAndUpdate(
			user_id,
			{ favourite_pets: adopter.favourite_pets },
			{ new: true, runValidators: true }
		).lean();
		return { error: false, data: updatedAdopter };
	} catch (error) {
		return { error: true, message: error.message };
	}
}


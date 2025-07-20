import { useState } from "react";

const initialState = {
  name: "",
  type: "",
  breed: "",
  age: "",
  availability: "Available",
  disposition: "",
  picture: "",
};

export default function CreatePet() {
  const [pet, setPet] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pet created!");
    console.log(pet);
    setPet(initialState);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10 border border-purple-300">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-6 text-center">
          Add a New Pet
        </h1>
        <p className="text-purple-600 text-center mb-8 text-lg">
          Fill out the form below to add a new pet to the PetMatch database.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-purple-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 text-purple-800"
              value={pet.name}
              onChange={handleChange}
              placeholder="Enter pet's name"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-purple-700 font-medium mb-2">
              Type (e.g., Dog, Cat)
            </label>
            <input
              type="text"
              id="type"
              name="type"
              className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 text-purple-800"
              value={pet.type}
              onChange={handleChange}
              placeholder="Enter pet type"
              required
            />
          </div>
          <div>
            <label htmlFor="breed" className="block text-purple-700 font-medium mb-2">
              Breed
            </label>
            <input
              type="text"
              id="breed"
              name="breed"
              className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 text-purple-800"
              value={pet.breed}
              onChange={handleChange}
              placeholder="Enter pet breed"
              required
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-purple-700 font-medium mb-2">
              Age (Years)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 text-purple-800"
              value={pet.age}
              onChange={handleChange}
              placeholder="Enter pet age"
              required
            />
          </div>
          <div>
            <label htmlFor="availability" className="block text-purple-700 font-medium mb-2">
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800"
              value={pet.availability}
              onChange={handleChange}
              required
            >
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Adopted">Adopted</option>
            </select>
          </div>
          <div>
            <label htmlFor="disposition" className="block text-purple-700 font-medium mb-2">
              Disposition
            </label>
            <textarea
              id="disposition"
              name="disposition"
              className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 text-purple-800 resize-none"
              value={pet.disposition}
              onChange={handleChange}
              placeholder="Describe the pet's disposition"
              rows={4}
              required
            />
          </div>
          <div>
            <label htmlFor="picture" className="block text-purple-700 font-medium mb-2">
              Picture URL
            </label>
            <input
              type="url"
              id="picture"
              name="picture"
              className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 text-purple-800"
              value={pet.picture}
              onChange={handleChange}
              placeholder="Enter picture URL"
              required
            />
            {pet.picture && (
              <div className="mt-4 flex justify-center">
                <img
                  src={pet.picture}
                  alt="Pet Preview"
                  className="rounded-lg shadow-md w-64 h-48 object-cover border border-purple-300"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition shadow-md"
          >
            Create Pet Profile
          </button>
        </form>
      </div>
    </div>
  );
}

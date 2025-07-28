import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../schemas/schema.js";

export const login = async (req, res) => {
  const { name, email, password } = req.body;

  // Add basic validation
  if (!name || email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // Simulate user lookup for now (in a real scenario, you'd query your DB)
  const user = {
    id: "1",
    name: "John Doe",
    email: email,
    password: "hashed-password",
  };

  // Compare the password with the stored hash (using bcrypt)
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({
      success: false,
      message: "Password is incorrect",
    });
  }

  // // Generate a JWT token
  // const token = jwt.sign(
  //   { userId: user.id, email: user.email, name: user.name },
  //   process.env.JWT_SECRET_KEY, // Set JWT_SECRET_KEY in your environment
  //   { expiresIn: "1h" } // Token expires in 1 hour
  // );

  // Your login logic here
  // For now, just return success response
  res.json({
    success: true,
    message: "Login successful",
    user: {
      id: "1",
      name: "John Doe",
      email: email,
    },
    token: "jwt-token-here",
  });
};

// Signup Controller
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  // Check if the user already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists",
    });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user object
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    // Save the new user to the database
    await newUser.save();

    // Generate JWT token
    // const token = jwt.sign(
    //   { userId: newUser._id, name: newUser.name, email: newUser.email },
    //   process.env.JWT_SECRET_KEY, // Use the same secret key for token generation
    //   { expiresIn: "1h" } // Token expires in 1 hour
    // );

    // Respond with success message, user data, and JWT token
    res.status(201).json({
      success: true,
      message: "User successfully created",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
    });
  }
};

export const logout = async (req, res) => {
  res.send("Logout Route CALLED");
};

import User from "../models/UserSchema.js"; 
import Doctor from "../models/DoctorSchema.js"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generateToken = user =>  {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
}

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;
    // Check if the user already exists
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      // User already exists
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    if (role === "patient") {
      user = new User({
        email,
        password: hashPassword,
        name,
        role,
        photo,
        gender,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        email,
        password: hashPassword,
        name,
        role,
        photo,
        gender,
      });
    }

    // Save the user to the database
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    // Internal server error
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, try again!" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;

    // Check if the user exists
    // Adjust this based on your user roles (patient/doctor)
    user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User not found" });
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    // Generate and send a token
    const token = generateToken(user);
const {password, role, appointments, ...rest} = user._doc

    res.status(200).json({ status: true, message: "Successfully login", token, data:{...rest}, role });
  } catch (err) {
return res
        .status(500)
        .json({ status: false, message: "Failed to login" })    
  }
};


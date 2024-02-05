import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const authenticate = async (req, res, next) => {
  // get token from headers
  const authToken = req.headers.authorization;

  // check if token exists
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "No token authentication failed",
    });
  }

  try {
    const token = authToken.split("")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;

    next(); // Must call it or no running
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is Expired" });
    }
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user;

  patient = await User.findById(userId);
  doctor = await Doctor.findByid(userId);

  if (patient) {
    user = patient;
  }

  if (doctor) {
    user = doctor;
  }
  if (!roles.includes(user.role)) {
    res.status(401).json({
      success: false,
      message: "You are not authorised",
    });
  }
  next();
};

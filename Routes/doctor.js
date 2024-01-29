import express from "express";
import {
  getAllDoctor,
  getSingleDoctor,
  deleteDoctor,
  updateDoctor,
} from "../Controllers/doctorController.js";

const router = express.Router()

router.get("/", getAllDoctor);
router.get("/:id", getSingleDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);



export default router
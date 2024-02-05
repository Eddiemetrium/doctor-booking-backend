import express from "express";
import {
  getAllDoctor,
  getSingleDoctor,
  deleteDoctor,
  updateDoctor,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router()

router.get("/", getAllDoctor);
router.get("/:id",getSingleDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);



export default router
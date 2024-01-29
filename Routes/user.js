import express from "express";
import {
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
} from "../Controllers/userController.js";

const router = express.Router()

router.get("/", getAllUser);
router.get('/:id', getSingleUser)
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);



export default router
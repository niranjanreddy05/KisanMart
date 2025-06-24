import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getPostsByUserId,
} from "../controllers/market-controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.delete("/:id", verifyToken, deletePost);
router.get("/single/:id", getPost);
router.get("/", getPosts);
router.get("/user/:userId", verifyToken, getPostsByUserId);

export default router;
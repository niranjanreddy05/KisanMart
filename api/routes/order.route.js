import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, createOrder } from "../controllers/market-controller.js";

const router = express.Router();

router.post("/:postId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

export default router;
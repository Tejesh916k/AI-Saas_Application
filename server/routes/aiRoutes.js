import express from "express";
import { generateArticle } from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

// Order matters: requireAuth → auth → controller
router.post("/generate-article", requireAuth(), auth, generateArticle);

export default router;

import express from "express";
import { StoryConsistencyController } from "./story_consistency.controller";
import auth from "../../middleware/auth.middleware";
import freeAiRateLimiter from "../../middleware/free-ai.rate-limiter";

const router = express.Router();

router.post(
  "/analyze",
  freeAiRateLimiter,
  StoryConsistencyController.analyze
);

router.post(
  "/analyze-auth",
  auth(),
  StoryConsistencyController.analyze
);

router.post(
  "/track-facts",
  freeAiRateLimiter,
  StoryConsistencyController.trackFacts
);

router.post(
  "/track-facts-auth",
  auth(),
  StoryConsistencyController.trackFacts
);

export const StoryConsistencyRouter = router;
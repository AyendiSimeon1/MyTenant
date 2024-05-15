import express from "express";
import { validate } from "../middlewares/validate-input";
import {
  changePasswordController,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/sign-in", validate(LoginInputSchema), loginController);
router.post(
  "/refresh-token",
  validateRefreshTokenMiddleware,
  refreshTokenController
);
import { Router } from "express";
import { login, getCurrentUser, refreshAccessToken } from "../controllers/users.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(login);
router.route("/").get(verifyJWT, getCurrentUser);
router.route("/refresh-token").get(refreshAccessToken)

export default router;
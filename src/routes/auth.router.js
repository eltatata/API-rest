import express from "express";
import { infoUser, login, logout, refreshToken, register } from "../controllers/auth.controller.js";
import { requiereRefreshToken } from "../middlewares/requiereRefreshToken.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";
const router = express.Router();

router.post("/register", bodyRegisterValidator, register);

router.post("/login", bodyLoginValidator, login);

router.get("/protected", requireToken, infoUser);

router.get("/refresh", requiereRefreshToken, refreshToken);

router.get("/logout", logout);

export default router;
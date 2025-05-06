import { Router } from "express";
import { registerUserController } from "./controller/UserController";
import { validateRegisterUser } from "./validators/UserValidators";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser,  registerUserController);


export default authRouter;
import express from 'express';
import authRouter from './urls/AuthRoutes';

const router = express.Router();

router.use('/auth', authRouter);

export default router;
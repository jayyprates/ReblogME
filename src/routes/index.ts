// Packages
import express from 'express';

// Project
import authRouter from './auth';
import postRouter from './post';


const router = express.Router()

router.use('/auth', authRouter);
router.use('/post', postRouter);

export default router;
import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';


router.use('/api', userRoutes);


export default router;
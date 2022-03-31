import express from 'express';
import { create_transaction } from '../controllers/transactionController';

const router = express.Router();

router.post('/create-transaction', create_transaction);

export { router as transactionRoutes };

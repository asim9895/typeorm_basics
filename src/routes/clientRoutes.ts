import express from 'express';
import { create_client, delete_client, fetch_clients } from '../controllers/clientController';

const router = express.Router();

router.post('/create-client', create_client);
router.delete('/delete-client', delete_client);
router.get('/fetch-client', fetch_clients);

export { router as clientRoutes };

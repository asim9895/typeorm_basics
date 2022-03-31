import express from 'express';
import {
	connect_banker_to_client,
	create_banker,
} from '../controllers/bankerController';

const router = express.Router();

router.post('/create-banker', create_banker);
router.post('/connect-banker-to-client', connect_banker_to_client);

export { router as bankerRoutes };

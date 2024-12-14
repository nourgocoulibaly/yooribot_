// backend/routes/chatRoutes.js
import express from 'express';
import { handleChatRoute, getStreamResponse } from '../controllers/chatController.js';

const router = express.Router();

router.post('/chat/init', handleChatRoute);
router.get('/chat/stream/:conversationId', getStreamResponse);

export default router;

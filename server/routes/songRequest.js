import express from 'express';
import { validateSongRequest } from '../middleware/validation.js';
import { createSongRequest, getSongRequests } from '../controllers/songRequestController.js';

const router = express.Router();

// POST - Submit a new song request
router.post('/', validateSongRequest, createSongRequest);

// GET - Get all song requests
router.get('/', getSongRequests);

export default router;

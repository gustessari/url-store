// filepath: src/routes/topics.ts
import express from 'express';
import { getAllTopics, createTopic, deleteTopic } from '../controllers/topicsController';

const router = express.Router();

router.get('/', getAllTopics);
router.post('/', createTopic);
router.delete('/:topic', deleteTopic);

export default router;
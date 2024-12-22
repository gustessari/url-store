// filepath: src/routes/topics.ts
import express from 'express';
import { getAllTopics, createTopic, deleteTopic } from '../controllers/topicsController';
import { addLink, deleteLink } from '../controllers/linksController';

const router = express.Router();

router.get('/', getAllTopics);
router.post('/', createTopic);
router.delete('/:topic', deleteTopic);
router.post('/', addLink);
router.delete('/:topic/links/:linkIndex', deleteLink);

export default router;
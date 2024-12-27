import express from 'express';
import { addLink, deleteLink } from '../controllers/linksController';
import { TopicsStore } from '../types';

const router = express.Router();
const topics: TopicsStore = { "without-topic": [] };

router.post('/', addLink(topics));
router.delete('/:topic/links/:linkIndex', deleteLink(topics));

export default router;
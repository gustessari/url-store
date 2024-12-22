import { Request, Response } from 'express';
import { TopicsStore } from '../types';

const topics: TopicsStore = { "without-topic": [] };

export const getAllTopics = (_req: Request, res: Response) => {
  res.json(topics);
};

export const createTopic = (req: Request, res: Response) => {
  const { topic } = req.body;

  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ message: 'Invalid topic name.' });
  }

  if (topics[topic]) {
    return res.status(400).json({ message: `Topic "${topic}" already exists.` });
  }

  topics[topic] = [];
  return res.json({ message: `Topic "${topic}" added.` });
};

export const deleteTopic = (req: Request, res: Response) => {
  const { topic } = req.params;

  if (topic === 'without-topic') {
    return res.status(400).json({ message: 'Cannot delete the default topic.' });
  }

  if (!topics[topic]) {
    return res.status(404).json({ message: 'Topic not found.' });
  }

  delete topics[topic];
  return res.json({ message: `Topic "${topic}" deleted.` });
};
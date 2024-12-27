import { Request, Response } from 'express';
import { Link, TopicsStore } from '../types';
import { isValidURL } from '../utils';

export const addLink = (topics: TopicsStore) => (req: Request, res: Response) => {
  const { topic, link, description } = req.body;

  if (!link || typeof link !== 'string') {
    return res.status(400).json({ message: 'Link is required.' });
  }

  if (!isValidURL(link)) {
    return res.status(400).json({ message: 'Invalid URL format.' });
  }

  const newLink: Link = {
    url: link,
    createdAt: new Date(),
    description: description || undefined
  };

  const targetTopic = (!topic || !topics[topic]) ? "without-topic" : topic;

  // Check for duplicate links in the topic
  if (topics[targetTopic].some(existingLink => existingLink.url === link)) {
    return res.status(400).json({ message: 'Link already exists in this topic.' });
  }

  topics[targetTopic].push(newLink);
  return res.json({ message: `Link added under "${targetTopic}".` });
};

export const deleteLink = (topics: TopicsStore) => (req: Request, res: Response) => {
  const { topic, linkIndex } = req.params;
  const index = parseInt(linkIndex, 10);

  if (!topics[topic]) {
    return res.status(404).json({ message: 'Topic not found.' });
  }

  if (isNaN(index) || index < 0 || index >= topics[topic].length) {
    return res.status(400).json({ message: 'Invalid link index.' });
  }

  topics[topic].splice(index, 1);
  return res.json({ message: 'Link deleted.' });
};
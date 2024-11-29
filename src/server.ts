import express, { Request, Response } from 'express'
import { Topic, Link, TopicsStore } from './types';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Initialize with type safety
const topics: TopicsStore = { "without-topic": [] };

// Utility function to validate URLs
function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

// Get all topics
app.get('/api/topics', (_req: Request, res: Response) => {
  res.json(topics);
});


// Create new topic
app.post('/api/topics', (req: Request, res: Response) => {
  const { topic } = req.body;

  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ message: 'Invalid topic name.' });
  }

  if (topics[topic]) {
    return res.status(400).json({ message: `Topic "${topic}" already exists.` });
  }

  topics[topic] = [];
  return res.json({ message: `Topic "${topic}" added.` });
});

// Add link to topic
app.post('/api/links', (req: Request, res: Response) => {
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
});

// Delete topic
app.delete('/api/topics/:topic', (req: Request, res: Response) => {
  const { topic } = req.params;

  if (topic === 'without-topic') {
    return res.status(400).json({ message: 'Cannot delete the default topic.' });
  }

  if (!topics[topic]) {
    return res.status(404).json({ message: 'Topic not found.' });
  }

  delete topics[topic];
  return res.json({ message: `Topic "${topic}" deleted.` });
});

// Delete link from topic
app.delete('/api/topics/:topic/links/:linkIndex', (req: Request, res: Response) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
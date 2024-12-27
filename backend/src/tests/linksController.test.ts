import { addLink, deleteLink } from '../controllers/linksController';
import { Request, Response } from 'express';
import { TopicsStore } from '../types';

describe('Links Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let topics: TopicsStore;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    topics = { "without-topic": [], "new-topic": [] };
  });

  it('should add a new link', () => {
    req.body = { link: 'http://example.com', topic: 'new-topic' };
    addLink(topics)(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith({ message: 'Link added under "new-topic".' });
  });

  it('should not add a link with an invalid URL', () => {
    req.body = { link: 'invalid-url' };
    addLink(topics)(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid URL format.' });
  });

  it('should delete a link', () => {
    topics['new-topic'].push({ url: 'http://example.com', createdAt: new Date() });
    req.params = { topic: 'new-topic', linkIndex: '0' };
    deleteLink(topics)(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith({ message: 'Link deleted.' });
  });

  it('should not delete a link with an invalid index', () => {
    req.params = { topic: 'new-topic', linkIndex: 'invalid-index' };
    deleteLink(topics)(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid link index.' });
  });
});
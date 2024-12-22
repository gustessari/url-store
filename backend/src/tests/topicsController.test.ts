import { getAllTopics, createTopic, deleteTopic } from '../controllers/topicsController';
import { Request, Response } from 'express';

describe('Topics Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return all topics', () => {
    getAllTopics(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith({ "without-topic": [] });
  });

  it('should create a new topic', () => {
    req.body = { topic: 'new-topic' };
    createTopic(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith({ message: 'Topic "new-topic" added.' });
  });

  it('should not create a topic with an invalid name', () => {
    req.body = { topic: '' };
    createTopic(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid topic name.' });
  });

  it('should delete a topic', () => {
    req.params = { topic: 'new-topic' };
    deleteTopic(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith({ message: 'Topic "new-topic" deleted.' });
  });

  it('should not delete the default topic', () => {
    req.params = { topic: 'without-topic' };
    deleteTopic(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Cannot delete the default topic.' });
  });
});
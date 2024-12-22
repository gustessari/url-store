import { addLink, deleteLink } from '../controllers/linksController';
import { Request, Response } from 'express';

describe('Links Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should add a new link', () => {
    req.body = { link: 'http://example.com', topic: 'new-topic' };
    addLink(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith({ message: 'Link added under "new-topic".' });
  });

  it('should not add a link with an invalid URL', () => {
    req.body = { link: 'invalid-url' };
    addLink(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid URL format.' });
  });

  it('should delete a link', () => {
    req.params = { topic: 'new-topic', linkIndex: '0' };
    deleteLink(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith({ message: 'Link deleted.' });
  });

  it('should not delete a link with an invalid index', () => {
    req.params = { topic: 'new-topic', linkIndex: 'invalid-index' };
    deleteLink(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid link index.' });
  });
});
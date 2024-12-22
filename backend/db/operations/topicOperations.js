// operations/topicOperations.js
import { Topic } from '../models/Topic.js';

// Create: Add a new topic
export async function createTopic(topicName) {
  try {
    const newTopic = await Topic.create({ name: topicName });
    console.log('Created new topic:', newTopic);
    return newTopic;
  } catch (error) {
    console.error('Error creating topic:', error);
    throw error;
  }
}

// Read: Get all topics
export async function getAllTopics() {
  try {
    const topics = await Topic.find();
    return topics;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
}

// Read: Get a single topic by name
export async function getTopicByName(topicName) {
  try {
    const topic = await Topic.findOne({ name: topicName });
    return topic;
  } catch (error) {
    console.error('Error fetching topic:', error);
    throw error;
  }
}

// Update: Add a link to a topic
export async function addLinkToTopic(topicName, linkData) {
  try {
    const topic = await Topic.findOne({ name: topicName });
    if (!topic) {
      throw new Error('Topic not found');
    }
    
    topic.links.push(linkData);
    await topic.save();
    return topic;
  } catch (error) {
    console.error('Error adding link:', error);
    throw error;
  }
}

// Delete: Remove a topic
export async function deleteTopic(topicName) {
  try {
    const result = await Topic.findOneAndDelete({ name: topicName });
    return result;
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw error;
  }
}
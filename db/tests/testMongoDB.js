// tests/testMongoDB.js
import { connectDB } from '../config.js';
import { 
  createTopic, 
  getAllTopics, 
  getTopicByName,
  addLinkToTopic,
  deleteTopic 
} from '../operations/topicOperations.js';

async function testMongoOperations() {
  try {
    // 1. Connect to database
    await connectDB();
    console.log('Testing MongoDB operations...\n');

    // 2. Create a new topic
    console.log('Creating new topic...');
    const newTopic = await createTopic('Test Topic');
    console.log('Created topic:', newTopic, '\n');

    // 3. Add a link to the topic
    console.log('Adding link to topic...');
    const updatedTopic = await addLinkToTopic('Test Topic', {
      url: 'https://example.com',
      description: 'Test link'
    });
    console.log('Added link:', updatedTopic, '\n');

    // 4. Get all topics
    console.log('Fetching all topics...');
    const allTopics = await getAllTopics();
    console.log('All topics:', allTopics, '\n');

    // 5. Get specific topic
    console.log('Fetching specific topic...');
    const topic = await getTopicByName('Test Topic');
    console.log('Found topic:', topic, '\n');

    // 6. Delete topic
    console.log('Deleting topic...');
    const deletedTopic = await deleteTopic('Test Topic');
    console.log('Deleted topic:', deletedTopic, '\n');

    console.log('End of tests.');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    // Disconnect from MongoDB
    process.exit(0);
  }
}

// Run the test
testMongoOperations();
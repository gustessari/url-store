// Select DOM elements
const addTopicButton = document.getElementById('add-topic');
const newTopicNameInput = document.getElementById('new-topic-name');
const topicSelect = document.getElementById('topic-select');
const addLinkButton = document.getElementById('add-link');
const newLinkInput = document.getElementById('new-link');
const linkDescriptionInput = document.getElementById('link-description');
const topicsContainer = document.getElementById('topics-container');

// Get templates
const topicTemplate = document.getElementById('topic-template');
const linkTemplate = document.getElementById('link-template');

// Format date for display
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Create topic element from template
function createTopicElement(topicName, links) {
  const template = topicTemplate.content.cloneNode(true);
  const topic = template.querySelector('.topic');
  const title = template.querySelector('.topic-title');
  const deleteButton = template.querySelector('.delete-topic');
  const linkList = template.querySelector('.link-list');

  title.textContent = topicName === 'without-topic' ? 'Without Topic' : topicName;
  
  // Hide delete button for "without-topic"
  if (topicName === 'without-topic') {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => deleteTopic(topicName));
  }

  // Add links
  links.forEach((link, index) => {
    const linkElement = createLinkElement(link, topicName, index);
    linkList.appendChild(linkElement);
  });

  return topic;
}

// Create link element from template
function createLinkElement(link, topicName, index) {
  const template = linkTemplate.content.cloneNode(true);
  const linkItem = template.querySelector('.link-item');
  const anchor = template.querySelector('a');
  const description = template.querySelector('.link-description');
  const timestamp = template.querySelector('.link-timestamp');
  const deleteButton = template.querySelector('.delete-link');

  anchor.href = link.url;
  anchor.textContent = link.url;
  
  if (link.description) {
    description.textContent = link.description;
  } else {
    description.style.display = 'none';
  }

  timestamp.textContent = formatDate(link.createdAt);
  
  deleteButton.addEventListener('click', () => deleteLink(topicName, index));

  return linkItem;
}

// Display all topics and their links
function displayTopics() {
  fetch('/api/topics')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch topics');
      return response.json();
    })
    .then(data => {
      // Clear existing content
      topicsContainer.innerHTML = '';
      topicSelect.innerHTML = '';

      // Add default "without-topic" option
      const defaultOption = document.createElement('option');
      defaultOption.value = 'without-topic';
      defaultOption.textContent = 'Without Topic';
      topicSelect.appendChild(defaultOption);

      // Display topics
      Object.entries(data).forEach(([topicName, links]) => {
        // Skip empty "without-topic"
        if (topicName === 'without-topic' && links.length === 0) return;

        // Add topic to select dropdown
        if (topicName !== 'without-topic') {
          const option = document.createElement('option');
          option.value = topicName;
          option.textContent = topicName;
          topicSelect.appendChild(option);
        }

        // Create and append topic element
        const topicElement = createTopicElement(topicName, links);
        topicsContainer.appendChild(topicElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to load topics. Please try again.');
    });
}

// Add new topic
async function addTopic(topicName) {
  try {
    const response = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ topic: topicName })
    });

    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message);
    
    newTopicNameInput.value = '';
    displayTopics();
  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Failed to add topic');
  }
}

// Add new link
async function addLink(topic, url, description) {
  try {
    const response = await fetch('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        topic,
        link: url,
        description: description || undefined
      })
    });

    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message);
    
    newLinkInput.value = '';
    linkDescriptionInput.value = '';
    displayTopics();
  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Failed to add link');
  }
}

// Delete topic
async function deleteTopic(topicName) {
  if (!confirm(`Are you sure you want to delete the topic "${topicName}"?`)) return;

  try {
    const response = await fetch(`/api/topics/${topicName}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message);
    
    displayTopics();
  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Failed to delete topic');
  }
}

// Delete link
async function deleteLink(topicName, linkIndex) {
  if (!confirm('Are you sure you want to delete this link?')) return;

  try {
    const response = await fetch(`/api/topics/${topicName}/links/${linkIndex}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message);
    
    displayTopics();
  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Failed to delete link');
  }
}

// Event Listeners
addTopicButton.addEventListener('click', () => {
  const topicName = newTopicNameInput.value.trim();
  if (!topicName) {
    alert('Please enter a topic name.');
    return;
  }
  addTopic(topicName);
});

addLinkButton.addEventListener('click', () => {
  const url = newLinkInput.value.trim();
  const description = linkDescriptionInput.value.trim();
  const selectedTopic = topicSelect.value;

  if (!url) {
    alert('Please enter a URL.');
    return;
  }

  addLink(selectedTopic, url, description);
});

// Initialize the display
displayTopics();
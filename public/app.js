// Select necessary elements
const addTopicButton = document.getElementById('add-topic');
const newTopicNameInput = document.getElementById('new-topic-name');
const topicSelect = document.getElementById('topic-select');
const addLinkButton = document.getElementById('add-link');
const newLinkInput = document.getElementById('new-link');
const topicsContainer = document.getElementById('topics-container');

let topicsData = {};

function displayTopics() {
  fetch('/api/topics')
  .then(response => response.json())
  .then(data => {
    topicsData = data;
    // Clear existing content
    topicsContainer.innerHTML = '';
    topicSelect.innerHTML = '';

    for (const topic in data) {  
      // inserting topic on topicSelect list
      const topicOption = document.createElement('option')
      topicOption.value = topic
      topicOption.textContent = topic === "without-topic" ? "Without Topic" : topic;
      topicSelect.appendChild(topicOption)

      // dont create div for "without-topic" if doenst have links
      if (topic === "without-topic" && data['without-topic'].length === 0){continue}

      const topicDiv = document.createElement('div');
      topicDiv.classList.add('topic');
  
      const topicHeader = document.createElement('h3');
      topicHeader.textContent = topic === "without-topic" ? "Without Topic" : topic;
      topicDiv.appendChild(topicHeader);
  
      const linkList = document.createElement('ul');
      data[topic].forEach(link => {
        const listItem = document.createElement('li');
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.textContent = link;
        linkElement.target = "_blank"; // Open link in new tab
        listItem.appendChild(linkElement);
        linkList.appendChild(listItem);
      });
  
      topicDiv.appendChild(linkList);
      topicsContainer.appendChild(topicDiv);
    }
  })
}

// Function to add a new topic
addTopicButton.addEventListener('click', () => {
  
    const topicName = newTopicNameInput.value.trim();
    if (!topicName) {
        alert("Please enter a topic name.");
        return;
    }

    if (!topics[topicName]) {
        topics[topicName] = []; // Initialize topic in topics object
        addTopicToDropdown(topicName); // Add topic to dropdown
        newTopicNameInput.value = ''; // Clear input field
    } else {
        alert("This topic already exists.");
    }
});

// Function to add topic to dropdown menu
function addTopicToDropdown(topicName) {
    const option = document.createElement('option');
    option.value = topicName;
    option.textContent = topicName;
    topicSelect.appendChild(option);
}

// Event listener for adding links
addLinkButton.addEventListener('click', () => {
    const selectedTopic = topicSelect.value;
    const link = newLinkInput.value.trim();

    if (!link) {
        alert("Please enter a link URL.");
        return;
    }

    // Add link to selected topic or "without-topic"
    topics[selectedTopic].push(link);
    displayTopics();

    // Clear link input
    newLinkInput.value = '';
});

// Function to display topics and links
displayTopics();

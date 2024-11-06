const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// saving in memory for now
let topics = {"without-topic": []};

app.get('/api/topics', (req, res) => {
  res.json(topics);
});

app.post('/api/topics', (req, res) => {
  const { topic } = req.body;
  if (!topics[topic]) {
    topics[topic] = [];
    res.json({ message: `Topic "${topic}" added.`});
  } else {
    res.status(400).json({ message: `Topic "${topic}" arealdy exists.` });
  }
});

app.post('/api/links', (req, res) => {
  // to-do: work as form-data or something like that too
  const { topic, link } = req.body;
  if (!link) {
    return res.status(400).json({ message: 'Link is required.' });
  }
  if (!topic || !topics[topic]) {
    topics["without-topic"].push(link)
    res.json({ message: `Link added under "without-topic.` });   
  } else {
    topics[topic].push(link);
    res.json({ message: `Link added under "${topic}".` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
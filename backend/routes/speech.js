const express = require('express');
const router = express.Router();
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient({
  keyFilename: 'path/to/your/google-credentials.json',
});

router.post('/speech', async (req, res) => {
  try {
    const request = {
      audio: req.body.audio,
      config: req.body.config,
    };

    const [response] = await client.recognize(request);
    res.json(response);
  } catch (error) {
    console.error('Erreur de reconnaissance vocale:', error);
    res.status(500).json({ error: 'Erreur de reconnaissance vocale' });
  }
});

module.exports = router; 
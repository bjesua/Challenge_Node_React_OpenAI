const fs = require('fs');
const path = require('path');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

const jsonData = require('./data.json');

const openaiToken = ''

app.use(express.json());
app.use(cors());

app.post('/api/analyze', async (req, res) => {

const message = req.body.emailContent

  try {    
    if (!message) {
      throw new Error('Email content is missing or empty');
    }
    
    const gptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        
        { role: 'user', content: `The client write: ${message}` },
        { role: 'system', content: `1.You are a customer service representative,and you have this producs: ${jsonData.products},  answer to the prev email with aviability and totals`  }
      ],
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${openaiToken}`
      }
    });


    res.json(gptResponse.data.choices[0].message.content);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).send('Error analyzing email content');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

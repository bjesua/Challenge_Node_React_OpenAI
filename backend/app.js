const fs = require('fs');
const path = require('path');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const jsonData = require('./data.json');

const openaiToken = process.env.api_key

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
        { role: 'system', content: `1.you the seller, have this producs: ${jsonData.products},  answer to the email with aviability gitving the price of each product requested and totals of all requested products, important, always return the total from all requested products, don't care about my name, also give the deliveryDates information and warranty  `  },
        { role: 'user', content: `The client write: ${message}` },
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

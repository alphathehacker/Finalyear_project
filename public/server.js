// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/chatbees-proxy', async (req, res) => {
  const { message } = req.body;
  const account_id = "X0LZQYK7";
  const collection = "websitedata";
  const api_key = "MDMtMDAwMDAwMDAtMDAwMDAxLTUyYTRkYmEwLTU5ZWEtZDAzNi01NmRlLTNlYmM4MzZiNzVmZg=="; // your API key
  try {
    const chatbeesRes = await fetch('https://api.chatbees.ai/v1/chat/completions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${api_key}`
      },
      body: JSON.stringify({
        account_id,
        collection,
        messages: [{ role: "user", content: message }]
      })
    });
    const data = await chatbeesRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from ChatBees API" });
  }
});

app.listen(5000, () => console.log("Proxy server running on port 5000"));

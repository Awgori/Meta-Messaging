require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

/* -----------------------------------
   BASIC TEST ROUTE
----------------------------------- */
app.get('/', (req, res) => {
  res.send('Task 2-A Messaging Backend Running');
});

/* -----------------------------------
   MESSENGER — SEND TEXT
----------------------------------- */
app.post('/send/messenger/text', async (req, res) => {
  const { recipientId, message } = req.body;

  if (!recipientId || !message) {
    return res.status(400).send('recipientId and message are required');
  }

  try {
    await axios.post(
      'https://graph.facebook.com/v18.0/me/messages',
      {
        recipient: { id: recipientId },
        message: { text: message }
      },
      {
        params: { access_token: process.env.MESSENGER_PAGE_TOKEN }
      }
    );

    res.send('Messenger text message sent');
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send(error.response?.data || error.message);
  }
});

/* -----------------------------------
   MESSENGER — SEND BUTTON
----------------------------------- */
app.post('/send/messenger/button', async (req, res) => {
  const { recipientId } = req.body;

  if (!recipientId) {
    return res.status(400).send('recipientId is required');
  }

  try {
    await axios.post(
      'https://graph.facebook.com/v18.0/me/messages',
      {
        recipient: { id: recipientId },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: 'Do you confirm this action?',
              buttons: [
                { type: 'postback', title: 'Confirm', payload: 'CONFIRM_ACTION' }
              ]
            }
          }
        }
      },
      {
        params: { access_token: process.env.MESSENGER_PAGE_TOKEN }
      }
    );

    res.send('Messenger button message sent');
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send(error.response?.data || error.message);
  }
});

/* -----------------------------------
   WHATSAPP — SEND TEXT
----------------------------------- */
app.post('/send/whatsapp/text', async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).send('to and message are required');
  }

  try {
    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: to,
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.send('WhatsApp text message sent');
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send(error.response?.data || error.message);
  }
});

/* -----------------------------------
   WHATSAPP — SEND BUTTONS
----------------------------------- */
app.post('/send/whatsapp/button', async (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).send('to is required');
  }

  try {
    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: to,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: { text: 'Do you confirm this action?' },
          action: {
            buttons: [
              { type: 'reply', reply: { id: 'yes', title: 'Yes' } },
              { type: 'reply', reply: { id: 'no', title: 'No' } }
            ]
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.send('WhatsApp button message sent');
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send(error.response?.data || error.message);
  }
});

/* -----------------------------------
   WEBHOOK VERIFICATION (MESSENGER + WHATSAPP)
----------------------------------- */
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

/* -----------------------------------
   WEBHOOK EVENT RECEIVER
----------------------------------- */
app.post('/webhook', (req, res) => {
  console.log('Webhook Event Received:');
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

/* -----------------------------------
   START SERVER
----------------------------------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

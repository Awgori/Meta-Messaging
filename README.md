# Meta Messenger & WhatsApp Messaging Integration

This repository contains a Node.js backend application that integrates:
- Facebook Messenger Platform
- WhatsApp Cloud API

The app supports sending text messages and interactive messages and includes basic webhook handling.

---

## Project Features
- Send messages via Facebook Messenger
- Send messages via WhatsApp Cloud API
- Supports text messages and interactive messages
- Webhook handling for incoming messages and status updates
- Secure configuration using environment variables

---

## Tech Stack

### Backend
- Node.js
- Express.js
- Axios

### Messaging Platforms
- Facebook Messenger Platform
- WhatsApp Cloud API (Meta)

### Dev & Testing Tools
- Postman (API testing)
- Ngrok (Webhook tunneling)

### Configuration
- dotenv (environment variables)

---

## Project Structure

```
Meta-Messaging/
├── src/
│   ├── routes/
│   │   ├── messenger.js
│   │   ├── whatsapp.js
│   │   └── webhook.js
│   ├── services/
│   │   ├── messengerService.js
│   │   └── whatsappService.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```


---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/Meta-Messaging.git
cd Meta-Messaging

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file in the root directory:

PORT=3000

META_PAGE_ACCESS_TOKEN=your_facebook_page_access_token
META_VERIFY_TOKEN=your_webhook_verify_token

WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token

⚠️ Do not commit the .env file.

4. Run the application
npm start

The server will run at:
http://localhost:3000

API Endpoints
Send Messenger Message
POST /send/messenger


Example payload:

{
  "psid": "USER_PSID",
  "message": "Hello from Messenger!"
}

Send WhatsApp Message
POST /send/whatsapp


Example payload:

{
  "to": "639XXXXXXXXX",
  "message": "Hello from WhatsApp!"
}

Webhooks
Messenger & WhatsApp Webhook
POST /webhook
GET /webhook


Used for:

Incoming messages

Message status updates

Logs are printed to the console for debugging.

Message Flow Diagram
Client → API Endpoint → Meta Platform → Messenger / WhatsApp User

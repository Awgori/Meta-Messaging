## Meta Messenger & WhatsApp Messaging Integration

This repository contains a Node.js backend application that integrates:
- Facebook Messenger Platform
- WhatsApp Cloud API
The app supports sending text messages and interactive messages and includes basic webhook handling.


---
## Prerequisites
- Before running the project, make sure you have:
- Node.js v18+ installed
- npm (comes with Node.js)
- Postman (for testing API endpoints)
- Ngrok (optional, for webhook testing on localhost)
---

## Project Features
- Send messages via Facebook Messenger
- Send messages via WhatsApp Cloud API
- Supports text messages and interactive messages
- Webhook handling for incoming messages and status updates
- Secure configuration using environment variables

---

## Tech Stack & Tools

**Backend:** Node.js, Express.js  
**HTTP Requests:** Axios  
**Messaging Platforms:** Facebook Messenger Platform, WhatsApp Cloud API (Meta)  
**Dev & Testing Tools:** Postman, Ngrok (for webhook testing)  
**Configuration & Environment:** dotenv


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
```
2. Install dependencies
```
npm install
```
4. Configure environment variables
```
Create a .env file in the root directory:

# Server configuration
PORT=3000

# Facebook Messenger credentials
MESSENGER_PAGE_TOKEN=
WEBHOOK_VERIFY_TOKEN=

# WhatsApp Cloud API credentials
WHATSAPP_TOKEN=
WHATSAPP_PHONE_ID=

⚠️ Do not commit the .env file.
```
4. Run the application
```   
npm start
```

The server will run at:
```
http://localhost:3000
```
Webhook testing (Optional)
```
ngrok http 3000
```
---
## API Endpoints
---

Messenger
POST /send/messenger
```
{
  "psid": "USER_PSID",
  "message": "Hello from Messenger!"
}
```
WhatsApp /send/whatsapp
```
{
  "phone": "639XXXXXXXXX",
  "message": "Hello from WhatsApp!"
}
```

Webhooks
```
GET /webhook – Webhook verification
POST /webhook – Incoming messages & status events
Webhook events are logged to the console for debugging.
```
Message Flow
---
```
Client
  ↓
API Endpoint (/send/messenger or /send/whatsapp)
  ↓
Service Layer
  ↓
Meta Platform (Messenger / WhatsApp)
  ↓
End User
```


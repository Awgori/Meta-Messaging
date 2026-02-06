```md

Meta Messaging App
Task 2-A: Facebook Messenger & WhatsApp Integration
📖 Project Overview

The Meta Messaging App is a simple external messaging application that integrates Facebook Messenger and WhatsApp Cloud API using Meta’s official APIs.

This project demonstrates how an application can:

Send messages through Messenger and WhatsApp

Handle incoming messages via webhooks

Test API endpoints using Postman

Reference a provided UI template while respecting Meta platform limitations

The application simulates how catch history and weather forecast data for generative AI mobile applications for fisheries can be delivered to users through messaging platforms.

Messenger and WhatsApp are used as communication channels, not as the main user interface.

🎯 Objectives (Task 2-A)

Research Messenger Platform and WhatsApp Cloud API

Integrate message sending into an existing repository

Implement backend API endpoints

Handle webhook events

Test APIs using Postman

Secure credentials using environment variables

Reference a provided UI template in an external application

Properly document setup, usage, and message flow

✨ Features
Facebook Messenger

Text message sending

Interactive button message

PSID-based message delivery

WhatsApp Cloud API

Text message sending

Button-triggered send action

Cloud API authentication

API Testing (Postman)

Manual testing of Messenger endpoints

Manual testing of WhatsApp endpoints

JSON request/response validation

Error handling verification

Application UI

External web-based application

Mobile phone–style layout

Dark / gray / white color theme

UI design inspired by the provided template

Webhooks

Incoming message logging

Message status logging

Console-based monitoring

Security & Configuration

Environment variable usage

No hardcoded secrets or tokens


🧱 Project Structure
```md

Meta-Messaging/
├── frontend/
│   └── index.html        # Phone-style UI (UI reference)
├── src/
│   ├── index.js          # Express server entry point
│   └── routes/
│       ├── messenger.js  # Messenger integration
│       ├── whatsapp.js   # WhatsApp Cloud API integration
│       └── webhook.js    # Webhook handlers
├── .env.example          # Environment variable template
├── .gitignore
├── package.json
└── README.md

⚙️ Technologies & Tools Used

Node.js
Express.js
Axios
Facebook Messenger Platform
WhatsApp Cloud API
Meta Graph API
Postman (API testing and validation)
HTML / CSS (External UI)

🔐 Environment Variables
PORT=3000

# Facebook Messenger
FB_PAGE_ACCESS_TOKEN=YOUR_PAGE_ACCESS_TOKEN
FB_VERIFY_TOKEN=YOUR_VERIFY_TOKEN

# WhatsApp Cloud API
WHATSAPP_TOKEN=YOUR_WHATSAPP_CLOUD_API_TOKEN
WHATSAPP_PHONE_NUMBER_ID=YOUR_PHONE_NUMBER_ID

.env is listed in .gitignore


🚀 Setup & Running the App
1.) Install dependencies
npm install

2.) Start the server
node src/index.js

Expected output:
Server running on port 3000

API Testing Using Postman

Postman was used to test, debug, and validate all API endpoints before UI integration.

Why Postman was used:

To verify correct API requests

To inspect JSON payloads

To test Meta API responses

To confirm authentication tokens work

To troubleshoot errors

📤 Send Messenger Message (Postman)

Endpoint

POST /send/messenger


Headers

Content-Type: application/json


Body (raw JSON)

{
  "psid": "USER_PSID",
  "message": "Hello from Meta Messaging App"
}


✅ Expected Result:

Message is delivered to Facebook Messenger

API returns a success response

📤 Send WhatsApp Message (Postman)

Endpoint

POST /send/whatsapp


Headers

Content-Type: application/json


Body (raw JSON)

{
  "phone": "639XXXXXXXXX",
  "message": "Hello from Meta Messaging App"
}


✅ Expected Result:

Message is delivered to WhatsApp

Message status is logged via webhook

Using the Application UI

Open your browser and navigate to:

http://localhost:3000


The interface:

Is styled like a mobile phone

Includes Messenger send button

Includes WhatsApp send button

Triggers backend API calls

Displays response feedback for testing

 Webhook Endpoints
Messenger Webhook
POST /webhook/messenger


Receives incoming messages

Logs sender PSID

Used for user identification

WhatsApp Webhook
POST /webhook/whatsapp


Receives incoming messages

Receives delivery/read status updates

Example logged payload:

{
  "from": "639XXXXXXXXX",
  "text": {
    "body": "Test message"
  }
}

Message Flow Diagram
User
 ↓
Postman / UI Button
 ↓
Express Backend API
 ↓
Meta Graph API
 ↓
Messenger / WhatsApp
 ↓
Webhook Events
 ↓
Server Console Logs

Clarification on UI Reference Instruction

The provided UI template was used strictly as a design reference.

Due to Meta platform limitations:

Messenger and WhatsApp do not allow custom UI embedding

Only text and predefined interactive elements are supported

Therefore:

The UI exists as an external application

Messenger and WhatsApp serve as message delivery channels

This approach follows official Meta API standards.



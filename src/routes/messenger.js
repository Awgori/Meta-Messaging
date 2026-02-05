const express = require("express");
const axios = require("axios");

const router = express.Router();

// POST /send/messenger
router.post("/messenger", async (req, res) => {
  const { psid, message } = req.body;

  if (!psid || !message) {
    return res.status(400).json({ success: false, error: "psid and message are required" });
  }

  try {
    // Send text message
    await axios.post(
      "https://graph.facebook.com/v19.0/me/messages",
      {
        recipient: { id: psid },
        message: { text: message }
      },
      { params: { access_token: process.env.FB_PAGE_ACCESS_TOKEN } }
    );

    // Send interactive button message
    await axios.post(
      "https://graph.facebook.com/v19.0/me/messages",
      {
        recipient: { id: psid },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text: "Do you want to confirm this report?",
              buttons: [
                { type: "postback", title: "Confirm", payload: "CONFIRM_REPORT" }
              ]
            }
          }
        }
      },
      { params: { access_token: process.env.FB_PAGE_ACCESS_TOKEN } }
    );

    res.json({ success: true, platform: "messenger", message: "Messenger message sent successfully" });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Failed to send Messenger message" });
  }
});

module.exports = router;

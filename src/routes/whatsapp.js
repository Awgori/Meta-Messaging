const express = require("express");
const axios = require("axios");

const router = express.Router();

// POST /send/whatsapp
router.post("/whatsapp", async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({
      success: false,
      error: "phone and message are required"
    });
  }

  try {
    // Send WhatsApp text message
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: {
          body: message
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("WhatsApp message sent:", response.data);

    res.json({
      success: true,
      platform: "whatsapp",
      message: "WhatsApp message sent successfully"
    });
  } catch (error) {
    console.error("WhatsApp Error:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: "Failed to send WhatsApp message"
    });
  }
});

module.exports = router;

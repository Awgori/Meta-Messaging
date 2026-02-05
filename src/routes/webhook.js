const express = require("express");
const router = express.Router();

// Verify webhook (GET)
router.get("/", (req, res) => {
  const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Log incoming messages (POST)
router.post("/", (req, res) => {
  console.log("Webhook event received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

module.exports = router;

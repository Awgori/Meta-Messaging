const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

// Serve frontend
app.use(express.static("frontend"));

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "Meta Messaging API running" });
});

// Import routes
const messengerRoutes = require("./routes/messenger");
const whatsappRoutes = require("./routes/whatsapp");
const webhookRoutes = require("./routes/webhook");

// Register routes
app.use("/send", messengerRoutes);
app.use("/send", whatsappRoutes);
app.use("/webhook", webhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

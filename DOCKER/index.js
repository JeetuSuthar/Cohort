const express = require("express");



const app = express();
const PORT =  3000;

// Middleware

app.use(express.json());

// PostgreSQL Connection (Optional)

app.get("/", (req, res) => {
  res.send("Express Server is Running! 🚀");
});

// Example API Route

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

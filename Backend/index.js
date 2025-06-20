const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const authMiddleware = require("./middleware/authMiddleware"); // <-- import here

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));

// ADD THIS protected route AFTER routes
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "This is protected",
    user: req.user, // this comes from decoded token
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

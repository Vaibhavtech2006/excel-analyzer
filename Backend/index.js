const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware"); 
const uploadRoutes = require('./routes/upload');
const chartUpload = require('./routes/chartUpload');
const fileRoutes = require('./routes/fileRoutes');
require("dotenv").config();
require("./db");



const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));

app.use('/api/upload', uploadRoutes);
app.use('/api/chart', chartUpload);
app.use('/api/files', fileRoutes);

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

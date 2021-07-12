const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// controllers
const userRoute = require("./controllers/user-route");

// Routes
app.get("/", (req, res) => {
  res.json({ name: "eric", surname: "echemane" });
});
app.get("/users", userRoute);

app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});

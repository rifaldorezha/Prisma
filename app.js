const express = require("express");
const cors = require("cors");
const app = express();
const allRoutes = require("./routes/index.js");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(allRoutes);
app.listen(PORT, () => {
  console.log(`Listening n Running on port: ${PORT}`);
});

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
const router = require("./routers/Router");
const port = process.env.port || 3000;
process.env.secretKey = fs.readFileSync("./src/secret.txt");

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is up on port:${port}`);
});

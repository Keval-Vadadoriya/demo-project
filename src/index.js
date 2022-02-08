const express = require("express");
const app = express();
const router = require("./routers/Router");

const port = process.env.port || 2000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is up on port:${port}`);
});

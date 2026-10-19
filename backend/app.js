const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const appRoutes = require("./routes/missionRoutes");

app.use(express.json());

app.use("/missions", appRoutes);

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta: ${port}`);
});

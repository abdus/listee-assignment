import express from "express";
import dotenv from "dotenv";
import "./database/index.js";
import routes from "./routes/index.js";

dotenv.config({ path: ".env" });
const app = express();

app.use(express.json({ limit: "5MB" }));
app.use("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use("/api/v1", routes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`listening on ` + (process.env.PORT || 4000));
});

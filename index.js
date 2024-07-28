import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
import videos from "./routes/videos.js";
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/videos", videos);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}.`);
});

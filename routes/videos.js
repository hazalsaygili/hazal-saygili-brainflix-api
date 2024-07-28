import express from "express";
const router = express.Router();
import fs from "fs";
import crypto from "crypto";

const FILE_PATH = "./data/videos.json";

const readData = () => {
  const videosData = fs.readFileSync(FILE_PATH);
  const parsedData = JSON.parse(videosData);
  return parsedData;
};

//GET all
router.get("/", (req, res) => {
  const videos = readData();
  res.status(200).json(videos);
});

//GET a single video by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const videosData = readData();

  //Find the video with the matching id
  const singleVideo = videosData.find((video) => video.id === id);

  if (singleVideo) {
    res.status(200).json(singleVideo);
  } else {
    res.status(404).send("Video not found.");
  }
});

//POST a Video
router.post("/", (req, res) => {
  const videoObj = req.body;
  const newVideo = {
    id: crypto.randomUUID(),
    title: videoObj.title,
  };

  const videoData = readData();
  videoData.push(newVideo);
  fs.writeFileSync(FILE_PATH, JSON.stringify(videoData));

  res.status(201).json(newVideo);
});

export default router;

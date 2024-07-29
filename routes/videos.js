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

//GET all videos in filtered form
router.get("/", (req, res) => {
  const videos = readData();
  const videosFilteredInfo = videos.map((video) => {
    const filteredVideo = {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
    return filteredVideo;
  });
  res.status(200).json(videosFilteredInfo);
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
    channel: "New Channel",
    image: "/images/Upload-video-preview.jpg",
    description: videoObj.description,
    views: "0",
    likes: "0",
    duration: "0:00",
    video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [],
  };

  const videoData = readData();
  videoData.push(newVideo);
  fs.writeFileSync(FILE_PATH, JSON.stringify(videoData));

  res.status(201).json(newVideo);
});

export default router;

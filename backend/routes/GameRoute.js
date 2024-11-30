import express from "express";
import { addGame, listGames, removeGame } from "../controllers/GameController.js";
import multer from "multer";

const GameRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, `${Date.now()}-${file.originalname}`);
      } else {
        cb(new Error('Only images are allowed'));
      }
    }
  });

const upload = multer({ storage });

GameRouter.post("/add", upload.single("image"), addGame);
GameRouter.get("/list", listGames);
GameRouter.post("/remove", removeGame);

export default GameRouter;


import express from "express";
import { purchaseGames } from "../controllers/PurchaseController.js";

const PurchaseRouter = express.Router();

PurchaseRouter.post("/purchase", purchaseGames);

export default PurchaseRouter;

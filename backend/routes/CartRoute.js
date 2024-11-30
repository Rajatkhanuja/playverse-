
import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/CartController.js";

const CartRouter = express.Router();

CartRouter.post("/add", addToCart);
CartRouter.get("/:userId", getCart);
CartRouter.delete("/remove", removeFromCart);

export default CartRouter;

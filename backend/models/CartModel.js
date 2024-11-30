
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    totalAmount:{type: Number, default: 0},
});

const CartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default CartModel;
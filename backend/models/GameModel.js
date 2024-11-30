import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

const GameModel = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default GameModel;

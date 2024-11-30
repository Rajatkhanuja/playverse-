
import CartModel from '../models/CartModel.js';
import GameModel from '../models/GameModel.js';

const calculateTotalAmount = async (games) => {
    const gameDetails = await GameModel.find({ _id: { $in: games } });
    return gameDetails.reduce((total, game) => total + parseFloat(game.price), 0);
};

const addToCart = async (req, res) => {
    try {
        const { userId, gameId } = req.body;
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            cart = new CartModel({ userId, games: [gameId] });
        } else {
            if (!cart.games.includes(gameId)) {
                cart.games.push(gameId);
            }
        }

        cart.totalAmount = await calculateTotalAmount(cart.games);
        await cart.save();

        res.status(200).json({ success: true, message: 'Game added to cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add game to cart', error: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await CartModel.findOne({ userId }).populate('games');

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.status(200).json({ success: true, message: 'Cart fetched successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch cart', error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, gameId } = req.body;
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.games = cart.games.filter(game => game.toString() !== gameId);
        cart.totalAmount = await calculateTotalAmount(cart.games);

        await cart.save();
        res.status(200).json({ success: true, message: 'Game removed from cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to remove game from cart', error: error.message });
    }
};

export { addToCart, getCart, removeFromCart };

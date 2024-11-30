
import CartModel from '../models/CartModel.js';
import GameModel from '../models/GameModel.js';

const calculateTotalAmount = async (games) => {
    const gameDetails = await GameModel.find({ _id: { $in: games } });
    return gameDetails.reduce((total, game) => total + parseFloat(game.price), 0);
};

const purchaseGames = async (req, res) => {
    try {
        const { userId, gameIds } = req.body;
        if (!userId || !Array.isArray(gameIds) || gameIds.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid request payload' });
        }

        const totalAmount = await calculateTotalAmount(gameIds);

    

        res.status(200).json({ success: true, message: 'Games purchased successfully', totalAmount });
    } catch (error) {
        console.error('Purchase error:', error);
        res.status(500).json({ success: false, message: 'Failed to purchase games', error: error.message });
    }
};

export { purchaseGames };

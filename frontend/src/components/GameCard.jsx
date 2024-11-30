import React, { useState, useContext } from 'react';
import './gameCard.css';
import { AppContext } from '../App';

function GameCard({ game }) {
  const { addGameToBag, removeGameFromBag } = useContext(AppContext);
  const [addedToBag, setAddedToBag] = useState(false);

  const handleAddToBag = () => {
    setAddedToBag(prevState => {
      const newState = !prevState;
      if (newState) {
        addGameToBag(game);
      } else {
        removeGameFromBag(game);
      }
      return newState;
    });
  };

  return (
    <div className="game-card">
      <img 
        src={`http://localhost:4000/uploads/${game.image}`} 
        alt={game.name} 
        className="game-card-img" 
      />
      <div className="game-card-content">
        <span className="game-category">{game.category}</span>
        <h3 className="game-title">{game.name}</h3>
        <p className="game-description">{game.description}</p>
        <span className="game-price">${game.price}</span>
        <div className="game-card-actions">
          <button className={`add-bag-btn ${addedToBag ? 'clicked' : ''}`} onClick={handleAddToBag}>
            <i className="bi bi-bag-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
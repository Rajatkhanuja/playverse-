import React from 'react';
import './GameDetail.css'; // Ensure this file exists

function GameDetail({ game }) {
  return (
    <div className="game-detail">
      <h4>Description</h4>
      <p>{game.description}</p> {/* Display the full description */}
    </div>
  );
}

export default GameDetail;

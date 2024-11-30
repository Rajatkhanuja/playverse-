import React, { useContext } from 'react';
import './myLibrary.css';
import GameCard from '../components/GameCard';
import { AppContext } from '../App';

function MyLibrary({ reference }) {
  const { library } = useContext(AppContext);
  
  return (
    <section id="library" className="library" ref={reference}>
      <div className="container-fluid">
        <div className="row mb-3">
          <h1>My Library</h1>
        </div>
        <div className="row">
          {library.length === 0 ? (
            <h2>Your library is empty</h2>
          ) : (
            library.map(game => (
              <div key={game._id} className="col-md-4 mb-4">
                <GameCard game={game} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default MyLibrary;

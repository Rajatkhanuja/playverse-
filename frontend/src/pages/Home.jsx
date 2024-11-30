import React from 'react';
import './home.css';
import GameSwiper from '../components/GameSwiper';
import GameCard from '../components/GameCard';


function Home({ games, reference }) {
  return (
    <section id="home" className="home active" ref={reference}>
      <div className="container-fluid">
        <div className="row">
          <GameSwiper games={games} />
        </div>

        <div className="row mb-2 mt-2">
          <div className="col-lg-6">
            <h2 className="sectionTitle">Games on promotion</h2>
          </div>
        </div>

        <div className="row">
          {games.map(game => (
            <div className="col-sm-3" key={game._id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import './categories.css';
import filterListData from '../data/filterListData';
import GameCard from '../components/GameCard';

const applyFilters = (games, category) => {
  let filtered = games;

  // Filter by category if not 'All'
  if (category !== 'All') {
    filtered = filtered.filter(game =>
      game.category && game.category.toLowerCase() === category.toLowerCase()
    );
  }

  console.log('Filtered games:', filtered); // Debugging line

  return filtered;
};

function Categories({ games, reference }) {
  const [filteredGames, setFilteredGames] = useState(games);
  const [filters, setFilters] = useState(filterListData);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const filtered = applyFilters(games, selectedCategory);
    setFilteredGames(filtered);
  }, [games, selectedCategory]);

  const handleFilterGames = (category) => {
    setSelectedCategory(category);
    setFilters(filters.map(filter => ({
      ...filter,
      active: filter.name === category,
    })));
  };

  return (
    <section id="categories" className='categories' ref={reference}>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-center justify-content-start">
            <ul className="filters">
              {filters.map(filter => (
                <li 
                  key={filter._id} 
                  className={`${filter.active ? 'active' : ''}`}
                  onClick={() => handleFilterGames(filter.name)}>
                  {filter.name}
                </li>
              ))}
            </ul>
          </div>
          {/* Removed the search bar section */}
        </div>
        <div className="row">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <GameCard key={game._id} game={game} />
            ))
          ) : (
            <div className="no-results">
              <p>No games found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Categories;

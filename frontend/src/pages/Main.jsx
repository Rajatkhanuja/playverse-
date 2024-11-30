import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../App';
import './main.css';
import SideMenu from '../components/SideMenu';
import Header from './Header';
import Home from './Home';
import MyLibrary from './MyLibrary';
import Categories from './Categories';
import Bag from './Bag';

function Main() {
  const { library, bag, handlePurchase } = useContext(AppContext); // Include handlePurchase from context
  const [active, setActive] = useState(false);
  const [games, setGames] = useState([]);

  // Define the refs for different sections
  const homeRef = useRef(null);
  const categoriesRef = useRef(null);
  const libraryRef = useRef(null);
  const bagRef = useRef(null);

  const sections = [
    { name: 'home', ref: homeRef, active: true },
    { name: 'categories', ref: categoriesRef, active: false },
    { name: 'library', ref: libraryRef, active: false },
    { name: 'bag', ref: bagRef, active: false },
  ];

  // Function to toggle the menu's active state
  const handleToggleActive = () => setActive(!active);

  // Function to handle section activation
  const handleSectionActive = (target) => {
    sections.forEach((section) => {
      section.ref.current.classList.remove('active');
      if (section.ref.current.id === target) {
        section.ref.current.classList.add('active');
      }
    });
  };

  // Fetch data from the backend
  const fetchData = () => {
    fetch('http://localhost:4000/api/game/list')
      .then((res) => res.json())
      .then((data) => setGames(data.games))
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <SideMenu active={active} sectionActive={handleSectionActive} />
      <div className={`banner ${active ? 'active' : ''}`}>
        <Header toggleActive={handleToggleActive} />
        <div className="container-fluid">
          {games && games.length > 0 && (
            <>
              <Home games={games} reference={homeRef} />
              <MyLibrary games={library} reference={libraryRef} />
              <Bag games={bag} reference={bagRef} onPurchase={handlePurchase} />  {/* Pass onPurchase */}
              <Categories games={games} reference={categoriesRef} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;

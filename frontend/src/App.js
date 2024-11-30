import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Main from './pages/Main';
import AuthPage from './components/Authpage';

export const AppContext = React.createContext();

function App() {
  const [library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handlePurchase = (games) => {
    setLibrary((prevLibrary) => {
      const newGames = games.filter((game) => !prevLibrary.some((g) => g._id === game._id));
      return [...prevLibrary, ...newGames];
    });
    setBag([]);
  };

  const addGameToLibrary = (game) => {
    setLibrary((prevLibrary) => {
      if (!prevLibrary.some((g) => g._id === game._id)) {
        return [...prevLibrary, game];
      }
      return prevLibrary;
    });
  };

  const removeGameFromLibrary = (game) => {
    setLibrary((prevLibrary) => prevLibrary.filter((g) => g._id !== game._id));
  };

  const addGameToBag = (game) => {
    setBag((prevBag) => {
      if (!prevBag.some((g) => g._id === game._id)) {
        return [...prevBag, game];
      }
      return prevBag;
    });
  };

  const removeGameFromBag = (game) => {
    setBag((prevBag) => prevBag.filter((g) => g._id !== game._id));
  };

  const handleAuth = (userData) => {
    console.log('Authenticated user data:', userData);
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <AppContext.Provider value={{
      library,
      addGameToLibrary,
      removeGameFromLibrary,
      bag,
      addGameToBag,
      removeGameFromBag,
      handlePurchase,
      user
    }}>
      {isAuthenticated ? <Main /> : <AuthPage onAuth={handleAuth} />}
    </AppContext.Provider>
  );
}

export default App;
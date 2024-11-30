import React, { useContext } from 'react';
import './shopBagitem.css';
import { AppContext } from '../App';

function ShopBagItem({ game, index }) {
    const { removeGameFromBag } = useContext(AppContext);

    const handleRemoveFromBag = () => {
        removeGameFromBag(game);
    };

    const price = Number(game.price);
    const formattedPrice = !isNaN(price) ? price.toFixed(2) : 'N/A';

    return (
        <tr className="shopBagItem">
            <th scope='row'>{index + 1}</th>
            <td>
  <img 
    src={`http://localhost:4000/uploads/${game.image}`} // Ensure correct path for the image
    alt={game.name || 'Game Preview'} 
    className='img-fluid' 
  />
</td>
            <td>{game.name || 'Unnamed Game'}</td> {/* Ensure title is displayed */}
            <td>${formattedPrice}</td>
            <td>
                <a href="#" onClick={(e) => { e.preventDefault(); handleRemoveFromBag(); }} >
                    <i className="bi bi-trash"></i>
                </a>
            </td>
        </tr>
    );
}


export default ShopBagItem;

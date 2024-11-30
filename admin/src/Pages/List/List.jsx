import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/game/list`);

      if (response.data.success) {
        setList(response.data.games); 
      } else {
        toast.error('Error fetching list');
      }
    } catch (error) {
      toast.error('Error fetching list');
      console.error('Error fetching list', error);
    }
  };
  const removeGame = async (gameId) => {
    debugger;
    const response = await axios.post(`${url}/api/game/remove`, { id: gameId });
    if (response.data.success) {
      fetchList();    
      toast.success(response.data.message)
    }
    else {
      toast.error("Error")
    }
  }

  return (
    <div className='list add flex-col'>
      <p>All Games List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/uploads/${item.image}`} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeGame(item._id)} className='cursor'>Remove</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

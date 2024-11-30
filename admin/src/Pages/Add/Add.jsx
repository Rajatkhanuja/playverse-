import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
  console.log('Add Component Rendered');

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Action"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    try {
      const response = await axios.post(`${url}/api/game/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Action"
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        console.error('Failed to add game:', response.data);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding game:', error);
      toast.error('Error adding game');
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Game Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here' required />
        </div>
        <div className="add-game-description flex-col">
          <p>Game Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>game category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Racing">Racing</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>game price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$1999' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;

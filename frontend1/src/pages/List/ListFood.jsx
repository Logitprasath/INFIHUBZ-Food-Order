import React, { useEffect, useState } from 'react';
import './ListFood.css';
import { toast } from 'react-toastify';

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await fetch('http://localhost:8088/admin/food/list');
      const data = await response.json();

      if (response.ok) {
        setList(data);
      } else {
        toast.error('Error fetching list');
      }
    } catch (error) {
      toast.error('Error fetching list');
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8088/admin/food/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setList(list.filter(item => item.foodId !== id));
        toast.success('Item deleted successfully');
      } else {
        toast.error('Error deleting item');
      }
    } catch (error) {
      toast.error('Error deleting item');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list-container'>
      <div className='list'>
        <h2>All Foods List</h2>
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
              <img src={item.foodImage} alt={item.foodName} />
              <p>{item.foodName}</p>
              <p>{item.foodCategory}</p>
              <p>${item.foodPrice}</p>
              <p className='cursor' onClick={() => deleteItem(item.foodId)}>X</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListFood;

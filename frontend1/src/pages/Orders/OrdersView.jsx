import React, { useEffect, useState } from 'react'
import './OrdersView.css'
import { toast } from "react-toastify"

const OrdersView = () => {

  const [orders, setOrders] = useState([]);

  const mockOrders = [
    {
      _id: 1,
      items: [
        { name: 'Salad', quantity: 2 },
        { name: 'Sandwich', quantity: 1 },
      ],
      address: {
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        country: 'Anycountry',
        zipcode: '12345',
        phone: '555-1234'
      },
      amount: 30,
      status: 'Food Processing'
    },
    {
      _id: 2,
      items: [
        { name: 'Cake', quantity: 1 },
      ],
      address: {
        firstName: 'Jane',
        lastName: 'Smith',
        street: '456 Elm St',
        city: 'Othertown',
        state: 'Otherstate',
        country: 'Othercountry',
        zipcode: '67890',
        phone: '555-5678'
      },
      amount: 25,
      status: 'Out for delivery'
    },
  ];

  const fetchAllOrders = async () => {
    // Simulate fetching data
    const response = {
      data: {
        success: true,
        data: mockOrders
      }
    };

    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error fetching orders");
    }
  }

  const statusHandler = async (event, orderId) => {
    // Simulate updating status
    const updatedOrders = orders.map(order => 
      order._id === orderId ? { ...order, status: event.target.value } : order
    );
    setOrders(updatedOrders);

    const response = {
      data: {
        success: true,
        message: "Order status updated successfully"
      }
    };

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error updating status");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={""} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersView;

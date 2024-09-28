import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DataTableComponent from './DataTableComponent';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  ItemAmount: number;
  image: string;
}

interface Order {
  Id: string;
  orderDate: string;
  totalAmount: number;
  items: OrderItem[];
}

const AllOrderLayOut: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Initialize startDate to today
  const getStartDate = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0); // Set time to start of the day
    return startDate.toISOString(); // Convert to ISO format
  };
  // Initialize endDate to one week from today
  const getEndDate = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate()); // Add 7 days to the current date
    endDate.setHours(23, 59, 59, 999); // Set time to end of the day
    return endDate.toISOString(); // Convert to ISO format
  };
  const [startDate, setStartDate] = useState(getStartDate);
  const [endDate, setEndDate] = useState(getEndDate);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/orders/date-range',
        {
          params: {
            startDate,
            endDate,
          },
        }
      );

      setOrders(response.data.orders);
      setTotalAmount(response.data.totalAmount);
      console.log('Fetched Orders:', response.data.orders);
      console.log('Total Amount:', response.data.totalAmount);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [startDate, endDate]); // Refetch orders when startDate or endDate changes

  return (
    <div>
      <DataTableComponent data={orders} />
    </div>
  );
};

export default AllOrderLayOut;

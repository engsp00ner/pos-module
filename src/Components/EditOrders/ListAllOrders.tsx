import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import axios from 'axios';
import DrawerBase from '../Drawer/DrawerBase';
import AddProduct from '../../orders/OrderTable/AddProduct';
import TrashButton from '../TrashButton';

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

const columns: TableColumnsType<Order> = [
  {
    title: 'م', // Order ID
    dataIndex: 'Id',
    key: 'Id',
    render: (_text, _record, index) => index + 1, // Start from 1
    width: '50px',
  },
  {
    title: ' تاريخ الطلب', // Order Date
    dataIndex: 'orderDate',
    key: 'orderDate',
    align: 'center',
    width: '600px',
    render: (orderDate) => {
      const dateObj = new Date(orderDate);
      const date = dateObj.toLocaleDateString('en-GB'); // Formats the date as DD/MM/YYYY
      const time = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      }); // 12-hour format with AM/PM
      return (
        <div
          className="row justify-content-center "
          style={{ fontSize: '1.5rem' }}
        >
          <div style={{ padding: '15px' }}>
            <span>التاريخ:</span>
            <span> {date}</span>
          </div>
          <div style={{ padding: '15px' }}>
            <span>الوقت:</span>
            <span> {time}</span>
          </div>
        </div>
      );
    },
  },
  {
    title: 'إجمالي الطلب', // Total Amount
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    width: '150px',
  },
  {
    title: ' ', // Actions: Edit and Delete buttons
    dataIndex: '',
    key: 'actions',
    render: (record) => (
      <div className="row">
        <DrawerBase>
          <AddProduct title="تعديل المنتج" />
        </DrawerBase>
        <TrashButton HandleDeleteClicked={() => handleDeleteOrder(record.Id)} />
      </div>
    ),
  },
];

// Control section
const handleDeleteOrder = (orderId: string) => {
  console.log('handleDeleteOrder', orderId);
};

// Main Function
const ListallOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]); // State to control expanded rows

  // Date settings
  const getStartDate = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0);
    return startDate.toISOString();
  };

  const getEndDate = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate());
    endDate.setHours(23, 59, 59, 999);
    return endDate.toISOString();
  };

  const [startDate, setStartDate] = useState(getStartDate());
  const [endDate, setEndDate] = useState(getEndDate());

  // Fetch the data from the database
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

  // Handle row expansion
  const handleExpand = (expanded: boolean, record: Order) => {
    if (expanded) {
      setExpandedRowKeys((prev) => [...prev, record.Id]);
    } else {
      setExpandedRowKeys((prev) => prev.filter((key) => key !== record.Id));
    }
  };

  return (
    <Table<Order>
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div>
            {record.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#fdfceac4',
                  fontSize: '1.2rem',
                }}
              >
                <div style={{ width: '250px' }}>
                  <span style={{ fontWeight: 'bold' }}> المنتج:</span>
                  <span> {item.name}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>السعر: </span>
                  <span>{item.price}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>الكمية:</span>
                  <span>{item.ItemAmount}</span>
                </div>
                {item.image && (
                  <img src={item.image} alt={item.name} width="50" />
                )}
              </div>
            ))}
          </div>
        ),
        rowExpandable: (record) => record.Id !== 'Not Expandable',
        onExpand: handleExpand, // Set the onExpand callback
      }}
      dataSource={orders}
      className="custom-table"
      rowKey="Id" // Set the unique key for each row
    />
  );
};

export default ListallOrders;

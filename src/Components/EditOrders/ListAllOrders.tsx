import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import axios from 'axios';
import DrawerBase from '../Drawer/DrawerBase';
import AddProduct from '../../orders/OrderTable/AddProduct';
import TrashButton from '../TrashButton';
import SelectDate from '../DatePicker';

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

// table columns
const columns: TableColumnsType<Order> = [
  {
    title: 'م', // Order ID
    dataIndex: 'Id',
    key: 'Id',
    render: (_text, _record, index) => (
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{index + 1}</div>
    ),
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
          className="row justify-content-center"
          style={{ fontSize: '1.5rem' }}
        >
          <div style={{ padding: '15px' }}>
            <span>الـتـاريـخ:</span>
            <span style={{ color: '#af4343d4' }}> {date}</span>
          </div>
          <div style={{ padding: '15px' }}>
            <span>الــوقــت:</span>
            <span style={{ color: '#2fbf5be0' }}> {time}</span>
          </div>
        </div>
      );
    },
  },
  {
    title: 'إجمالي الطلب', // Total Amount
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    width: '250px',
    render: (amount) => (
      <div
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#4CAF50',
          fontSize: '1.5rem',
        }}
      >
        {new Intl.NumberFormat('ar-eg', {
          minimumFractionDigits: 2,
        }).format(amount)}
      </div>
    ),
  },
  {
    title: ' ', // Actions: Edit and Delete buttons
    dataIndex: '',
    key: 'actions',
    render: (record) => (
      <div className="row justify-content-center">
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
    startDate.setDate(startDate.getDate() - 1);
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

  // Handle row click to toggle expansion
  const handleRowClick = (record: Order) => {
    const isRowExpanded = expandedRowKeys.includes(record.Id);
    handleExpand(!isRowExpanded, record); // Toggle expansion state
  };

  return (
    <>
      <SelectDate
        onDatesChange={(dates: [string | null, string | null]) => {
          // Update the states only if dates are not null
          if (dates[0] && dates[1]) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
          } else {
            // Handle case when dates are null, if needed
          }
        }}
      />

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
                    <span style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
                      المنتج:
                    </span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                      {item.name}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
                      السعر:{' '}
                    </span>
                    <span
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#4CAF50',
                        fontSize: '1.5rem',
                      }}
                    >
                      {new Intl.NumberFormat('ar-eg', {
                        minimumFractionDigits: 2,
                      }).format(item.price)}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
                      الكمية:
                    </span>
                    <span style={{ color: 'red', fontSize: '1.7rem' }}>
                      {item.ItemAmount}
                    </span>
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
          expandedRowKeys, // Use expandedRowKeys inside expandable
        }}
        dataSource={orders}
        className="custom-table"
        rowKey="Id" // Set the unique key for each row
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Trigger row click to expand
        })}
      />
    </>
  );
};

export default ListallOrders;

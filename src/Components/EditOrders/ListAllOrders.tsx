/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { AutoComplete, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import axios from 'axios';
import { FilterOutlined } from '@ant-design/icons';
import SelectDate from '../DatePicker';

interface OrderItem {
  id: string;
  name: string;
  sealprice: number;
  buyprice: number;
  ItemAmount: number;
  image: string;
}
interface Customer {
  id: string;
  name: string;
}
interface Order {
  Id: string;
  orderDate: string;
  totalAmount: number;
  items: OrderItem[];
  customer: Customer;
  paymentType: string;
}

const token = localStorage.getItem('token');

// Main Function
const ListallOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]); // State to control expanded rows
  const [filterVisible, setFilterVisible] = useState(false);
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);

  // Auto complete Section Settings
  const [options, setOptions] = useState<{ value: string }[]>([]); // AutoComplete options
  const [customersData, setCustomersData] = useState<Customer[]>([]); // Store original customer data
  const [customer, setCustomer] = useState<Customer | undefined>(); // State to store the selected customer
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
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        }
      );

      setOrders(response.data.orders);
      setFilteredOrders(response.data.orders); // Initialize filteredOrders with all orders
      // console.log('Fetched Orders:', response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    getAllCustomers();
  }, [startDate, endDate]); // Refetch orders when startDate or endDate changes

  // Update filteredOrders when customer or orders change
  useEffect(() => {
    if (customer) {
      const filtered = orders.filter(
        (order) => order.customer.name === customer.name
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [customer, orders]);

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

  // get all customers
  const getAllCustomers = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/customer');

      // Check if result.data exists and contains data
      if (!result.data) {
        console.error('Error: no data found');
        return;
      }

      // Save the original customer data
      setCustomersData(result.data);

      // map the customer data to the format AutoComplete expects
      const customerOptions = result.data.map((custom: Customer) => ({
        value: custom.name, // Map `name` to the `value` property
      }));

      setOptions(customerOptions); // Set the options for AutoComplete
      // console.log('Customers data:', result.data);
    } catch (error) {
      console.error('Error fetching customers:', error); // Log any errors
    }
  };

  // Handle selecting a customer from the AutoComplete options
  const handleCustomerSelect = (value: string) => {
    // Find the selected customer from the original customer data
    const selectedCustomer = customersData.find((cust) => cust.name === value);
    if (selectedCustomer) {
      setCustomer(selectedCustomer); // Save the selected customer (id and name) in state
      setIsCustomerSelected(true);
    } else {
      setCustomer(undefined); // If customer not found, reset
      setIsCustomerSelected(false);
    }
    setFilterVisible(false); // Hide the filter input
  };
  // handle when you click on filter to show the auto complete field
  const handleFilterClicked = () => {
    setFilterVisible(!filterVisible);
  };

  // Handle onBlur for AutoComplete
  const handleBlur = () => {
    setFilterVisible(false); // Hide filter when AutoComplete loses focus
    console.log('filter Visible:', filterVisible);
  };

  // Clear customer selection
  const handleClearCustomer = () => {
    setCustomer(undefined); // Set customer to undefined to show all orders
    setFilteredOrders(orders); // Reset to all orders
    setIsCustomerSelected(false); // Mark no customer selected for the filter icon color
  };

  // Table columns
  const columns: TableColumnsType<Order> = [
    // serial
    {
      title: 'م', // Order ID
      dataIndex: 'Id',
      key: 'Id',
      render: (_text, _record, index) => (
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          {index + 1}
        </div>
      ),
      width: '50px',
    },

    // order date
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

    // customer name
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>أسم العميل </span>
          {customer && (
            <span style={{ fontSize: '.75rem', marginLeft: '5px' }}>
              ({customer.name})
            </span>
          )}
          <FilterOutlined
            onClick={handleFilterClicked}
            style={{
              marginLeft: 8,
              cursor: 'pointer',
              color: isCustomerSelected ? 'orange' : 'white', // Change color based on selection
            }}
          />
          {filterVisible && (
            <AutoComplete
              className="input"
              options={options}
              style={{ width: 250, marginLeft: 10 }}
              placeholder={customer ? customer.name : 'إختيار العميل'} // Set placeholder if no customer is selected
              value={customer ? customer.name : undefined} // Display selected customer or placeholder
              filterOption={(inputValue, option) =>
                option?.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
              onSelect={(value) => {
                handleCustomerSelect(value); // Set selected customer and filter orders
                setFilterVisible(false); // Hide filter after selection
                setIsCustomerSelected(true); // Mark customer as selected for the orange icon color
              }}
              onChange={(value) => {
                if (value === '') {
                  // Reset customer state and display all orders when the input is cleared
                  handleClearCustomer(); // Clear selection when input is cleared
                }
              }}
              onBlur={handleBlur} // Close the dropdown when focus is lost
              // Add a clear button (X icon) at the end of the input
              allowClear
            />
          )}
        </div>
      ),
      dataIndex: ['customer', 'name'],
      key: 'customerName',
      width: '250px',
      render: (_text, record) => (
        <div
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          {record.customer.name}
        </div>
      ),
    },

    // payment type
    {
      title: 'نوع المعامله', // Payment Type filter
      dataIndex: 'paymentType',
      key: 'paymentType',
      width: '250px',
      filters: [
        { text: 'نقدي', value: 'Cash' },
        { text: 'اّجل', value: 'credit' },
      ],
      onFilter: (value, record) => record.paymentType === value,
      render: (paymentType) => (
        <div
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          {paymentType === 'Cash' ? 'نقدي' : 'اّجل'}
        </div>
      ),
    },
    // Total paid
    {
      title: 'إجمالي الطلب', // Total Amount
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '170px',
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

    // margin to be calculated
    {
      title: 'الربح', // Margin Column
      key: 'margin',
      width: '150px',
      render: (_text, record) => {
        const totalSalePrice = record.items.reduce(
          (acc, item) => acc + item.sealprice * item.ItemAmount,
          0
        );
        const totalCostPrice = record.items.reduce(
          (acc, item) => acc + item.buyprice * item.ItemAmount,
          0
        );
        const margin = totalSalePrice - totalCostPrice;
        return (
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
            }).format(margin)}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="container">
        <div className="row">
          {/* Left-aligned: SelectDate */}
          <div className="col-md-6">
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
          </div>
        </div>
      </div>
      <Table<Order>
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div
              style={{
                backgroundColor:
                  record.paymentType === 'Cash'
                    ? 'rgb(205 235 202 / 83%)'
                    : '#fdfceac4',
              }}
            >
              {record.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
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
                      سعر الشراء:
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
                      }).format(item.sealprice)}
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
          onExpand: handleExpand,
          expandedRowKeys,
        }}
        dataSource={filteredOrders}
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

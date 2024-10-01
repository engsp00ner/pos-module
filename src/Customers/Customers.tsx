import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import TrashButton from '../Components/TrashButton';
import EditButton from '../Components/EditButton';

interface DataType extends Record<string, unknown> {
  key: React.Key;
  name: string;
  id: string;
  CreditBalance: string;

  edit: React.ReactNode;
}
interface Customer {
  key: React.Key;
  name: string;
  id: string;
  CreditBalance: string;
  edit: React.ReactNode;
}
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'م',
    key: 'index',
    width: '2rem',
    render: (_text, _record, index) => (
      <>
        <span
          style={{
            fontSize: '1.5em', // Adjust font size as needed
            textAlign: 'center',
          }}
        >
          {index + 1}
        </span>
      </>
    ), // Increment the index starting from 1
  },
  {
    title: 'اسم العميل / الجهة',
    dataIndex: 'name',
    key: 'name',
    width: 540,
    render: (text) => (
      <>
        <span
          style={{
            fontSize: '1.7em', // Adjust font size as needed
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {text}
        </span>
      </>
    ),
  },
  {
    title: 'إجمالي المديونية',
    dataIndex: 'CreditBalance',
    key: 'CreditBalance',
    width: 540,
    render: (text) => (
      <>
        <span
          style={{
            fontSize: '1.7em', // Adjust font size as needed
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {text}
        </span>
      </>
    ),
  },
  {
    title: '',
    dataIndex: 'edit',
    render: (text) => (
      <span
        style={{
          fontSize: '1.2em', // Adjust font size as needed
          textAlign: 'center',
        }}
      >
        {text}
      </span>
    ),
  },
];

const ListAllCustomers: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]); // State to store customer data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // get all customers from data base
  const fetchCustomers = async () => {
    try {
      setLoading(true); // End loading

      const response = await axios.get('http://localhost:3001/api/customer');
      const CustomersArray = response.data;
      console.log('Customers Array', CustomersArray);
      await setData(CustomersArray);
      console.log('productsArray fetch', data);
      const formattedCustomers = CustomersArray.map((customer: Customer) => ({
        key: customer.id, // Use 'id' as the key
        name: customer.name,
        CreditBalance: '0' || customer.CreditBalance,
        id: customer.id,
        edit: (
          <div
            className="row"
            style={{
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            <EditButton
              HandleClicked={() =>
                console.log('Edit Clicked for Id: ', customer.id)
              }
            />
            <TrashButton
              HandleDeleteClicked={() =>
                console.log('Delete button for ID:', customer.id)
              }
            />
          </div>
        ),
      }));
      // Update the state with formatted customers
      setData(formattedCustomers);

      setLoading(false); // End loading
    } catch (error) {
      setLoading(false); // End loading

      // Log any errors to the console
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // End loading
    }
  };
  // Fetch customers when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <>
      <div>
        <h2>جميع العملاء</h2>
      </div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <Table<DataType>
          className="custom-table"
          columns={columns}
          dataSource={data}
        />
      )}
    </>
  );
};

export default ListAllCustomers;

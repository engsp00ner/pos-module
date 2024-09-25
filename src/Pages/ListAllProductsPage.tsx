import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import '../CustomStyle/AllOrdersTable.css';
import { AlertFilled } from '@ant-design/icons';
import TrashButton from '../Components/TrashButton';
import EditButton from '../Components/EditButton';

type TableRowSelection<T extends Record<string, unknown>> =
  TableProps<T>['rowSelection'];

interface DataType extends Record<string, unknown> {
  key: React.Key;
  Productname: string;
  Price: number;
  category: string;
  amount: React.ReactNode;
  edit: React.ReactNode;
}
// table colums
const columns: TableColumnsType<DataType> = [
  {
    title: 'أسم المنتج',
    dataIndex: 'Productname',
    width: 240,
    render: (text) => (
      <span
        style={{
          fontSize: '1.2em', // Adjust font size as needed
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: 'السعر',
    dataIndex: 'Price',
    width: 140,
    render: (text) => (
      <span
        style={{
          fontSize: '1.2em', // Adjust font size as needed
        }}
      >
        {text}
      </span>
    ),
  },

  {
    title: 'التصنيف',
    dataIndex: 'category',
    width: 240,
  },
  {
    title: 'الكـميه المتاحه',
    dataIndex: 'amount',
    width: 180,
    render: (text, record, index) => (
      <span
        style={{
          fontSize: '1.2em', // Adjust font size as needed
          color: index > 5 ? 'green' : 'red', // Conditional color
          textAlign: 'center',
        }}
      >
        {text}
      </span>
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
const handleEditOrder = () => {
  console.log('Edit Clicked');
};
const handleDeleteOrder = () => {
  console.log('Delete Clicked');
};

const dataSource = Array.from({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  Productname: `Edward King ${i}`,
  Price: 32,
  category: `London, Park Lane no. ${i}`,
  amount: (
    <div>
      {i} <AlertFilled />
    </div>
  ),
  edit: (
    <div className="row">
      <EditButton HandleClicked={handleEditOrder} />
      <TrashButton HandleDeleteClicked={handleDeleteOrder} />
    </div>
  ),
}));

const ListAllProducts: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <Table<DataType>
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      className="custom-table" // Add a custom class to the table
    />
  );
};

export default ListAllProducts;

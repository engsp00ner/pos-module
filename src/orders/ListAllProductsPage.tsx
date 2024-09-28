import React, { useEffect, useState } from 'react';
import { Drawer, Table, type TableColumnsType, type TableProps } from 'antd';
import '../CustomStyle/AllOrdersTable.css';
import { AlertFilled } from '@ant-design/icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import TrashButton from '../Components/TrashButton';
import EditButton from '../Components/EditButton';
import PopUpBase from '../Components/popupwindow/PopUpBase';
import AddProduct from './OrderTable/AddProduct';
import DrawerBase from '../Components/Drawer/DrawerBase';

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

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  productamount: number;
  category: {
    type: string;
    displayName: string;
    categoryImage: string;
  };
}

// table colums
const columns: TableColumnsType<DataType> = [
  {
    title: 'أسم المنتج',
    dataIndex: 'Productname',
    width: 240,
    render: (text, record) => (
      <>
        <img
          src={BaseImgUrl + record.image}
          style={{ width: '50px' }}
          alt="not found"
        />
        <span
          style={{
            fontSize: '1.2em', // Adjust font size as needed
            fontWeight: 'bold',
          }}
        >
          {text}
        </span>
      </>
    ),
  },
  {
    title: 'السعر',
    dataIndex: 'Price',
    width: 140,
    render: (text) => (
      <span
        style={{
          fontSize: '2rem', // Adjust font size as needed
          alignItems: 'center',
          textAlign: 'center',
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
    render: (text, record) => (
      <>
        <img
          src={`${record.categoryimage}`}
          style={{ width: '40px' }}
          alt="not found"
        />
        <span
          style={{
            fontSize: '1.2em', // Adjust font size as needed
            fontWeight: 'bold',
          }}
        >
          {text}
        </span>
      </>
    ),
  },
  {
    title: 'الكـميه المتاحه',
    dataIndex: 'amount',
    width: 180,
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

const BaseImgUrl = '/assets/itemImages/products/';

const handleEditOrder = () => {
  console.log('Edit Clicked');
};

const handleDeleteProduct = async (id: React.Key) => {
  console.log('Delete Clicked for id:', id);
  try {
    // Show confirmation alert first
    const result = await Swal.fire({
      title: 'هل أنت واثق أنك تريد الحذف',
      text: 'في حاله الحذف فلن تتمكن من إسترجاع البيانات نهائي !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'تراجع',
      confirmButtonText: 'تأكيد الحذف!',
    });

    // If the user confirms the deletion
    if (result.isConfirmed) {
      // Make the delete request
      await axios.delete(`http://localhost:3001/api/products/${id.toString()}`);

      // Show success alert
      Swal.fire({
        title: 'تم الحذف!',
        text: 'تم حذف المنتج .',
        icon: 'success',
      });

      // Optionally update the state to remove the deleted product from the list
      // SetProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));

      console.log('Product deleted successfully', id);
    } else {
      console.log('Product deletion was canceled');
    }
  } catch (error) {
    // Handle error
    console.error('Error deleting product:', error);

    // Optionally show error alert
    Swal.fire({
      title: 'Error!',
      text: 'There was a problem deleting the product.',
      icon: 'error',
    });
  }
};
const ListAllProducts: React.FC = () => {
  const [products, SetProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products on component mount

  // fetch data from database
  const fetchProducts = async () => {
    setIsLoading(true); // Start loading

    try {
      // Fetch products from the backend
      const result = await axios.get('http://localhost:3001/api/products');

      const productsArray = result.data;
      console.log('productsArray', productsArray);

      // Update the products state with the fetched data
      await SetProducts(productsArray);
      console.log('productsArray fetch', products);
    } catch (error) {
      // Log any errors to the console
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };
  useEffect(() => {
    fetchProducts();
    console.log('Date', Date.now());
    console.log('productsArray use effect:', products);
  }, []); // Empty dependency array ensures this runs once on mount

  const dataSource = products.map((product, i) => ({
    key: i,
    Productname: product.name,
    image: product.image, // Add the image URL as a separate property
    Price: product.price,
    category: product.category.displayName, //  display the category's display name
    categoryimage: product.category.categoryImage, // display the category's display image
    amount: (
      <div
        style={{
          textAlign: 'center',
          color: product.productamount > 10 ? 'green' : 'red',
        }}
      >
        {product.productamount} <AlertFilled />
      </div>
    ),
    edit: (
      <div
        className="row"
        style={{
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <DrawerBase>
          <AddProduct title="  تعديل المنتج" />
        </DrawerBase>

        <TrashButton
          HandleDeleteClicked={() => handleDeleteProduct(product.id)}
        />
      </div>
    ),
  }));

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
    <div>
      {' '}
      {/* Added a wrapping div */}
      {isLoading ? (
        <h1>Loading ... </h1>
      ) : (
        <div>
          <PopUpBase>
            <AddProduct title="إضافه منتج جديد" />
          </PopUpBase>
          <Table<DataType>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            className="custom-table"
          />
        </div>
      )}
    </div>
  );
};

export default ListAllProducts;

import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // Import DataTable CSS
import { Link } from 'react-router-dom';
import PopupComponent from '../popupwindow/PopupComponent';

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

interface DataTableProps {
  data: Order[];
}

const DataTableComponent: React.FC<DataTableProps> = ({ data }) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    console.log('is open popup :', isPopupOpen);
  };
  const handleEditOrder = () => {
    togglePopup();
    console.log('edit button clicked');
  };
  const handleDeleteOrder = () => {
    console.log('Delete button clicked');
  };
  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
      });
    }

    return () => {
      if (tableRef.current) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);
  return (
    <div className="table-responsive">
      <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
        <div className="row">
          <div className="col-sm-12 col-md-6" />
        </div>
      </div>
      <table
        id="productorder"
        className="display"
        ref={tableRef}
        style={{ border: '2px solid black', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            <th
              style={{
                border: '1px solid black',
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
                width: '5px',
              }}
            >
              م
            </th>
            <th
              style={{
                border: '1px solid black',
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
                width: '5px',
              }}
            >
              تاريخ
            </th>
            <th
              style={{
                border: '1px solid black',
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
                width: '5px',
              }}
            >
              تفــــاصــــيــــل الـــطــلـــب
            </th>
            <th
              style={{
                border: '.5px solid black',
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
                width: '5px',
              }}
            >
              {' '}
              إجمالي الطلب
            </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr key={index}>
              {/* Serial */}
              <td
                style={{
                  border: '1px solid black',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '5px',
                  color: 'black',
                }}
              >
                {index + 1}
              </td>
              {/* Date */}
              <td
                style={{
                  border: '1px solid black',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  width: '5px',
                }}
              >
                {/* This formats to dd/mm/yyyy */}
                {new Date(order.orderDate).toLocaleDateString('en-GB')}{' '}
              </td>
              {/* order Details */}
              <td style={{ border: '1px solid black', fontSize: '1rem' }}>
                {order.items.map((item, key) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '10px',
                      borderBottom: '1px solid black',
                    }}
                  >
                    <div style={{ width: '150px' }}>المنتج: {item.name}</div>
                    <div>السعر: {item.price} </div>
                    <div>الكمية: {item.ItemAmount}</div>
                    <img src={item.image} alt={item.name} width="50" />
                  </div>
                ))}
              </td>
              <td
                style={{
                  border: '1px solid black',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '5px',
                }}
              >
                ${order.totalAmount.toFixed(2)}
              </td>
              {/* order edit */}
              <td
                style={{
                  border: '.5px solid black',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '5px',
                }}
              >
                <Link
                  to="#"
                  className="text-info mr-10"
                  title="تعديل الطلب"
                  onClick={handleEditOrder}
                >
                  <i className="ti-marker-alt" />
                </Link>
                <Link
                  to="#"
                  className="text-danger"
                  title="  حذف الطلب"
                  onClick={handleDeleteOrder}
                >
                  <i className="ti-trash" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Use the PopupComponent */}
      <PopupComponent isOpen={isPopupOpen} onClose={togglePopup}>
        <h2>Pop-up Content</h2>
        <p>This is a reusable pop-up window. Click outside to close.</p>
      </PopupComponent>
    </div>
  );
};

export default DataTableComponent;

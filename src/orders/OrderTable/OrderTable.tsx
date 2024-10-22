/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, AutoComplete, Flex, Spin } from 'antd';
import Swal from 'sweetalert2';
import { RootState } from '../../Store'; // Adjust the import path as needed
import { TableRaw } from './TableRaw';
import { AddButton } from './AddButton';
import {
  resetOrder,
  updateItemAmount,
  setCurrentBalance,
} from '../../features/orders/orderSlice';
import './CancelButton.css';
import '../../CustomStyle/ToggleSwitch.css';
import '../../CustomStyle/flipped.css';

const token = localStorage.getItem('token'); // Get token from localStorage
// Define the customer interface
interface Customer {
  id: string;
  name: string;
}

interface AxiosError {
  response: {
    data: {
      error: string;
      message: string;
    };
    status: number;
  };
  message: string;
}
const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
export const OrderTable: React.FC = () => {
  const orderItems = useSelector((state: RootState) => state.order.items); // Get items from the Redux store
  const dispatch = useDispatch();
  const [isLoading, SetIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<'Cash' | 'Credit'>('Cash'); // State for toggle
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid'>(
    'paid'
  ); // Set default payment status as 'pending'

  const [options, setOptions] = useState<{ value: string }[]>([]); // AutoComplete options
  const [customersData, setCustomersData] = useState<Customer[]>([]); // Store original customer data
  const [customer, setCustomer] = useState<Customer>({
    id: '0',
    name: 'عميل تجزئة',
  }); // State to store the selected customer
  const content = <div style={contentStyle} />;
  // Calculate the total order amount
  const orderTotal = orderItems.reduce((total, item) => {
    return total + item.sealprice * item.ItemAmount;
  }, 0);
  const [refreshKey, setRefreshKey] = useState(0); // State to force rerender
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 1);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  // Get the current balance for the period
  const getTotalAmountForPeriod = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/orders/date-range',
        {
          params: { startDate, endDate, paymentType },
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in Authorization header
          },
        }
      );
      dispatch(setCurrentBalance(response.data.totalAmount));
    } catch (error) {
      console.error('Error fetching total amount:', error);
    }
  };

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
      console.log('Customers data:', result.data);
    } catch (error) {
      console.error('Error fetching customers:', error); // Log any errors
    }
  };

  const handleAmountChange = (id: string, newAmount: number) => {
    dispatch(updateItemAmount({ id, newAmount }));
  };

  const handleUpdateProductAmount = async (id: string, soldAmount: number) => {
    try {
      //  SoldAmount is deducted from the current product amount
      const response = await axios.put(
        `http://localhost:3001/api/products/updatesoldamount/${id}`,
        {
          SoldAmount: soldAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        }
      );
      console.log('Product updated successfully:', response.data);
    } catch (error: unknown) {
      const e = error as AxiosError;
      if (e.response && e.response.data) {
        console.error('Error updating product:', e.response.data.message);
      } else {
        console.error('Error updating product:', e.message);
      }
    }
  };

  const generateRandomId = () => {
    return `order_${Math.random().toString(36).substr(2, 9)}${Date.now()}`;
  };

  const HandleAddOrder = async () => {
    const itemsWithId = orderItems.map((item) => ({
      id: item.id,
      name: item.name,
      sealprice: item.sealprice,
      buyprice: item.buyprice,
      ItemAmount: item.ItemAmount,
      image: item.image,
    }));

    const orderData = {
      Id: generateRandomId(),
      items: itemsWithId,
      totalAmount: orderTotal,
      paymentType,
      paymentStatus,
      customer,
      paymentDate: paymentStatus === 'paid' ? new Date() : null,
    };

    try {
      SetIsLoading(true);
      const response = await axios.post(
        'http://localhost:3001/api/orders/create',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Use Promise.all to handle all updates concurrently
        await Promise.all(
          orderItems.map((item) => {
            console.log('Product ID to be updated:', item.id);
            return handleUpdateProductAmount(item.id, item.ItemAmount);
          })
        );

        dispatch(resetOrder(this)); // Reset order in Redux store
        Swal.fire({
          icon: 'success',
          title: 'تم إضافة الطلب بنجاح',
          showConfirmButton: false,
          timer: 1500,
        });

        handleReset(); // Reset local state
        setRefreshKey((oldKey) => oldKey + 1); // Trigger a re-render
      }
    } catch (error) {
      console.error('Error saving order:', error);
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'لم يتم إضافة الطلب بنجاح',
      });
    } finally {
      SetIsLoading(false);
    }
  };

  const HandleDeleteOrder = () => {
    dispatch(resetOrder(this)); // No need for `this` here
    handleReset();
  };

  // Toggle between Cash and Credit
  const handleToggle = () => {
    setPaymentType((prevType) => (prevType === 'Cash' ? 'Credit' : 'Cash'));
    setPaymentStatus((prevType) => (prevType === 'paid' ? 'pending' : 'paid'));
  };

  // Function to handle selecting a customer from the AutoComplete options
  const handleCustomerSelect = (value: string) => {
    // Find the selected customer from the original customer data
    const selectedCustomer = customersData.find((cust) => cust.name === value);
    if (selectedCustomer) {
      setCustomer(selectedCustomer); // Save the selected customer (id and name) in state
      console.log('Selected Customer:', selectedCustomer); // For debugging
    }
  };

  // function to reset all values after i save
  const handleReset = () => {
    setCustomer({ id: '0', name: 'عميل تجزئة' });
    setPaymentType('Cash');
    setPaymentStatus('paid');
    SetIsLoading(false);
    setCustomersData([]);
  };

  useEffect(() => {
    getTotalAmountForPeriod();
    getAllCustomers();
    getTotalAmountForPeriod();
  }, [refreshKey]); // Only run once when the component mounts

  return (
    <>
      {isLoading ? (
        <Flex gap="middle" vertical>
          <Flex gap="middle">
            <Spin tip="Loading" size="large">
              {content}
            </Spin>
          </Flex>
        </Flex>
      ) : (
        <div className="col-12 col-lg-12 col-xl-12 hold-transition light-skin sidebar-mini theme-primary">
          {/* Flipping card for payment type */}
          <div className="card-credit">
            <div
              className={`card-credit-inner ${paymentType === 'Credit' ? 'flipped' : ''}`} // Flip when paymentType is Credit
            >
              <div className="card-credit-front">
                <p>نقدي</p>
              </div>
              <div className="card-credit-back">
                <p>اّجل</p>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="box-body">
              <div className="d-flex justify-content-between align-items-center w-800">
                <div className="toggle-switch-wrapper">
                  <span className="toggle-switch__text">نوع المعامله</span>
                  <label htmlFor="payment-toggle" className="toggle-switch">
                    <input
                      id="payment-toggle"
                      type="checkbox"
                      checked={paymentType === 'Credit'}
                      onChange={handleToggle} // Toggle payment type
                    />
                    <span className="toggle-switch__slider" />
                  </label>
                </div>
                {paymentType === 'Credit' && (
                  <div className="input-container">
                    <AutoComplete
                      className="input"
                      options={options}
                      placeholder="إختيار العميل"
                      filterOption={(inputValue, option) =>
                        option?.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      onSelect={handleCustomerSelect} // Your selection logic
                    />
                    <label className="label" htmlFor="input">
                      إختيار العميل
                    </label>
                    <div className="topline" />
                    <div className="underline" />
                  </div>
                )}
              </div>

              <div className="table-responsive">
                <table
                  id="productorder"
                  className={` ${paymentType === 'Cash' ? 'border-primary' : 'border-warning'} table table-hover no-wrap product-order b-1 border-primary`}
                  data-page-size="10"
                >
                  <thead
                    className={` ${paymentType === 'Cash' ? 'bg-primary' : 'bg-warning'}`}
                    style={{ fontSize: '25px' }}
                  >
                    <tr>
                      <th>أسم المنتج</th>
                      <th>صورة المنتج</th>
                      <th>سعر الوحدة</th>
                      <th>الكمية</th>
                      <th>إجمالي السعر</th>
                      <th>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, key) => (
                      <TableRaw
                        itemId={item.id}
                        key={key}
                        ItemAmount={item.ItemAmount}
                        ItemPrice={item.sealprice}
                        ProductName={item.name}
                        ImgUrl={`${item.image}`}
                        onAmountChange={(newAmount) =>
                          handleAmountChange(item.id, newAmount)
                        }
                      />
                    ))}
                    {/* Order Total Row */}
                    <tr
                      style={{ backgroundColor: '#f0f8ff', fontWeight: 'bold' }}
                    >
                      <td
                        colSpan={4}
                        style={{
                          textAlign: 'right',
                          fontWeight: 'bold',
                          fontSize: '2rem',
                        }}
                      >
                        إجمالي السعر الكلي:
                      </td>
                      <td style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                        {orderTotal.toFixed(2)}
                      </td>
                      <td />
                    </tr>
                  </tbody>
                </table>
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <AddButton
                      onClick={HandleAddOrder}
                      title="إتـمـام الطـلب"
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      className="button-cancel"
                      type="button"
                      onClick={HandleDeleteOrder}
                    >
                      حذف الطلب
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
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

export const OrderTable: React.FC = () => {
  const currentBalance = useSelector(
    (state: RootState) => state.order.currentBalance
  );
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

  // Calculate the total order amount
  const orderTotal = orderItems.reduce((total, item) => {
    return total + item.sealprice * item.ItemAmount;
  }, 0);

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 1);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  // Get the current balance for the period
  const getTotalAmountForPeriod = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/orders/total-amount',
        {
          params: { startDate, endDate },
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

      // Now map the customer data to the format AutoComplete expects
      const customerOptions = result.data.map((custom: Customer) => ({
        value: custom.name, // Map `name` to the `value` property
      }));

      setOptions(customerOptions); // Set the options for AutoComplete
      console.log('Customers data:', result.data);
    } catch (error) {
      console.error('Error fetching customers:', error); // Log any errors
    }
  };

  useEffect(() => {
    getTotalAmountForPeriod();
    getAllCustomers();
  }, []); // Only run once when the component mounts

  const handleAmountChange = (id: string, newAmount: number) => {
    dispatch(updateItemAmount({ id, newAmount }));
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
      paymentType, // Add payment type to the order
      paymentStatus, // Add payment status to the order
      customer, // customer
      paymentDate: paymentStatus === 'paid' ? new Date() : null, // Set payment date if the status is 'paid'
    };

    try {
      SetIsLoading(true);
      const response = await axios.post(
        'http://localhost:3001/api/orders/create',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
      SetIsLoading(false);
      dispatch(resetOrder(this)); // Reset order without passing `this`
      console.log('Order saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      SetIsLoading(false);
    }
  };

  const HandleDeleteOrder = () => {
    dispatch(resetOrder(this)); // No need for `this` here
  };

  // Toggle between Cash and Credit
  const handleToggle = () => {
    setPaymentType(paymentType === 'Cash' ? 'Credit' : 'Cash');
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
  return (
    <>
      {isLoading ? (
        <h3>Loading...</h3>
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

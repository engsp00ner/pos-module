import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RootState } from '../../Store'; // Adjust the import path as needed
import { TableRaw } from './TableRaw';
import { AddButton } from './AddButton';
import {
  resetOrder,
  updateItemAmount,
  setCurrentBalance,
} from '../../features/orders/orderSlice';
import './CancelButton.css';

export const OrderTable: React.FC = () => {
  const currentBalance = useSelector(
    (state: RootState) => state.order.currentBalance
  );
  // Get the items from the Redux store
  const orderItems = useSelector((state: RootState) => state.order.items);
  // use the dispatch to get from the store
  const dispatch = useDispatch();
  const [isLoading, SetIsLoading] = useState(false);
  // Calculate the total order amount
  const orderTotal = orderItems.reduce((total, item) => {
    return total + item.price * item.ItemAmount;
  }, 0);

  const startDate = new Date();
  const endDate = new Date();

  // Set yesterday's date by subtracting one day
  endDate.setDate(startDate.getDate() + 1);

  // Set the time of today and yesterday to midnight (start of the day)
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  // get the current balance for the period

  const getTotalAmountForPeriod = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/orders/total-amount',
        {
          params: { startDate, endDate },
        }
      );
      console.log(`startDate:${startDate}`);
      console.log(`startDate:${endDate}`);
      console.log('Total amount:', response.data.totalAmount);
      dispatch(setCurrentBalance(response.data.totalAmount));
      console.log('CurrentBalance :', currentBalance);
    } catch (error) {
      console.error('Error fetching total amount:', error);
    }
  };

  // Fetch balance and update whenever CurrentBalance changes
  useEffect(() => {
    getTotalAmountForPeriod();
  });

  // Handle updating the item amount
  const handleAmountChange = (id: string, newAmount: number) => {
    // Dispatch an action to update the item amount in the Redux store
    dispatch(updateItemAmount({ id, newAmount }));
  };

  const generateRandomId = () => {
    return `order_${Math.random().toString(36).substr(2, 9)}${Date.now()}`;
  };

  // this will handle adding the orders to the data base
  const HandleAddOrder = async () => {
    const itemsWithId = orderItems.map((item) => ({
      id: `item_${Math.random().toString(36).substr(2, 9)}${Date.now()}`, // Generate string ID
      name: item.name,
      price: item.price,
      ItemAmount: item.ItemAmount,
      image: item.image,
    }));

    const orderData = {
      Id: generateRandomId(), // Generate random order ID
      items: itemsWithId,
      totalAmount: orderTotal,
    };
    getTotalAmountForPeriod();

    // add total amount function

    console.log('Order Data:', orderData);
    try {
      // Send a POST request to the backend API to save the order
      SetIsLoading(true);
      const response = await axios.post(
        'http://localhost:3001/api/orders/create',
        orderData
      );
      SetIsLoading(false);
      console.log('Order saved successfully:', response.data);
      // Reset the order items after the successful order
      dispatch(resetOrder(this));
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      SetIsLoading(false);
    }
  };

  // Delete Function
  const HandleDeleteOrder = () => {
    dispatch(resetOrder(this));
  };
  return (
    <>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="col-12 col-lg-12 col-xl-12 hold-transition light-skin sidebar-mini theme-primary">
          <div className="box">
            <div className="box-body">
              <div className="table-responsive">
                <table
                  id="productorder"
                  className="table table-hover no-wrap product-order b-1 border-primary"
                  data-page-size="10"
                >
                  <thead className="bg-primary" style={{ fontSize: '25px' }}>
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
                        ItemPrice={item.price}
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
                    <AddButton onClick={HandleAddOrder} />
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

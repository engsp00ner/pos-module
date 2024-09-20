/* eslint-disable jsx-a11y/no-autofocus */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteItem } from '../../features/orders/orderSlice';
import './InputStyle.css';

interface Props {
  itemId: string;
  ImgUrl?: string;
  ItemPrice: number;
  ItemAmount: number;
  ProductName: string;
  onAmountChange: (newAmount: number) => void; // function to handle amount changes
}

export const TableRaw: React.FC<Props> = ({
  ImgUrl = '/assets/images/product/notfound.png',
  ItemPrice,
  ItemAmount = 0,
  ProductName,
  onAmountChange, // Destructure the callback
  itemId,
}) => {
  const dispatch = useDispatch();
  const [IsEditing, setIsEditing] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(ItemAmount);

  // Sync currentAmount with ItemAmount when ItemAmount prop changes
  useEffect(() => {
    setCurrentAmount(ItemAmount);
  }, [ItemAmount]);

  // Handle the Edit for the amount
  const handleEditClick = () => {
    setIsEditing(!IsEditing);
    // console.log(IsEditing);
  };
  // Handle item deletion
  const handleDeleteClick = () => {
    // Dispatch the delete action to remove the item by its ID
    dispatch(deleteItem(itemId));
  };
  // Handle onBlur event when the user focuses out of the input
  const handleBlur = () => {
    // console.log('Amount changed to:', currentAmount);
    setIsEditing(false); // Close editing mode
    onAmountChange(currentAmount); // update the amount in the parent component
  };
  const total = currentAmount * ItemPrice;
  return (
    <tr style={{ fontSize: '25px' }}>
      <td>{ProductName}</td>
      <td>
        <img src={ImgUrl} alt="product" width="80" />
      </td>
      <td>{ItemPrice} </td>
      <td>
        <Link
          to="#"
          className="text-info mr-10 button"
          title="تعديل الكمية"
          onClick={() => handleEditClick()}
        >
          <i className="ti-marker-alt" />
        </Link>
        {IsEditing ? (
          <input
            className="input"
            placeholder={ItemAmount.toString()}
            value={currentAmount}
            onChange={(e) => setCurrentAmount(Number(e.target.value))}
            onBlur={handleBlur} // Handle focus out event
            onKeyDown={(e) => {
              // set the enter key to the same effect to blure
              if (e.key === 'Enter') {
                handleBlur(); // Trigger blur behavior when Enter is pressed
              }
            }}
            autoFocus // Automatically focus the input when editing />
          />
        ) : (
          <span>{currentAmount}</span>
        )}
      </td>
      <td> {total} </td>
      <td>
        <Link
          to="#"
          className="text-danger"
          title="حذف"
          onClick={() => handleDeleteClick()}
        >
          <i className="ti-trash" />
        </Link>
      </td>
    </tr>
  );
};

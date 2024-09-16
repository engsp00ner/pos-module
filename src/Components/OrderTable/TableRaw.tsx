/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';

interface Props {
  ImgUrl?: string;
  ItemPrice: number;
  ItemAmount: number;
  ProductName: string;
}

export const TableRaw: React.FC<Props> = ({
  ImgUrl = '/assets/images/product/notfound.png',
  ItemPrice,
  ItemAmount = 0,
  ProductName,
}) => {
  const handleEditClick = () => {
    // Prevent default link behavior
    // Add your edit logic here
  };

  const handleDeleteClick = () => {
    // Add your delete logic here
  };

  const total = ItemAmount * ItemPrice;
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
        </Link>{' '}
        {ItemAmount}
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

import { Link } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../features/orders/orderSlice';
import '../../CustomStyle/DropDownMenuStyle.css';
import { RootState } from '../../Store';

interface Props {
  ImgUrl?: string;
  ItemsealPrice: number;
  Itembuyprice: number;
  ProductName: string;
  key: number;
  itemkey: string;
  ProductDescription?: string;
}
export const CardItem: React.FC<Props> = ({
  ImgUrl = '/assets/images/product/notfound.png',
  ItemsealPrice,
  Itembuyprice,
  itemkey,
  key,
  ProductName,
  ProductDescription = '',
}) => {
  const dispatch = useDispatch();
  // Get the order items from the Redux store
  const orderItems = useSelector((state: RootState) => state.order.items);
  const handleOnClick = () => {
    // Check if the item already exists in the cart
    const existingItem = orderItems.find(
      (item) => item.id.toString() === itemkey.toString()
    );

    // If the item exists, increment its amount, otherwise set amount to 1
    const itemAmount = existingItem ? existingItem.ItemAmount + 1 : 1;
    const product = {
      id: itemkey,
      name: ProductName,
      sealprice: ItemsealPrice,
      buyprice: Itembuyprice,
      image: ImgUrl,
      ItemAmount: itemAmount, // Use the updated item amount
    };

    console.log('product:', product);
    // Dispatch the addItem action  with the updated amount
    dispatch(addItem(product));
  };
  return (
    <div className="col-3 col-lg-3 col-xl-3" key={key}>
      <div className="box box-default ">
        <div className="fx-card-item">
          <div className="fx-card-avatar fx-overlay-1">
            <img src={ImgUrl} alt="user" style={{ height: '200px' }} />

            <div
              className="fx-overlay scrl-up"
              style={{ cursor: 'pointer' }}
              onClick={() => handleOnClick()}
            >
              <ul className="fx-info">
                <li>
                  <Link
                    className="btn btn-outline image-popup-vertical-fit"
                    onClick={() => handleOnClick()}
                  >
                    <img src="../buy.svg" alt="not found" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="fx-card-content text-right mb-0">
            <h3 className="product-text">{ProductDescription}</h3>
            <h4 className="box-title mb-0">{ProductName}</h4>
            <h2 className="pro-price text-blue ">{ItemsealPrice}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

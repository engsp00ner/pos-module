/* eslint-disable no-console */
import { Link } from 'react-feather';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/orders/orderSlice';
import '../../CustomStyle/DropDownMenuStyle.css';

interface Props {
  ImgUrl?: string;
  ItemPrice: number;
  ProductName: string;
  itemkey: number;
  ProductDescription?: string;
}
export const CardItem: React.FC<Props> = ({
  ImgUrl = '/assets/images/product/notfound.png',
  ItemPrice,
  itemkey,
  ProductName,
  ProductDescription = '',
}) => {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    const product = {
      id: itemkey,
      name: ProductName,
      price: ItemPrice,
      image: ImgUrl,
    };
    console.log({
      id: itemkey, // Assuming 'itemkey' represents the product's ID
      name: ProductName,
      price: ItemPrice,
      image: ImgUrl,
    });
    // Dispatch the addItem action
    dispatch(addItem(product));
  };
  return (
    <div className="col-3 col-lg-3 col-xl-3" key={itemkey}>
      <div className="box box-default ">
        <div className="fx-card-item">
          <div className="fx-card-avatar fx-overlay-1">
            <img src={ImgUrl} alt="user" style={{ height: '200px' }} />

            <div className="fx-overlay scrl-up">
              <ul className="fx-info">
                <li>
                  <Link
                    className="btn btn-outline image-popup-vertical-fit"
                    onClick={() => handleOnClick()}
                  >
                    <svg
                      height="1em"
                      viewBox="0 0 576 512"
                      fill="rgb(17, 17, 17)"
                      className="cart"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="fx-card-content text-right mb-0">
            <h3 className="product-text">{ProductDescription}</h3>
            <h4 className="box-title mb-0">{ProductName}</h4>
            <h2 className="pro-price text-blue">{ItemPrice}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

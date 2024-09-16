/* eslint-disable no-console */
import { Link, PlusCircle } from 'react-feather';
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
                    <PlusCircle />
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

import { useSelector } from 'react-redux';
import { RootState } from '../../Store'; // Adjust the import path as needed
import { TableRaw } from './TableRaw';

export const OrderTable: React.FC = () => {
  // Get the items from the Redux store
  const orderItems = useSelector((state: RootState) => state.order.items);
  return (
    <div className="col-12 col-lg-12 col-xl-12 hold-transition light-skin sidebar-mini theme-primary">
      <div className="box">
        <div className="box-body">
          <div className="table-responsive">
            <table
              id="productorder"
              className="table table-hover no-wrap product-order b-1 border-primary"
              data-page-size="10"
            >
              <thead className="bg-primary " style={{ fontSize: '25px' }}>
                <tr>
                  <th>أسم المنتج</th>
                  <th>صورة المنتج</th>
                  <th> سعر الوحدة</th>
                  <th>الكمية</th>
                  <th>إجمالي السعر</th>
                  <th> حذف</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => (
                  <TableRaw
                    key={index}
                    ItemAmount={item.ItemAmount}
                    ItemPrice={item.price}
                    ProductName={item.name}
                    ImgUrl={`${item.image}`}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

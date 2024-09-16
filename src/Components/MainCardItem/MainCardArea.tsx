/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderTable } from '../OrderTable/OrderTable';
import { CardItem } from './CardItem';

// Define the interface for Product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
const MainCardArea: React.FC = () => {
  const [Products, SetProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get('http://localhost:5000/products');
      SetProducts(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const BaseImgUrl = '/assets/itemImages/products/';

  return (
    <div className="content">
      <div className="row">
        <div className="row fx-element-overlay">
          {isLoading ? (
            'loading'
          ) : (
            <div className="col-lg-6 col-md-6">
              <div className="row">
                {Products.map((product, key) => (
                  <CardItem
                    key={product.id}
                    itemkey={key}
                    ImgUrl={BaseImgUrl + product.image}
                    ItemPrice={product.price}
                    ProductName={product.name}
                    // Provide a default description if not present
                  />
                ))}
              </div>
            </div>
          )}

          <div className="col-lg-6 col-md-6">
            <OrderTable />
          </div>
        </div>
      </div>
    </div>
  );
}; // <-- Removed the extra closing parenthesis here
export default MainCardArea;

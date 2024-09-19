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
  category: string;
}
const MainCardArea: React.FC = () => {
  const [Products, SetProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('all');
  const [Active, SetActive] = useState('');

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

  // Filter products based on selected category
  const filteredProducts =
    category === 'all'
      ? Products
      : Products.filter((Product) => Product.category === category);
  return (
    <div className="content">
      <div className="box bg-transparent no-shadow b-0">
        <div className="box-body text-center p-0">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-info"
              id="filter-all"
              onClick={() => setCategory('all')}
            >
              جميع المنتجات
            </button>
            <button
              type="button"
              className="btn btn-success"
              id="filter-studio"
              onClick={() => setCategory('snacks')}
            >
              بسكوت وشبسي
            </button>
            <button type="button" className="btn btn-info" id="filter-Drinks">
              مشروبات
            </button>
            <button type="button" className="btn btn-info" id="filter-food">
              مأكولات
            </button>
          </div>
        </div>
      </div>
      {/* Category Selection */}
      <div className="category-filter">
        <button type="button" onClick={() => setCategory('all')}>
          All
        </button>
        <button type="button" onClick={() => setCategory('snacks')}>
          Snacks
        </button>
        <button type="button" onClick={() => setCategory('food')}>
          Food
        </button>
        <button type="button" onClick={() => setCategory('drinks')}>
          Drinks
        </button>
      </div>
      <div className="row">
        <div className="row fx-element-overlay">
          {isLoading ? (
            'loading'
          ) : (
            <div className="col-lg-6 col-md-6">
              <div className="row">
                {filteredProducts.map((product, key) => (
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

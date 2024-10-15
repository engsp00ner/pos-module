/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { OrderTable } from '../../orders/OrderTable/OrderTable';
import { CardItem } from './CardItem';
import OrderCategory from './OrderCategory';
import { RootState } from '../../Store';
import Balance from './Balance';

// Define the interface for Product
interface Product {
  id: number;
  name: string;
  buyprice: number;
  sealprice: number;
  image: string;
  category: {
    type: string;
    displayName: string;
    categoryImage: string;
  };
}
interface Category {
  type: string;
  displayName: string;
  categoryImage: string;
}
const MainCardArea: React.FC = () => {
  const [Products, SetProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const token = localStorage.getItem('token'); // Get token from localStorage
  // Get the selected category from Redux store
  const selectedCategory = useSelector(
    (state: RootState) =>
      state.mainCardCategory.category || {
        category: {
          displayName: 'كل المنتجات ',
          type: 'all',
          categoryImage: '/assets/itemImages/Category/AllProducts',
        },
      }
  );
  // console.log('selectedCategory', selectedCategory);
  const currentBalance = useSelector(
    (state: RootState) => state.order.currentBalance
  );

  // fetch products from api
  const fetchProducts = async () => {
    setIsLoading(true); // Start loading

    try {
      // Fetch products from the backend
      const result = await axios.get('http://localhost:3001/api/products', {
        headers: {
          Authorization: `Bearer ${token}`, // token to Authoriz the header
        },
      });
      // Assuming the response has a structure like { _id: ..., products: [...] }
      const productsArray = result.data;
      // console.log('rawResult', result.data[0]?.products);
      // Update the products state with the fetched data
      SetProducts(productsArray);
      console.log('CurrentBalanceOrderTable:', currentBalance);
    } catch (error) {
      // Log any errors to the console
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    console.log('Date', Date.now());
  }, []); // Empty dependency array ensures this runs once on mount

  const BaseImgUrl = '/assets/itemImages/products/';

  // console.log('products', Products);

  const fetchCategories = async () => {
    setIsLoading(true); // Start loading
    try {
      const result = await axios.get('http://localhost:3001/api/categories');
      setCategories(result.data); // Assuming response contains categories array
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Fetch products and categories on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    console.log('Date', Date.now());
  }, []); // Empty dependency array ensures this runs once on mount
  // get unique categories to implement classification
  // Filter products based on the selected category

  console.log('uniqueCategories', categories);
  // console.log('unique', uniqueCategories);
  // Filter products based on selected category
  const filteredProducts =
    selectedCategory.type === 'all'
      ? Products
      : Products.filter(
          (product) => product.category.type === selectedCategory.type
        );
  // console.log('selected category', selectedCategory);
  return (
    <div className="content">
      {/* Category Selection */}
      <div className="box-body text-cright p-0 row">
        <div className="btn-group col-lg-6 col-md-3">
          <OrderCategory
            key={1500}
            CategorySelected="all"
            ImgUrl="/assets/itemImages/Category/AllProducts.svg"
            Text="كل المنتجات"
          />
          {/* Loop through the unique categories */}
          {categories.map((cat, index) => (
            <OrderCategory
              key={index}
              CategorySelected={cat?.type || 'all'}
              ImgUrl={
                cat?.categoryImage ||
                '/assets/itemImages/Category/AllProducts.svg'
              }
              Text={cat?.displayName || 'كل المنتجات'}
            />
          ))}
        </div>
        <Balance CurrentBalance={currentBalance} openingBalance={200} />
      </div>
      <div className="row">
        <div className="row fx-element-overlay">
          {isLoading ? (
            'loading'
          ) : (
            // Products card Selection
            <div className="col-lg-6 col-md-6">
              <div className="box bg-transparent no-shadow b-0" />
              <div className="row">
                {filteredProducts.map((product, key) => (
                  <CardItem
                    key={product.id}
                    itemkey={key}
                    ImgUrl={BaseImgUrl + product.image}
                    ItemsealPrice={product.sealprice}
                    Itembuyprice={product.buyprice}
                    ProductName={product.name}

                    // Provide a default description if not present
                  />
                ))}
              </div>
            </div>
          )}
          {/* order table section */}
          <div className="col-lg-6 col-md-6">
            <OrderTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCardArea;

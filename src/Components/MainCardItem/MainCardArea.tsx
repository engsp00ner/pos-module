/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { OrderTable } from '../OrderTable/OrderTable';
import { CardItem } from './CardItem';
import OrderCategory from './OrderCategory';
import { RootState } from '../../Store';
import Balance from './Balance';

// Define the interface for Product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: {
    type: string;
    displayName: string;
    CategoryImage: string;
  };
}

const MainCardArea: React.FC = () => {
  const [Products, SetProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Get the selected category from Redux store
  const selectedCategory = useSelector(
    (state: RootState) =>
      state.mainCardCategory.category || {
        category: {
          displayName: 'كل المنتجات ',
          type: 'all',
          CategoryImage: '/assets/itemImages/Category/AllProducts',
        },
      }
  );
  // console.log('selectedCategory', selectedCategory);
  const currentBalance = useSelector(
    (state: RootState) => state.order.currentBalance
  );
  const fetchProducts = async () => {
    setIsLoading(true); // Start loading

    try {
      // Fetch products from the backend
      const result = await axios.get('http://localhost:3001/api/products');

      // Assuming the response has a structure like { _id: ..., products: [...] }
      const productsArray = result.data[0]?.products;
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

  // get unique categories to implement classification
  const uniqueCategories = Array.from(
    new Set(Products.map((product) => product.category?.type))
  )
    .map((type) => {
      const categoryData = Products.find(
        (product) => product.category.type === type
      )?.category;
      return categoryData;
    })
    .filter((cat): cat is Product['category'] => cat !== undefined);

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
          {uniqueCategories.map((cat, index) => (
            <OrderCategory
              key={index}
              CategorySelected={cat?.type || 'all'}
              ImgUrl={
                cat?.CategoryImage ||
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
                    ItemPrice={product.price}
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

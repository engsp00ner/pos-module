/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, message, Select } from 'antd';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// Import the UUID function
const { TextArea } = Input;

interface ProductData {
  id?: string;
  name: string;
  price: string;
  image: string;
  category: {
    type: string;
    displayName: string;
    categoryImage: string;
  };
  productamount: string;
}
interface Props {
  title?: string;
}
const AddProduct: React.FC<Props> = ({ title }) => {
  const [categories, setCategories] = useState<ProductData['category'][]>([]); // Categories state
  const [form] = Form.useForm(); // Ant Design form instance

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Generate a unique ID for the product
  const productId = uuidv4();
  // File upload normalization

  // Handle image upload change

  // Form submit handler
  const handleSubmit = async (values: ProductData) => {
    try {
      if (!values || Object.keys(values).length === 0) {
        console.error('No form data received!');
        return;
      }
      // Find selected category using its 'type'
      const selectedCategory = categories.find(
        (category) => category.type.toString() === values.category.toString() // 'values.category' is a string representing category type
      );

      // Handle the case where no category is found
      if (!selectedCategory) {
        message.error('Category not found');
        return;
      }
      // Log each field to ensure they are correctly bound
      console.log('Name:', values.name);
      console.log('Price:', values.price);
      console.log('Quantity:', values.productamount);

      // Ensure the selected category has all the required properties
      // const { type, displayName, categoryImage } = selectedCategory;
      const newProduct: ProductData = {
        id: productId,
        name: values.name,
        price: values.price.toString(), // Convert price to string
        image: 'notfound.png',
        category: {
          type: selectedCategory.type,
          displayName: selectedCategory.displayName,
          categoryImage: selectedCategory.categoryImage,
        },
        productamount: values.productamount || '0',
      };

      console.log('newProduct:', newProduct); // Log the new product object for debugging

      // Debug: log formData to see what is being sent

      // Send form data to the backend
      const response = await axios.post(
        'http://localhost:3001/api/addproduct',
        newProduct
      );

      // Check response status
      if (response.status === 201) {
        message.success('Product added successfully!');
        form.resetFields(); // Reset form fields
      } else {
        message.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      message.error('Failed to add product');
    }
  };

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          background: 'linear-gradient(to right, #2DFFF5, #FFF878)',
          borderRadius: '10px',
        }}
      >
        <img src="/assets/itemImages/logo1.png" alt="Logo" width="140px" />
      </div>
      <h1>{title}</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
        style={{ maxWidth: 600, paddingTop: '50px' }}
      >
        <Form.Item
          label="اسم المنتج"
          name="name"
          rules={[{ required: true, message: 'برجاء إدخال أسم المنتج!' }]}
        >
          <Input placeholder="المنتج" style={{ width: '350px' }} />
        </Form.Item>
        <Form.Item
          label="نوع المنتاج"
          name="category"
          rules={[{ required: true, message: 'برجاء إختيار فئة المنتج' }]}
        >
          <Select>
            {categories.map((category, index) => (
              <Select.Option key={index} value={category.type}>
                <img
                  src={category.categoryImage}
                  alt="Category"
                  style={{ width: '20px', marginRight: '10px' }}
                />
                {category.displayName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="سعر المنتج"
          name="price"
          rules={[{ required: true, message: 'برجاء تحديد سعر بيع المنتج' }]}
        >
          <InputNumber placeholder="0" style={{ width: '100px' }} />
        </Form.Item>
        <Form.Item
          label="الكمية"
          name="productAmount"
          rules={[{ required: true, message: 'برجاء تحديد كميه المنتج' }]}
        >
          <InputNumber placeholder="0" />
        </Form.Item>
        <Form.Item label="ملاحظات إضافيه" name="notes">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <button
            type="button"
            onClick={() => form.submit()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Submit
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;

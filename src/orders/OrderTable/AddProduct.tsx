import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
  UploadFile,
} from 'antd';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

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
  onProductAdded?: () => void; // Callback to trigger after product is added
}

const AddProduct: React.FC<Props> = ({ title, onProductAdded }) => {
  const [categories, setCategories] = useState<ProductData['category'][]>([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      message.error('Failed to load categories.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (values: ProductData) => {
    const ProductId = uuidv4();

    try {
      const selectedCategory = categories.find(
        (category) => category.type.toString() === values.category.toString()
      );

      if (!selectedCategory) {
        message.error('Category not found');
        return;
      }

      if (fileList.length === 0 || !fileList[0].originFileObj) {
        message.error('Please upload an image first!');
        return;
      }

      const file = fileList[0].originFileObj;

      const formData = new FormData();
      formData.append('id', ProductId);
      formData.append('name', values.name);
      formData.append('price', values.price);

      // Constructing the category object with required fields
      const categoryData = {
        type: selectedCategory.type,
        displayName: selectedCategory.displayName,
        categoryImage: selectedCategory.categoryImage,
      };

      // Appending the category data as a JSON string
      formData.append('category', JSON.stringify(categoryData));
      formData.append('productamount', values.productamount || '0');

      if (file) {
        formData.append('ProductImage', file, file.name);
      }

      const response = await axios.post(
        'http://localhost:3001/api/addproduct',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        // Show success message (using Swal or any other method)
        Swal.fire('Success', 'تم إضافه المنتج بنجــاح!', 'success');
        form.resetFields();
        setFileList([]);

        // Trigger the callback to refresh the product list
        if (onProductAdded) {
          onProductAdded();
        }
      } else {
        message.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error submitting product:', error);
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
          label="نوع المنتج"
          name="category"
          rules={[{ required: true, message: 'برجاء إختيار فئة المنتج' }]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option key={category.type} value={category.type}>
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
          name="productamount"
          rules={[{ required: true, message: 'برجاء تحديد كميه المنتج' }]}
        >
          <InputNumber placeholder="0" />
        </Form.Item>
        <Form.Item label="ملاحظات إضافيه" name="notes">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload
            listType="picture-card"
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            beforeUpload={() => false}
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
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

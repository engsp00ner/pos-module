import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const SelectDate: React.FC = () => (
  <Space direction="vertical" size={12}>
    <RangePicker />
  </Space>
);

export default SelectDate;

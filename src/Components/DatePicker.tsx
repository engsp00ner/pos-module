import React from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';

interface SelectDateProps {
  onDatesChange: (dates: [string, string]) => void;
}

const SelectDate: React.FC<SelectDateProps> = ({ onDatesChange }) => {
  const handleChange = (dates: [Dayjs | null, Dayjs | null]) => {
    if (dates[0] && dates[1]) {
      // Call the parent's onDatesChange with the ISO strings of the selected dates
      onDatesChange([dates[0].toISOString(), dates[1].toISOString()]);
    }
  };

  return <DatePicker.RangePicker onCalendarChange={handleChange} />;
};

export default SelectDate;

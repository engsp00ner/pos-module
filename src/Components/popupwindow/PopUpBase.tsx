import React, { useState } from 'react';
import { Modal } from 'antd';
import { AddButton } from '../../orders/OrderTable/AddButton';

interface Props {
  children: React.ReactNode;
  Title?: string;
}
const PopUpBase: React.FC<Props> = ({ children, Title }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddButton onClick={() => setOpen(true)} title=" إضافة منتج جديد " />

      {/* Conditionally render the overlay when the modal is open */}

      {open && <div className="modal-overlay" />}
      <Modal
        title={Title}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {children}
      </Modal>
    </>
  );
};

export default PopUpBase;

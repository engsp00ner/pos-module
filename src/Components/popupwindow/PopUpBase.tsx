import React, { useState } from 'react';
import { Modal } from 'antd';
import { AddButton } from '../../orders/OrderTable/AddButton';

interface Props {
  children: React.ReactNode;
  title?: string;
}
const PopUpBase: React.FC<Props> = ({ children, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddButton onClick={() => setOpen(true)} />

      {/* Conditionally render the overlay when the modal is open */}

      {open && <div className="modal-overlay" />}
      <Modal
        title={title}
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

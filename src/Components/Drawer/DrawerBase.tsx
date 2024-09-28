import React, { useState } from 'react';
import { Drawer, Space } from 'antd';
import type { DrawerProps } from 'antd';
import EditButton from '../EditButton';

interface Props {
  children?: React.ReactNode;
}
const App: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();

  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <EditButton HandleClicked={showLargeDrawer} />
      </Space>
      <Drawer placement="right" size={size} onClose={onClose} open={open}>
        {children}
      </Drawer>
    </>
  );
};

export default App;

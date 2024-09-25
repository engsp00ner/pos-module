import React from 'react';
interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
declare const PopupComponent: React.FC<Props>;
export default PopupComponent;

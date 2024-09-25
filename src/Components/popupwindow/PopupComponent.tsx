// PopupComponent.tsx
import React, { useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopupComponent: React.FC<Props> = ({ isOpen, onClose, children }) => {
  const popupRef = useRef<HTMLDivElement>(null); // To detect click outside the modal

  // Close the pop-up when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={`popup-overlay ${isOpen ? 'show' : 'hide'}`}>
      <div id="popup-content" className="popup-content">
        <button type="button" onClick={onClose} className="close-btn">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupComponent;

import React from 'react';
import MainCardArea from './MainCardItem/MainCardArea';

export const MainLayOut: React.FC = () => {
  return (
    <div className="content-wrapper" style={{ minHeight: '394PX' }}>
      <div className="container-full">
        <MainCardArea />
      </div>
    </div>
  );
};

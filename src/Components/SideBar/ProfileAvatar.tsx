import React from 'react';

interface Props {
  Img: string;
}
export const ProfileAvatar: React.FC<Props> = ({ Img }) => {
  return (
    <div className="d-flex align-items-center">
      <div className="image">
        <img src={Img} className="avatar avatar-lg" alt="User profile" />
      </div>
    </div>
  );
};

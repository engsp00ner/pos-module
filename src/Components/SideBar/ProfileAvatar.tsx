import React from 'react';
import { DropDownList } from './DropDownList';

interface Props {
  Img: string;
  UserName: string;
}
export const ProfileAvatar: React.FC<Props> = ({ Img, UserName }) => {
  return (
    <div className="d-flex align-items-center">
      <div className="image">
        <img src={Img} className="avatar avatar-lg" alt="User profile" />
      </div>
      <DropDownList UserName={UserName} />
    </div>
  );
};

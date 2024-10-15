import React from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import InLineList from './InLineList';

export const UserProfile: React.FC = () => {
  const BaseImg = './assets/images/avatar/';
  return (
    <div className="user-profile px-20 py-5 pt-5">
      <ProfileAvatar Img={`${BaseImg}1.jpg`} />
      <InLineList />
    </div>
  );
};

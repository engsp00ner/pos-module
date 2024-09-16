import { AlertOctagon, AlertTriangle, User, Users } from 'react-feather';
import { NotificationMenueitem } from './NotificationMenueItem';

export const NotificationMenue: React.FC = () => {
  return (
    <ul className="menu sm-scrol">
      <NotificationMenueitem Link="#" Text="This is test" TextStyle="text-info">
        <User />
      </NotificationMenueitem>

      <NotificationMenueitem
        Link="#"
        Text="This is test2"
        TextStyle="text-info"
      >
        <Users />
      </NotificationMenueitem>

      <NotificationMenueitem
        Link="#"
        Text="This is test3"
        TextStyle="text-warning"
      >
        <AlertTriangle />
      </NotificationMenueitem>

      <NotificationMenueitem
        Link="#"
        Text="This is test4"
        TextStyle="text-danger"
      >
        <AlertOctagon />
      </NotificationMenueitem>
    </ul>
  );
};

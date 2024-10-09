import { useState } from 'react';
import '../CustomStyle/LoginFormStyles.css';

const LogIn: React.FC = () => {
  const [isloading, SetIsloading] = useState('false');
  return (
    <div className="login-background">
      <div className="d-flex justify-content-center align-items-center">
        <div className="container-login">
          <div className="heading-login"> منظومه تسجيل المبيعات </div>
          <form action="" className="form-login">
            <input
              required
              className="input"
              type="text"
              name="email"
              id="email"
              placeholder="أسم المستخدم"
            />
            <input
              required
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="كلمة المرور"
            />

            <input
              className="login-button"
              type="submit"
              value="تسجيل الدخول "
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default LogIn;

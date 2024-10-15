import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/Auth/authSlice';
import { RootState, AppDispatch } from '../Store';
import '../CustomStyle/LoginFormStyles.css';
import '../CustomStyle/Loading.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Initialize useNavigate hook

  // mTCH THE LOGIN DATA WITH THE DATA BASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ name: username, password }));
    console.log(status);
  };
  // Redirect to homepage after successful login
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/'); // Redirect to homepage
    }
  }, [status, navigate]);

  return (
    <div className="login-background">
      <div className="container-login">
        <div className="heading-login">تسجيل الدخول</div>
        <form onSubmit={handleSubmit} className="form-login">
          <label htmlFor="username">
            أسم المستخدم
            <input
              required
              className="input"
              type="text"
              id="username"
              value={username}
              placeholder="أسم المستخدم"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            كلمه المرور
            <input
              required
              className="input"
              type="password"
              id="password"
              placeholder="كلمة المرور"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="login-button"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <div>
                {'جاري تسجيل الدخول '}
                <div className="loader">
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                </div>
              </div>
            ) : (
              'تسجيل الدخول'
            )}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
        <span className="agreement">
          <a href="#">تواصل معنـا</a>
        </span>
      </div>
    </div>
  );
};

export default Login;

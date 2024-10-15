import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/Auth/authSlice';
import { RootState, AppDispatch } from '../Store';

const Login: React.FC = () => {
  const [username, setUsername] = useState(''); // Using 'username' for clarity
  const [password, setPassword] = useState('');

  // Accessing auth state from Redux store
  const { status, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    await dispatch(login({ name: username, password })); // Dispatch the login action with correct fields
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="username"
          value={username} // Bind to username state
          placeholder="أسم المستخدم" // Username placeholder
          onChange={(e) => setUsername(e.target.value)} // Update username state
          required // Ensure this field is filled
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          value={password} // Bind to password state
          placeholder="كلمة المرور" // Password placeholder
          onChange={(e) => setPassword(e.target.value)} // Update password state
          required // Ensure this field is filled
        />
      </div>
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Logging in...' : 'Login'}
      </button>
      {error && <div className="error">{error}</div>}{' '}
      {/* Display error message */}
    </form>
  );
};

export default Login;

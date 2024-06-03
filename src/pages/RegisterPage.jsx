import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../contexts/ServiceContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(ServiceContext);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault(); // 阻止表单默认提交行为
    try
    {
      const RegisterIn = await user.addUser(username, password); // 调用注册服务
      if (RegisterIn)
      {
        navigate('/login');
      } else
      {
        alert('注册失败，用户名重复');
      }
    } catch (error)
    {
      alert('注册过程中出现错误，请稍后重试。');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../contexts/ServiceContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(ServiceContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 防止表单默认提交行为
    try
    {
      const loggedIn = await user.validateLogin(username, password); // 调用登录服务
      if (loggedIn)
      {
        navigate('/home'); // 登录成功后重定向到仪表板
      } else
      {
        alert('登录失败，请检查您的用户名和密码是否正确！');
      }
    } catch (error)
    {
      alert('登录过程中出现错误，请稍后重试。');
      console.error('Login error:', error);
    }
  };

  const handleGoToRegister = () => {
    navigate('/register'); // 在这里使用 navigate 函数进行页面跳转
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">用户名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">密码:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登录</button>
      </form>
      <button onClick={handleGoToRegister} style={{ marginTop: '10px' }}>
        注册新账号
      </button>
    </div>
  );
};

export default LoginPage;

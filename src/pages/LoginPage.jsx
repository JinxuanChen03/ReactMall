import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { ServiceContext } from '../contexts/ServiceContext';

const { Title } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(ServiceContext);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const { username, password } = values;
      const loggedIn = await user.validateLogin(username, password); // 调用登录服务
      if (loggedIn) {
        navigate('/home'); // 登录成功后重定向到主页
      } else {
        message.error('登录失败，请检查您的用户名和密码是否正确！');
      }
    } catch (error) {
      message.error('登录过程中出现错误，请稍后重试。');
      console.error('Login error:', error);
    }
  };

  const handleGoToRegister = () => {
    navigate('/register'); // 在这里使用 navigate 函数进行页面跳转
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <Card style={styles.card}>
        <Title level={3} style={styles.title}>欢迎登录商城</Title>
        <Form
          name="login"
          onFinish={handleLogin}
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
        <Button type="link" onClick={handleGoToRegister} block>
          注册新账号
        </Button>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    position: 'relative',
    overflow: 'hidden'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/path/to/your/background.jpg")', // 替换为你的背景图片路径
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    zIndex: -1,
    filter: 'blur(8px)'
  },
  card: {
    width: 400,
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    zIndex: 1
  },
  title: {
    textAlign: 'center',
    color: '#1890ff'
  }
};

export default LoginPage;

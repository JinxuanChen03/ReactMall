import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { ServiceContext } from '../contexts/ServiceContext';

const { Title } = Typography;

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(ServiceContext);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const { username, password, email } = values;
      const registerIn = await user.addUser(username, password, email); // 调用注册服务
      if (registerIn) {
        message.success('注册成功');
        navigate('/login');
      } else {
        message.error('注册失败，用户名重复');
      }
    } catch (error) {
      message.error('注册过程中出现错误，请稍后重试。');
      console.error('Register error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <Card style={styles.card}>
        <Title level={3} style={styles.title}>注册新账号</Title>
        <Form
          name="register"
          onFinish={handleRegister}
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
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input 
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              注册
            </Button>
          </Form.Item>
        </Form>
        <Button type="link" onClick={() => navigate('/login')} block>
          已有账号？点击登录
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
    // backgroundImage: 'url("/path/to/your/background.png")', // 替换为你的背景图片路径
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

export default RegisterPage;

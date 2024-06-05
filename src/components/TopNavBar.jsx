import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Typography } from 'antd';

const { Text } = Typography;

const TopNavBar = ({ onBack, title }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/home');
  };

  return (
    <div style={{ position: 'fixed', top: 0, width: '480px', backgroundColor: '#fff', padding: '10px 20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000 }}>
      <Button onClick={onBack}>返回</Button>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <Text>{title}</Text>
      </div>
      <Button onClick={goBack}>首页</Button>
    </div>
  );
};

export default TopNavBar;

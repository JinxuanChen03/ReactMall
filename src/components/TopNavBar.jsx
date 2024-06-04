import React from 'react';
import { Button } from 'antd';

const TopNavBar = ({ onBack }) => {
  return (
    <div style={{ position: 'fixed', top: 0, width: '480px', backgroundColor: '#fff', padding: '10px 20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', zIndex: 1000 }}>
      <Button onClick={onBack}>返回</Button>
    </div>
  );
};

export default TopNavBar;

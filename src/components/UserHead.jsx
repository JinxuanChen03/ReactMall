import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const App = () => (
    // position: 'relative', top: '40px', left: '40px'
    <Space wrap size={16} style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar size={64} icon={<UserOutlined />} />
        <div style={{ marginLeft: '10px', fontSize: '20px'}}>用户名</div>
    </Space>
);

export default App;
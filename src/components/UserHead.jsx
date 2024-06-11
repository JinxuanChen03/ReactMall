import React, {useEffect, useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import {Avatar, message, Space} from 'antd';
import service from '../services/userService';

const App = () => {
    const [username, setUsername] = useState(''); // 创建一个状态变量来存储用户名

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await service.getCurrentUser(); // 获取当前用户
                console.log('当前用户:', currentUser); // 添加日志检查当前用户
                if (currentUser) {
                   setUsername(currentUser.username); // 设置用户名
                }
            } catch (error) {
                console.error('获取用户数据时出错:', error);
            }
        };
        fetchUserData();
    }, [service]);

    return (
        <Space wrap size={16} style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar size={64} icon={<UserOutlined />} />
            <div style={{ marginLeft: '10px', fontSize: '20px'}}>{username}</div>
        </Space>
    );

}

export default App;
import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        key: '1',
        label: '箱包服饰',
    },
    {
        type: 'divider',
    },
    {
        key: '2',
        label: '数码电子',
    },
    {
        type: 'divider',
    },
    {
        key: '3',
        label: '零食小吃',
    }
];
const CategoryMenu = ({ onSelect }) => {
    const onClick = (e) => {
        console.log('click ', e);
        onSelect(e.key);
    };
    return (
        <Menu
            onClick={onClick}
            style={{
                width: '30%',
                height: '100%',
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1']}
            mode="inline"
            items={items}
            className="menu-centered" // 使用新的CSS类
        />
    );
};
export default CategoryMenu;
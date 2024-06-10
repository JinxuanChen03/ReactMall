import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import CategoryItem from "./CategoryItem";
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
        label: '家居用品',
    },
    {
        type: 'divider',
    },
    {
        key: '3',
        label: '数码电子',
    },
    {
        type: 'divider',
    },
    {
        key: '4',
        label: '箱包服饰',
    },
    {
        type: 'divider',
    },
    {
        key: '5',
        label: '家居用品',
    },
    {
        type: 'divider',
    },
    {
        key: '6',
        label: '数码电子',
    },
    {
        type: 'divider',
    },
    {
        key: '7',
        label: '箱包服饰',
    },
    {
        type: 'divider',
    },
    {
        key: '8',
        label: '家居用品',
    },
    {
        type: 'divider',
    },
    {
        key: '9',
        label: '数码电子',
    },
    {
        type: 'divider',
    },
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
                width: 140,
                height: '100%',
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            className="menu-centered" // 使用新的CSS类
        />
    );
};
export default CategoryMenu;
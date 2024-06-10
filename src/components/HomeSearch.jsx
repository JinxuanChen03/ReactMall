import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const App = () => (
    <Space direction="vertical">
        <Search
            placeholder="请输入商品名称"
            allowClear
            onSearch={onSearch}
            size={"large"}
            style={{
                width: 480,
            }}
        />
    </Space>
);
export default App;
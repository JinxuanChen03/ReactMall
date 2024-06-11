import React, {useEffect, useState} from 'react';
import { AudioOutlined } from '@ant-design/icons';
import {Input, message, Space} from 'antd';
import service from "../services/goodService";
import {useNavigate} from "react-router-dom";

const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);

const HomeSearch = () => {
    const [searchText, setSearchText] = useState(''); // 添加一个新的state字段来存储搜索栏的值
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
        console.log('Search text:', searchText); // 打印搜索栏的值
        navigate('/search', { state: { searchText: value }, key: Date.now() }); // 跳转到搜索页面
    };

    const handleChange = (e) => {
        setSearchText(e.target.value); // 更新搜索栏的值
    };

    useEffect(() => {
        const fetchGoodsByLikeSearch = async () => {
            setLoading(true);
            try {
                const goodsData = await service.getGoodsByName(searchText); // 获取某一类别的商品
                console.log('获取的商品数据:', goodsData);
                setGoods(goodsData);
            } catch (error) {
                console.error('获取商品数据时出错:', error);
                message.error('加载商品数据时出错');
            } finally {
                setLoading(false);
            }
        };
        fetchGoodsByLikeSearch();
    }, []);

    return (
        <Space direction="vertical">
            <Search
                placeholder="请输入商品名称"
                allowClear
                onSearch={onSearch}
                onChange={handleChange} // 添加一个onChange事件处理函数
                size={"large"}
                style={{
                    width: 480,
                }}
            />
        </Space>
    );
};

export default HomeSearch;
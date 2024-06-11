import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, List, Card } from 'antd';
// import { fetchGoods } from './api';
// import './App.css';
import { fetchClassifyProductDetails } from '../services/ClassifyService';

const { Meta } = Card;

const CategoryDetail = () => {
    const { id } = useParams();
    const [goods, setGoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClassifyProductDetails(id).then(response => setGoods(response.data));
    }, [id]);

    const handleBackClick = () => {
        navigate('/category');
    };

    const handleProductClick = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <div className="category-detail-page">
            <div className="category-header">
                <Button onClick={handleBackClick}>返回</Button>
            </div>
            <div className="category-content">
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={goods}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            extra={<img width={272} alt="logo" src={require(`../static/temp/${item.image}`)} />}
                            onClick={() => handleProductClick(item.id)}
                        >
                            <List.Item.Meta
                                title={<a href={`/detail/${id}`}>{item.name}</a>}
                                description={`品牌: ${item.brand}`}
                            />
                            <div>价格: ¥{item.price}</div>
                            <div>库存: {item.stock}</div>
                            <div>销量：{item.sales}</div>
                            {item.stockDetails && item.stockDetails.length > 0 && (
                                <>
                                    <div>颜色: {item.stockDetails[0].color}</div>
                                    <div>尺寸: {item.stockDetails[0].size}</div>
                                </>
                            )}
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default CategoryDetail;

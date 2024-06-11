import React, {useState, useEffect, useContext} from 'react';
import CategoryMenu from '../components/CategoryMenu';
import BottomNav from '../components/BottomNav';
import {Breadcrumb, Card, Layout, Menu, message, theme} from 'antd';
import service from '../services/CategoryService';
import {AccountBookOutlined, CarOutlined, FileDoneOutlined, MoneyCollectOutlined} from "@ant-design/icons";

const gridStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const CategoryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSelectCategory = (key) => {
        console.log('Selected category:', key);
        setSelectedCategory(key);
    };

    //钩子函数
    useEffect(() => {
        const fetchGoodsByClassify = async () => {
            if (!selectedCategory) return;
            setLoading(true);
            try {
                const goodsData = await service.good.getGoodsByClassify(selectedCategory); // 获取某一类别的商品
                console.log('获取的商品数据:', goodsData);
                setGoods(goodsData);
            } catch (error) {
                console.error('获取商品数据时出错:', error);
                message.error('加载商品数据时出错');
            } finally {
                setLoading(false);
            }
        };
        fetchGoodsByClassify();
    }, [selectedCategory]);

    return (
        <div className="scrollable-content" style={{ display: 'flex', flexDirection: 'row' }}>
            <CategoryMenu onSelect={handleSelectCategory} style={{ flex: 1 }} />
            <div style={{ flex: 2 }}>
                {loading ? (
                    <p>加载中...</p>
                ) : (
                    <Card>
                        {goods.map((item) => (
                            <Card.Grid style={gridStyle} key={item.id}>
                                <p>名称: {item.name}</p>
                                <p>品牌: {item.brand}</p>
                                <p>价格: {item.price}</p>
                                <p>库存: {item.stock}</p>
                            </Card.Grid>
                        ))}
                    </Card>
                )}
            </div>
            <BottomNav style={{ flex: 0.2 }} />
        </div>
    );
};

export default CategoryPage;
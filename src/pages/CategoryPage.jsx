import React, {useState, useEffect, useContext} from 'react';
import CategoryMenu from '../components/CategoryMenu';
import BottomNav from '../components/BottomNav';
import {Breadcrumb, Layout, Menu, message, theme} from 'antd';
import service from '../services/CategoryService';

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
        <>
        <div className="scrollable-content">
            <CategoryMenu onSelect={handleSelectCategory} />
            <div>
                {loading ? (
                    <p>加载中...</p>
                ) : (
                    <>
                        {selectedCategory && <h2>分类为: {selectedCategory} 的商品</h2>}
                        <ul>
                            {goods.map((item) => (
                                <li key={item.id}>
                                    {/*<img src=require{`../static/temp/${item.image}`} alt={item.name} />*/}
                                    <p>名称: {item.name}</p>
                                    <p>品牌: {item.brand}</p>
                                    <p>价格: {item.price}</p>
                                    <p>库存: {item.stock}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            {/*<CategoryItem/>*/}
            <BottomNav />
        </div>
        </>
    );
};

export default CategoryPage;
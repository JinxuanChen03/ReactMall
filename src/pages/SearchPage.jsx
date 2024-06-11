import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import useLoginCheck from '../hook/LoginCheck';
import BottomNav from '../components/BottomNav';
import HomeSearch from "../components/HomeSearch";
import service from "../services/goodService";
import {Card} from "antd";
import TopNavBar from "../components/TopNavBar";

const gridStyle = {
    width: '50%',
    height: 300,
    textAlign: 'center',
};

const SearchPage = () => {
    useLoginCheck(); // 钩子调用

    const location = useLocation(); // 获取 location 对象
    const searchText = location.state?.searchText; // 从 location.state 中获取搜索文本
    const navigate = useNavigate();
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const goToDetails = (id) => {
        navigate(`/detail/${id}`);
    }

    useEffect(() => {
        const fetchGoodsListSearch = async () => {
            setLoading(true);
            try {
                const goodsData = await service.getGoodsByName(searchText);
                console.log('获取的商品数据:', goodsData);
                setGoods(goodsData);
            } catch (error) {
                console.error('获取商品数据时出错:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGoodsListSearch();
    }, []);

    return (
        <div className="scrollable-content" style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
                <HomeSearch/>
            </div>
            <div>
                {loading ? (
                    <p>加载中...</p>
                ) : (
                    <Card>
                        {goods.map((item) => (
                            <Card.Grid style={gridStyle} key={item.id} onClick={() => goToDetails(item.id)}>
                                {/*<img src={require(`../static/temp/${item.img[0]}`)}/>*/}
                                <p>{item.name}</p>
                                <p>￥{item.price}</p>
                            </Card.Grid>
                        ))}
                    </Card>
                )}
            </div>
            <BottomNav/>
        </div>
    );
}
export default SearchPage;
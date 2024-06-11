import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import useLoginCheck from '../hook/LoginCheck';
import CategoryPage from './CategoryPage';
import CartListPage from './CartListPage';
import UserPage from './UserPage';
import BottomNav from '../components/BottomNav';
import HomeSearch from "../components/HomeSearch";
import HomeCarousel from "../components/HomeCarousel";
import HomeMiddleCard from "../components/HomeMiddleCard";
import {Card} from "antd";
import service from "../services/goodService";

const gridStyle = {
    width: '50%',
    height: 300,
    textAlign: 'center',
};

const HomePage = () => {
    useLoginCheck(); // 钩子调用

    const navigate = useNavigate();
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const goToDetails = (id) => {
        navigate(`/detail/${id}`);
    }

    useEffect(() => {
        const fetchGoodsList = async () => {
            setLoading(true);
            try {
                const goodsData = await service.getGoodList();
                console.log('获取的商品数据:', goodsData);
                setGoods(goodsData);
            } catch (error) {
                console.error('获取商品数据时出错:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGoodsList();
    }, []);

    return (
        <div className="scrollable-content">
            <HomeSearch/>
            <HomeCarousel/>
            <Routes>
                {/*<Route path="/home" element={<HomePage />} />*/}
                <Route path="/category" element={<CategoryPage/>}/>
                <Route path="/cartList" element={<CartListPage/>}/>
                <Route path="/user" element={<UserPage/>}/>
            </Routes>
            <HomeMiddleCard/>
            <div>
                {loading ? (
                    <p>加载中...</p>
                ) : (
                    <Card>
                        {goods.map((item) => (
                            <Card.Grid style={gridStyle} key={item.id} onClick={() => goToDetails(item.id)}>
                                <img src={require(`../static/temp/${item.img[0]}`)} />
                                <p>{item.brand} {item.name}</p>
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
// return <>
//     <h1>Home Page</h1>
//     <Link to="/detail/1">商品1</Link>
//     <Link to="/detail/2">商品2</Link>
//     <Link to="/detail/3">商品3</Link>
//     <Link to="/detail/4">商品3</Link>
//     <Link to="/detail/5">商品3</Link>
//     <Link to="/detail/6">商品3</Link>
//     <Link to="/detail/7">商品3</Link>
//     <Link to="/detail/8">商品3</Link>
//     <Link to="/detail/9">商品3</Link>
//     <Link to="/detail/10">商品3</Link>
//     <Link to="/detail/11">商品3</Link>
//     <Link to="/detail/12">商品3</Link>
//     <Link to="/detail/13">商品3</Link>
//     <Link to="/detail/14">商品3</Link>
//     <Link to="/detail/15">商品3</Link>
//     <Link to="/orderList">订单</Link>
//     <Link to="/cartList">购物车</Link>
//     <p></p>
// </>

export default HomePage;
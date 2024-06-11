import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import useLoginCheck from '../hook/LoginCheck';

import CategoryPage from './CategoryPage';
import CartListPage from './CartListPage';
import UserPage from './UserPage';
import BottomNav from '../components/BottomNav';
import HomeSearch from "../components/HomeSearch";
import HomeCarousel from "../components/HomeCarousel";
import HomeItemCard from "../components/HomeItemCard";
import HomeMiddleCard from "../components/HomeMiddleCard";

const HomePage = () => {
    useLoginCheck(); // 钩子调用

    return (
        <div  className="scrollable-content">
            <HomeSearch />
            <HomeCarousel />
            <Routes>
                {/*<Route path="/home" element={<HomePage />} />*/}
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/cartList" element={<CartListPage />} />
                <Route path="/user" element={<UserPage />} />
            </Routes>
            <HomeMiddleCard />
            <HomeItemCard />
            <BottomNav />
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
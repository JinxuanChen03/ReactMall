import React from 'react';
import { NavLink } from 'react-router-dom';
import {AppstoreOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import '../App.css'; // 引入样式文件

const BottomNav = () => {
    return (
        <div className="bottom-nav">
            <NavLink to="/home">
                <HomeOutlined />
                首页
            </NavLink>
            <NavLink to="/category">
                <AppstoreOutlined />
                分类
            </NavLink>
            <NavLink to="/cartList">
                <ShoppingCartOutlined />
                购物车
            </NavLink>
            <NavLink to="/user">
                <UserOutlined />
                我的
            </NavLink>
        </div>
    );

    // return <>
    //   <h1>Home Page</h1>
    //   <Link to="/detail/1">商品1</Link>
    //   <Link to="/detail/2">商品2</Link>
    //   <Link to="/detail/3">商品3</Link>
    //   <Link to="/detail/4">商品3</Link>
    //   <Link to="/detail/5">商品3</Link>
    //   <Link to="/detail/6">商品3</Link>
    //   <Link to="/detail/7">商品3</Link>
    //   <Link to="/detail/8">商品3</Link>
    //   <Link to="/detail/9">商品3</Link>
    //   <Link to="/detail/10">商品3</Link>
    //   <Link to="/detail/11">商品3</Link>
    //   <Link to="/detail/12">商品3</Link>
    //   <Link to="/detail/13">商品3</Link>
    //   <Link to="/detail/14">商品3</Link>
    //   <Link to="/detail/15">商品3</Link>
    //   <Link to="/orderList">订单</Link>
    //   <Link to="/cartList">购物车</Link>
    //   <p></p>
    // </>
}

export default BottomNav;
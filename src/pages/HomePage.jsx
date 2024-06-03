import React from 'react';
import { Link } from 'react-router-dom';
import useLoginCheck from '../hook/LoginCheck';
const HomePage = () => {
  useLoginCheck(); // 钩子调用

  return <>
    <h1>Home Page</h1>
    <Link to="/detail/1">商品1</Link>
    <Link to="/detail/2">商品2</Link>
    <Link to="/detail/3">商品3</Link>
    <p></p>
  </>
}

export default HomePage;
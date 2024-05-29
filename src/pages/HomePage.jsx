import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return <>
    <h1>Home Page</h1>
    <Link to="/detail/1">商品1</Link>
    <p></p>
  </>
}

export default HomePage;
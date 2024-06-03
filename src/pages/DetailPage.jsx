import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import useLoginCheck from '../hook/LoginCheck';
import { ServiceContext } from '../contexts/ServiceContext';
const DetailPage = () => {
  useLoginCheck(); // 钩子调用
  const { goodId } = useParams();
  const parsedGoodId = parseInt(goodId, 10);
  const services = useContext(ServiceContext);
  const navigate = useNavigate();

  const userId = services.user.getCurrentUser().id;
  const good = services.good.getGoodById(parsedGoodId);

  const onBuyClick = () => {
    navigate(`/createOrder/${goodId}`);
  }

  const onCastClick = () => {
    services.cart.addToCart(userId, good, 1)
  }


  if (!good)
  {
    //TBD 跳转主页
    navigate('/home');
  }

  return <>
    <h1>Detail Page</h1>
    <p> goodId: {good && goodId}</p>
    <p> goodName: {good && good.name}</p>
    <p> goodPrice: {good && good.price}</p>
    <p> goodCategoryId: {good && good.categoryId}</p>
    <img src={good && good.img} alt={good && good.name} />
    <button onClick={onBuyClick}>购买</button>
    <button onClick={onCastClick}>加入购物车</button>
  </>
}

export default DetailPage;
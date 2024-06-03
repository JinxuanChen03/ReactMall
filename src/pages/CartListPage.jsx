import React, { useContext, useState, useEffect } from 'react';
import { ServiceContext } from '../contexts/ServiceContext';
import useLoginCheck from '../hook/LoginCheck';
//要有改查删支付查看商品详情
const CartListPage = () => {
  useLoginCheck();
  const [carts, setCarts] = useState([]);
  const service = useContext(ServiceContext);
  useEffect(() => {
    const currentUser = service.user.getCurrentUser(); // 获取当前用户信息
    setCarts(service.cart.getCartByUserId(currentUser.id));
  }, []);


  return (
    <div>
      <h2>User Carts</h2>
      <ul>
        {carts.map(carts => (
          <li key={carts.id}>
            Carts #{carts.id} - good: {carts.goodId === 1 ? 'Paid' : 'Unpaid'} - quantity: {carts.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartListPage;
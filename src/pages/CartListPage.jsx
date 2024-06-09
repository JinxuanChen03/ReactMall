import 'antd/dist/reset.css'; // 导入 Ant Design 样式
import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, Divider, InputNumber, List, message, Typography, Checkbox } from 'antd';
import { ServiceContext } from '../contexts/ServiceContext';
import useLoginCheck from '../hook/LoginCheck';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const CartListPage = () => {
  useLoginCheck(); // 钩子调用
  const [carts, setCarts] = useState([]);
  const service = useContext(ServiceContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try
      {
        const currentUser = await service.user.getCurrentUser(); // 获取当前用户
        console.log('当前用户:', currentUser); // 添加日志检查当前用户

        if (currentUser)
        {
          const userCarts = await service.cart.getCartByUserId(currentUser.id); // 获取用户的购物车数据
          console.log('用户购物车数据:', userCarts); // 添加日志检查用户购物车数据

          // 使用 Promise.all 并行获取所有商品数据
          const cartsWithDetails = await Promise.all(userCarts.map(async (cart) => {
            try
            {
              const good = await service.good.getGoodById(cart.goodId); // 获取商品数据
              console.log('商品数据:', good); // 添加日志检查商品数据

              if (good)
              {
                const type = good.types.find(type => type.typeid === cart.type);
                if (type)
                {
                  return {
                    ...cart,
                    name: good.name,
                    price: type.typePrice,
                    image: require(`../static/temp/${good.img[0]}`), // 假设商品图片数组的第一个为主图
                    checked: true,
                  };
                } else
                {
                  console.error(`商品ID为${cart.goodId}的类型${cart.type}未找到`);
                  return null;
                }
              } else
              {
                console.error(`商品ID为${cart.goodId}的商品未找到`);
                return null;
              }
            } catch (error)
            {
              console.error('获取商品数据时出错:', error);
              return null;
            }
          }));

          setCarts(cartsWithDetails.filter(cart => cart !== null)); // 过滤掉未找到商品的购物车项
        }
      } catch (error)
      {
        console.error('获取购物车数据时出错:', error);
        message.error('加载购物车数据时出错');
      }
    };

    fetchCartData();
  }, [service]);

  const handleQuantityChange = async (id, quantity) => {
    const currentUser = await service.user.getCurrentUser();
    if (currentUser)
    {
      const updatedCarts = carts.map(cart => {
        if (cart.id === id)
        {
          service.cart.updateQuantity(currentUser.id, cart.goodId, quantity);
          return { ...cart, quantity };
        }
        return cart;
      });
      setCarts(updatedCarts);
    }
  };

  const handleRemove = async (id) => {
    const currentUser = await service.user.getCurrentUser();
    if (currentUser)
    {
      const cartItem = carts.find(cart => cart.id === id);
      if (cartItem)
      {
        await service.cart.removeFromCart(currentUser.id, cartItem.goodId);
        setCarts(carts.filter(cart => cart.id !== id));
      }
      message.success('商品已从购物车移除');
    }
  };

  const handleCheck = (id) => {
    const updatedCarts = carts.map(cart => cart.id === id ? { ...cart, checked: !cart.checked } : cart);
    setCarts(updatedCarts);
  };

  const handleCheckAll = () => {
    const newChecked = !carts.every(cart => cart.checked);
    const updatedCarts = carts.map(cart => ({ ...cart, checked: newChecked }));
    setCarts(updatedCarts);
  };

  const getTotalPrice = () => {
    return carts.reduce((total, cart) => cart.checked ? total + cart.price * cart.quantity : total, 0);
  };

  const goBack = () => {
    navigate(-1);// TBD 跳转到之前的页面
  };

  const proceedToCheckout = () => {
    const selectedCarts = carts.filter(cart => cart.checked);
    if (selectedCarts.length === 0)
    {
      message.warning('请选择至少一个商品进行结算');
      return;
    }
    // 假设我们将所选商品的ID、类型和数量传递给订单页面
    selectedCarts.forEach(cart => {
      navigate(`/createOrder/${cart.goodId}/${cart.type}/${cart.quantity}`);
    });
  };

  return (
    <>
      <TopNavBar onBack={goBack} title="购物车" />
      <div style={{ backgroundColor: '#f5f5f5', height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '1 1 auto', padding: '20px' }}>
          <Card style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}>
            <Title level={2}>购物车</Title>
            {carts.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={carts}
                renderItem={cart => (
                  <List.Item
                    actions={[
                      <InputNumber
                        min={1}
                        value={cart.quantity}
                        onChange={(value) => handleQuantityChange(cart.id, value)}
                        style={{ width: 60, marginRight: 16 }}
                      />,
                      <Button type="link" onClick={() => handleRemove(cart.id)}>删除</Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<img src={cart.image} alt={cart.name} style={{ width: '50px' }} />}
                      title={<span style={{ display: 'inline-block', maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cart.name}</span>}
                      description={`¥${cart.price}`}
                    />
                    <Checkbox checked={cart.checked} onChange={() => handleCheck(cart.id)} />
                  </List.Item>
                )}
              />
            ) : (
              <Text>购物车为空</Text>
            )}
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '10px 20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Checkbox onChange={handleCheckAll} checked={carts.every(cart => cart.checked)}>全选</Checkbox>
              <Text>总价: ¥{getTotalPrice()}</Text>
              <Button type="primary" onClick={proceedToCheckout}>去结算</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CartListPage;

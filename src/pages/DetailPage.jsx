import 'antd/dist/reset.css'; // 导入 Ant Design 样式
import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useLoginCheck from '../hook/LoginCheck';
import { Card, Button, Typography, Divider, Space, Image, Select, InputNumber } from 'antd';
import { ServiceContext } from '../contexts/ServiceContext';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
const { Option } = Select;
const { Title, Text } = Typography;
const DetailPage = () => {
  useLoginCheck(); // 钩子调用
  const { goodId } = useParams();
  const parsedGoodId = parseInt(goodId, 10);
  const services = useContext(ServiceContext);
  const navigate = useNavigate();

  const userId = services.user.getCurrentUser()?.id;
  const good = services.good.getGoodById(parsedGoodId);
  const [selectedType, setSelectedType] = useState(good.types[0].typeid);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleTypeChange = (value) => {
    setSelectedType(value);
    onTypeChange(value);
  };

  const handleQuantityChange = (value) => {
    setSelectedQuantity(value);
    onQuantityChange(value);
  };

  const onBuyClick = () => {
    navigate(`/createOrder/${goodId}/${selectedType}/${selectedQuantity}`);
  }

  const onAddToCartClick = () => {
    services.cart.addToCart(userId, good, selectedQuantity, selectedType);
  };

  const onTypeChange = value => {
    setSelectedType(value);
    console.log('Selected type:', value);
  };
  const onQuantityChange = value => {
    console.log('Selected quantity:', selectedQuantity);
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };


  if (!good)
  {
    //TBD 跳转主页
    navigate('/home');
  }
  const d = good.img;
  console.log(d)
  const indexMap = require('C:/Users/86133/Desktop/轻量化/work_4/ReactMall/src/static/temp/' + d);
  return <>
    <TopNavBar onBack={goBack} />
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', maxWidth: '600px', maxHeight: '900px', overflowY: 'auto', }}>
      <Card style={{ minWidth: '300px', minHeight: '800px', margin: '40px auto 70px auto' }}>
        <Image src={indexMap} alt={good.name} width="100%" />
        <Title level={2}>{good.name}</Title>
        <Text type="secondary">{good.description}</Text>
        <Divider />
        <Space direction="vertical" size="middle" style={{ textAlign: 'left' }}>
          <Text>
            <span style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>¥{good.types[selectedType - 1].typePrice}</span>
          </Text>
          <Text>商品购买量: {good.buynum} <span style={{ margin: '0 10px' }}>|</span> 商品浏览量：{good.look}<span style={{ margin: '0 10px' }}>|</span>商品存储量：{good.storage}</Text>
        </Space>
        <Divider />
        <Space direction="vertical" size="middle" style={{ textAlign: 'left' }}>
          <Text>
            商品类型:
            <Select
              defaultValue={selectedType}
              style={{ width: 200, marginLeft: 10 }}
              onChange={handleTypeChange}
            >
              {good.types.map(type => (
                <Option key={type.typeid} value={type.typeid}>
                  {type.typeName} - ¥{type.typePrice}
                </Option>
              ))}
            </Select>
          </Text>
          <Text>
            选择数量:
            <InputNumber
              min={1}
              value={selectedQuantity}
              onChange={handleQuantityChange}
              style={{ marginLeft: 10 }}
            />
          </Text>
        </Space>
        <Divider />
        <Title level={3}>商品详情</Title>
        <Text type="secondary">{good.description}</Text>
      </Card>
      <div style={{ position: 'fixed', width: '470px', bottom: 20, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', padding: '10px 20px', boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', gap: '20px', zIndex: 1000 }}>
        <Button type="primary" danger onClick={onBuyClick}>立即购买</Button>
        <Button type="primary" onClick={onAddToCartClick}>加入购物车</Button>
      </div>
    </div>
  </>
}

export default DetailPage;
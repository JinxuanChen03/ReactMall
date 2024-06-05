import 'antd/dist/reset.css'; // 导入 Ant Design 样式
import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useLoginCheck from '../hook/LoginCheck';
import { Card, Typography, Divider, Space, Select, InputNumber, Button, message } from 'antd';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const images = good.img.map(img => require(`../static/temp/${img}`));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

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
  };

  const onAddToCartClick = () => {
    services.cart.addToCart(userId, good, selectedQuantity, selectedType);
    message.success('已成功加入购物车');
  };

  const onTypeChange = (value) => {
    setSelectedType(value);
    console.log('Selected type:', value);
  };

  const onQuantityChange = (value) => {
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

  return (
    <>
      <TopNavBar onBack={goBack} title="商品详情" />
      <div className="detail-container">
        <Card className="detail-card">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={good.name} style={{ width: '100%' }} />
              </div>
            ))}
          </Slider>
          <Title level={2} className="detail-title">{good.name}</Title>
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
        <div className="detail-fixed-footer">
          <Button type="primary" danger onClick={onBuyClick}>立即购买</Button>
          <Button type="primary" onClick={onAddToCartClick}>加入购物车</Button>
        </div>
      </div>
    </>
  );
};

export default DetailPage;

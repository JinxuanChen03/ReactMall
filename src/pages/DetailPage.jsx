import 'antd/dist/reset.css'; // 导入 Ant Design 样式
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import useLoginCheck from '../hook/LoginCheck';
import { Card, Typography, Divider, Space, Select, InputNumber, Button, message, Spin } from 'antd';
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

  // 管理商品数据和加载状态
  const [good, setGood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  //商品改成异步获取
  useEffect(() => {
    const fetchGood = async () => {
      try
      {
        setLoading(true); // 开始加载时设置 loading
        setError(null); // 重置错误状态
        // 异步获取商品数据
        const fetchedGood = await services.good.getGoodById(parsedGoodId);
        console.log('Fetched Good:', fetchedGood); // 确认获取的数据
        setGood(fetchedGood);
        // 设置默认选择类型
        if (fetchedGood && fetchedGood.types.length > 0)
        {
          setSelectedType(fetchedGood.types[0].typeid);
        }
      } catch (error)
      {
        setError(error);
      } finally
      {
        setLoading(false); // 请求完成，取消加载状态
      }
    };

    fetchGood();
  }, [parsedGoodId, services.good]);

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleQuantityChange = (value) => {
    setSelectedQuantity(value);
  };

  const onBuyClick = () => {
    navigate(`/createOrder/${goodId}/${selectedType}/${selectedQuantity}`);
  };

  const onAddToCartClick = () => {
    services.cart.addToCart(userId, good, selectedQuantity, selectedType);
    message.success('已成功加入购物车');
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading)
  {
    return <Spin tip="Loading..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
  }

  if (error)
  {
    return <div>Error: {error.message}</div>;
  }

  if (!good)
  {
    // 如果未找到商品，跳转到主页或显示“未找到”信息
    navigate('/home');
    return null;
  }

  // 确保在数据加载完成后再渲染
  const images = good.img.map(img => require(`../static/temp/${img}`));

  // 修改后的 Slider 设置
  const settings = {
    dots: true,
    infinite: images.length > 1, // 如果只有一张图，禁用无限循环
    speed: 500,
    slidesToShow: 1, // 确保只显示一张幻灯片
    slidesToScroll: 1 // 每次滚动一张幻灯片
  };
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

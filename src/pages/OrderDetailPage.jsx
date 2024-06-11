import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceContext } from '../contexts/ServiceContext';
import useLoginCheck from '../hook/LoginCheck';
import { Card, Typography, Divider, Button, Row, Col, Form, Spin } from 'antd';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
import { EnvironmentOutlined, RightOutlined, CloseCircleOutlined, CheckCircleOutlined, CarOutlined, SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const OrderDetailPage = () => {
  useLoginCheck();
  const services = useContext(ServiceContext);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [good, setGood] = useState(null);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null); // 增加一个状态来保存地址信息
  const [loading, setLoading] = useState(true); // 增加一个加载状态

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true); // 开始加载时设置加载状态为 true
      const parsedOrderId = parseInt(orderId, 10);
      try
      {
        const fetchedOrder = await services.order.getOrderById2(parsedOrderId);
        console.log(fetchedOrder)
        if (fetchedOrder)
        {
          setOrder(fetchedOrder);
          const fetchedGood = await services.good.getGoodById(fetchedOrder.goodId);
          setGood(fetchedGood);
          const fetchedUser = await services.user.getCurrentUser(fetchedOrder.userId);
          setUser(fetchedUser);

          // 获取指定ID的收货地址
          const fetchedAddress = await services.user.getReceivePersonById(fetchedOrder.rId);
          setAddress(fetchedAddress);

        } else
        {
          alert('订单不存在');
          navigate('/home');
        }
      } catch (error)
      {
        console.error('Error fetching order details:', error);
        alert('加载订单详情时出错');
        navigate('/home');
      } finally
      {
        setLoading(false); // 加载完成时设置加载状态为 false
      }
    };

    fetchOrderDetails();
  }, [orderId, services, navigate]);

  const getOrderStatusText = (status) => {
    switch (status)
    {
      case 0:
        return '待支付';
      case 1:
        return '待发货';
      case 2:
        return '已发货';
      case 3:
        return '已完成';
      default:
        return '已关闭';
    }
  };

  const getStatusColor = (status) => {
    switch (status)
    {
      case 0:
        return '#ff4d4f'; // 红色
      case 1:
        return '#40a9ff'; // 蓝色
      case 2:
        return '#faad14'; // 黄色
      case 3:
        return '#52c41a'; // 绿色
      default:
        return '#d9d9d9'; // 灰色
    }
  };

  const getStatusIcon = (status) => {
    switch (status)
    {
      case 0:
        return <CloseCircleOutlined style={{ color: '#FFFFFF', marginLeft: '10px', marginRight: '10px', fontSize: '20px' }} />;
      case 1:
        return <CheckCircleOutlined style={{ color: '#FFFFFF', marginLeft: '10px', marginRight: '10px', fontSize: '20px' }} />;
      case 2:
        return <CarOutlined style={{ color: '#FFFFFF', marginLeft: '10px', marginRight: '10px', fontSize: '20px' }} />;
      case 3:
        return <SmileOutlined style={{ color: '#FFFFFF', marginLeft: '10px', marginRight: '10px', fontSize: '20px' }} />;
      default:
        return <SmileOutlined style={{ color: '#FFFFFF', marginLeft: '10px', marginRight: '10px', fontSize: '20px' }} />;
    }
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const goToDeliveryDetail = () => {
    navigate(`/deliverydetail/${orderId}`); // Navigate to the DeliveryDetailPage
  };

  if (loading)
  {
    return (
      <div className="loading-container">
        <Spin tip="加载中..." size="large" /> {/* 使用 Spin 组件显示加载动画 */}
      </div>
    );
  }

  if (!order || !good || !user || !address)
  {
    return <div>加载中...</div>; // 显示一个加载状态或占位符
  }

  const images = require(`../static/temp/${good.img[order.type - 1]}`);

  return (
    <>
      <TopNavBar onBack={goBack} title="订单详情" />
      <div className="od-container">
        <div className="od-status" style={{ backgroundColor: getStatusColor(order.status) }}>
          {getStatusIcon(order.status)}
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: '20px' }}>{getOrderStatusText(order.status)}</Text>
        </div>
        <div className="od-user-info">
          <Row align="middle" className="od-user-info-row">
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <EnvironmentOutlined className="od-icon" />
              <div>
                <Text className="od-user-name">{address.username}</Text>
                <Text className="od-user-phone">{address.userphone}</Text>
                <Text className="od-user-address">{address.areaaddress} {address.detailaddress}</Text>
              </div>
            </Col>
          </Row>
          <div className="od-dashed-divider"></div>
        </div>
        <Card className="od-card">
          <Title level={4}>商品详情</Title>
          <Divider dashed />
          <div className="od-item">
            <img src={images} className="od-item-img" alt={good.name} />
            <div>
              <Text strong>{good.name}</Text>
              <br />
              <Text type="secondary">{good.types[order.type - 1].typeName}</Text>
              <br />
              <Text className="od-item-details">¥{good.types[order.type - 1].typePrice} * {order.quantity}</Text>
            </div>
          </div>
          <Divider />
          <Form>
            <Text>商品类型: {good.types[order.type - 1].typeName}</Text>
            <br />
            <Text>商品数量: {order.quantity}</Text>
            <Divider />
            <div className="od-summary">
              <Text>商品合计</Text>
              <Text>¥{order.price}</Text>
            </div>
            <div className="od-summary">
              <Text>运费</Text>
              <Text>¥0</Text>
            </div>
            <div className="od-summary">
              <Text>活动优惠</Text>
              <Text>-¥0</Text>
            </div>
            <div className="od-summary">
              <Text>优惠券</Text>
              <Text>-¥0</Text>
            </div>
            <div className="od-summary">
              <Text>积分抵扣</Text>
              <Text>-¥0</Text>
            </div>
            <Divider />
            <div className="od-summary-total">
              <Text>实际支付</Text>
              <Text>¥{order.price}</Text>
            </div>
            <div className="od-remarks">
              <Text>备注</Text>
              <br />
              <Text>{order.remarks}</Text>
            </div>
          </Form>
          <Divider />
          <Button type="primary" onClick={goToDeliveryDetail}>查看配送详情</Button>
        </Card>
      </div>
    </>
  );
};

export default OrderDetailPage;

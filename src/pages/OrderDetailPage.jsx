import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceContext } from '../contexts/ServiceContext';
import useLoginCheck from '../hook/LoginCheck';
import { Card, Typography, Divider, Input, Button, Select, Form, Row, Col } from 'antd';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
import { EnvironmentOutlined, RightOutlined, CloseCircleOutlined, CheckCircleOutlined, CarOutlined, SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const OrderDetailPage = () => {
  useLoginCheck();
  const services = useContext(ServiceContext);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const parsedOrderId = parseInt(orderId, 10);
  const order = services.order.getOrderById(parsedOrderId);
  const good = services.good.getGoodById(order.goodId);
  const user = services.user.getCurrentUser(order.userId);

  const getOrderStatusText = (status) => {
    switch (status)
    {
      case 0:
        return '未支付';
      case 1:
        return '已支付';
      case 2:
        return '发货';
      case 3:
        return '确认收货';
      default:
        return '未知状态';
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
        return <CloseCircleOutlined style={{ color: '#ff4d4f', marginLeft: '10px', marginRight: '10px', fontSize: '20px' }} />;
      case 1:
        return <CheckCircleOutlined style={{ color: '#ff4d4f', marginLeft: '10px', marginRight: '10px', fontSize: '20px' }} />;
      case 2:
        return <CarOutlined style={{ color: '#ff4d4f', marginLeft: '10px', marginRight: '10px', fontSize: '20px' }} />;
      case 3:
        return <SmileOutlined style={{ color: '#ff4d4f', marginLeft: '10px', marginRight: '10px', fontSize: '20px' }} />;
      default:
        return null;
    }
  };

  if (!order)
  {
    alert('订单不存在');
    navigate('/home');
    return;
  }

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

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
                <Text className="od-user-name">{user.username}</Text>
                <Text className="od-user-phone">{user.phone}</Text>
                <Text className="od-user-address">{user.address}</Text>
              </div>
            </Col>
          </Row>
          <div className="od-dashed-divider"></div>
        </div>
        <Card className="od-card">
          <Title level={4}>商品详情</Title>
          <Divider dashed />
          <div className="od-item">
            <img src={images} className="od-item-img" />
            <div>
              <Text strong>{good.name}</Text>
              <br />
              <Text type="secondary">{good.types[order.type - 1].typeName}</Text>
              <br />
              <Text className="od-item-details">¥{good.types[order.type - 1].typePrice}*{order.quantity}</Text>
            </div>
          </div>
          <Divider />
          <Form>
            <Text>
              商品类型: {good.types[order.type - 1].typeName}
            </Text>
            <br />
            <Text>
              商品数量: {order.quantity}
            </Text>
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
              <Text>{order.remarksValue}</Text>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default OrderDetailPage;

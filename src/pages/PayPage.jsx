import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ServiceContext } from '../contexts/ServiceContext';
import useLoginCheck from '../hook/LoginCheck';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
import { Card, Button, Radio, Typography, Divider, Row, Col } from 'antd';
import { AlipayCircleOutlined, WechatOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PayPage = () => {
  useLoginCheck(); // 钩子调用
  const { orderId } = useParams();
  const services = useContext(ServiceContext);
  const navigate = useNavigate();

  const parsedOrderId = parseInt(orderId, 10);
  const order = services.order.getOrderById(parsedOrderId);

  const [paymentMethod, setPaymentMethod] = useState('alipay');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  if (!order)
  {
    // TBD 跳转主页
    alert('订单不存在');
    navigate('/home');
    return;
  }

  const onPayClick = () => {
    // 1. 支付 
    const success = services.order.payOrder(parsedOrderId);
    if (!success)
    {
      alert('支付失败!');
      return;
    }
    // 2. 跳转到支付成功页面
    alert('支付成功');
    navigate(`/orderDetail/${orderId}`);
  };

  return (
    <>
      <TopNavBar onBack={() => navigate(-1)} title="支付页面" />
      <div className="pay-container">
        <Card className="pay-card">
          <Title level={3}>支付</Title>
          <Title level={4} className="pay-title">支付金额</Title>
          <Title level={2}>¥{order.price}</Title>
          <Radio.Group onChange={handlePaymentChange} value={paymentMethod} className="pay-radio-group">
            <Divider />
            <Radio value="alipay" className="pay-radio">
              <Row align="middle" className="pay-radio-row">
                <Col span={4}>
                  <AlipayCircleOutlined className="pay-radio-icon" />
                </Col>
                <Col span={18} className="pay-radio-text">
                  支付宝支付
                </Col>
              </Row>
            </Radio>
            <Divider />
            <Radio value="wechat" className="pay-radio">
              <Row align="middle" className="pay-radio-row">
                <Col span={4}>
                  <WechatOutlined className="pay-radio-icon" />
                </Col>
                <Col span={18} className="pay-radio-text">
                  微信支付
                </Col>
              </Row>
            </Radio>
            <Divider />
          </Radio.Group>
          <Button type="primary" size="large" className="pay-button" onClick={onPayClick}>
            确认支付
          </Button>
        </Card>
      </div>
    </>
  );
};

export default PayPage;

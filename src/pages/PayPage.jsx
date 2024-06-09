import React, { useContext, useEffect, useState } from 'react';
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

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('alipay');

  // 异步获取订单数据
  useEffect(() => {
    const fetchOrder = async () => {
      try
      {
        const parsedOrderId = parseInt(orderId, 10);
        const fetchedOrder = await services.order.getOrderById(parsedOrderId);
        setOrder(fetchedOrder);
      } catch (error)
      {
        console.error('Error fetching order:', error);
        alert('订单不存在');
        navigate('/home');
      } finally
      {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, services.order, navigate]);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const onPayClick = async () => {
    try
    {
      // 根据选择的支付方式显示信息
      const paymentType = paymentMethod === 'alipay' ? '支付宝支付' : '微信支付';
      const parsedOrderId = parseInt(orderId, 10);
      const success = await services.order.payOrder(parsedOrderId, paymentType);
      if (!success)
      {
        alert('支付失败!');
        return;
      }
      alert(`支付成功！支付方式：${paymentType}`);
      navigate(`/orderDetail/${orderId}`);
    } catch (error)
    {
      console.error('Error processing payment:', error);
      alert('支付过程中出现错误，请稍后再试。');
    }
  };

  if (loading)
  {
    return <div>加载中...</div>; // 或者显示一个加载指示器
  }

  if (!order)
  {
    return null; // 订单不存在时，返回 null 或者显示一个错误信息
  }

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

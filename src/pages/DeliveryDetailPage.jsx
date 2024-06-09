import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceContext } from '../contexts/ServiceContext';
import { Card, Typography, Divider, Spin, Timeline, Row, Col } from 'antd';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
import { CheckCircleOutlined, CloseCircleOutlined, CarOutlined, SmileOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DeliveryDetailPage = () => {
  const { orderId } = useParams();
  const services = useContext(ServiceContext);
  const navigate = useNavigate();
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [loading, setLoading] = useState(true); // 增加一个加载状态

  useEffect(() => {
    const fetchDeliveryInfo = async () => {
      setLoading(true); // 开始加载时设置加载状态为 true
      try
      {
        const fetchedDeliveryInfo = await services.order.getDeliveryByOrderId(orderId);
        setDeliveryInfo(fetchedDeliveryInfo);
      } catch (error)
      {
        console.error('Error fetching delivery info:', error);
        alert('无法加载配送详情');
        navigate('/home');
      } finally
      {
        setLoading(false); // 加载完成时设置加载状态为 false
      }
    };

    fetchDeliveryInfo();
  }, [orderId, services.order, navigate]);

  if (loading)
  {
    return (
      <div className="loading-container">
        <Spin tip="加载中..." size="large" />
      </div>
    );
  }

  if (!deliveryInfo)
  {
    return <div>配送信息不存在</div>;
  }

  const deliverySteps = [
    { title: '订单已提交', description: deliveryInfo.submit, time: deliveryInfo.submitTime, icon: <ClockCircleOutlined /> },
    { title: '订单付款成功', description: deliveryInfo.pay, time: deliveryInfo.payTime, icon: <CheckCircleOutlined /> },
    { title: '下级地点扫描', description: deliveryInfo.transfer1, time: deliveryInfo.transfer1Time, icon: <CarOutlined /> },
    { title: '卸车扫描', description: deliveryInfo.transfer2, time: deliveryInfo.transfer2Time, icon: <CarOutlined /> },
    { title: '发出扫描', description: deliveryInfo.transfer3, time: deliveryInfo.transfer3Time, icon: <CarOutlined /> },
    { title: '到达目的地', description: deliveryInfo.transfer4, time: deliveryInfo.transfer4Time, icon: <CarOutlined /> },
    { title: '商品派送中', description: deliveryInfo.send, time: deliveryInfo.sendTime, icon: <CarOutlined /> },
    { title: '订单已签收', description: deliveryInfo.signFor, icon: <SmileOutlined /> }
  ];

  return (
    <>
      <TopNavBar onBack={() => navigate(-1)} title="配送详情" />
      <div className="delivery-container" style={containerStyle}>
        <Card className="delivery-card" style={cardStyle}>
          <Title level={4} style={titleStyle}>配送详情</Title>
          <Divider dashed />
          <Timeline>
            {deliverySteps.map((step, index) => (
              step.description && (
                <Timeline.Item
                  key={index}
                  color={index === 0 ? 'red' : 'gray'} // 当前步骤为红色，其余为灰色
                  dot={step.icon}
                >
                  <Row>
                    <Col span={24}>
                      <Text strong>{step.title}</Text>
                      <br />
                      <Text>{step.description}</Text>
                      {step.time && (
                        <>
                          <br />
                          <Text type="secondary">{step.time}</Text>
                        </>
                      )}
                    </Col>
                  </Row>
                </Timeline.Item>
              )
            ))}
          </Timeline>
        </Card>
      </div>
    </>
  );
};

const containerStyle = {
  padding: '16px',
  marginTop: '40px',
  backgroundColor: '#f0f2f5',
  maxWidth: '600px',
  maxHeight: '900px',
  minHeight: '900px',
  overflowY: 'auto',
  textAlign: 'center',
  margin: '40 auto',
  borderRadius: '10px', // 增加圆角
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // 增加阴影
};

const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // 卡片的阴影
  padding: '16px',
  textAlign: 'left'
};

const titleStyle = {
  marginBottom: '16px',
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold'
};

export default DeliveryDetailPage;


import 'antd/dist/reset.css'; // 导入 Ant Design 样式
import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, List, Typography, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../contexts/ServiceContext';
import useLoginCheck from '../hook/LoginCheck';
import TopNavBar from '../components/TopNavBar';
import BottomNav from "../components/BottomNav"; // 导入封装好的组件

const { Title } = Typography;

const OrderUnpaidPage = () => {
  useLoginCheck(); // 钩子调用
  const [orders, setOrders] = useState([]);
  const service = useContext(ServiceContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const currentUser = await service.user.getCurrentUser(); // 获取当前用户信息
        console.log('Current User:', currentUser); // 调试信息
        if (currentUser) {
          const userOrders = await service.order.getOrdersByUserId(currentUser.id); // 获取用户订单数据
          console.log('User Orders:', userOrders); // 调试信息
          const unpaidOrders = userOrders.filter(order => order.orderStatus === '待付款'); // 过滤待付款订单
          setOrders(unpaidOrders);
        }
      } catch (error) {
        console.error('获取订单数据时出错:', error);
      }
    };

    fetchOrderData();
  }, [service]);

  const handleViewDetails = (orderId) => {
    navigate(`/orderDetail/${orderId}`);
  };

  const handleDeleteOrder = async (orderId) => {
    Modal.confirm({
      title: '确认删除',
      content: '你确定要删除这个订单吗？',
      onOk: async () => {
        const success = await service.order.deleteOrder(orderId);
        if (success) {
          setOrders(orders.filter(order => order.id !== orderId));
        } else {
          Modal.error({ title: '删除失败', content: '删除订单时发生错误，请稍后再试。' });
        }
      }
    });
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const goToHome = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <>
      <TopNavBar onBack={goBack} onHome={goToHome} title="待付款订单" />
      <div style={styles.container}>
        <div style={{ flex: '1 1 auto', padding: '20px' }}>
          <Card style={styles.card}>
            <Title level={2} style={styles.title}>待付款订单</Title>
            <OrderList orders={orders} onViewDetails={handleViewDetails} onDeleteOrder={handleDeleteOrder} />
          </Card>
        </div>
      </div>
    </>
  );
};

const OrderList = ({ orders, onViewDetails, onDeleteOrder }) => (
  <List
    itemLayout="horizontal"
    dataSource={orders}
    renderItem={order => (
      <List.Item
        actions={[
          <Button type="link" onClick={() => onViewDetails(order.id)}>查看详情</Button>,
          <Button type="link" danger onClick={() => onDeleteOrder(order.id)}>删除</Button>
        ]}
      >
        <List.Item.Meta
          title={`订单号: ${order.orderNum}`}
          description={`创建时间: ${order.submitTime}`}
        />
        <div>{order.orderStatus}</div>
      </List.Item>
    )}
  />
);

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    height: '100vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  }
};

export default OrderUnpaidPage;

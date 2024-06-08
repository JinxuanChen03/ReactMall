// import React, { useContext, useState, useEffect } from 'react';
// import { ServiceContext } from '../contexts/ServiceContext';
// import useLoginCheck from '../hook/LoginCheck';
// //写几个组件，分支付，未支付//要有增删改查
// const OrderListPage = () => {
//   useLoginCheck();
//   const [orders, setOrders] = useState([]);
//   const service = useContext(ServiceContext);
//   useEffect(() => {
//     const currentUser = service.user.getCurrentUser(); // 获取当前用户信息
//     setOrders(service.order.getOrdersByUserId(currentUser.id));
//   }, []);


//   return (
//     <div>
//       <h2>User Orders</h2>
//       <ul>
//         {orders.map(order => (
//           <li key={order.id}>
//             Order #{order.orderNo} - Status: {order.status === 1 ? 'Paid' : 'Unpaid'} - Created at: {order.createTime}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OrderListPage;
import 'antd/dist/reset.css'; // 导入 Ant Design 样式
import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, List, Tabs, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../contexts/ServiceContext';
import useLoginCheck from '../hook/LoginCheck';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件

const { Title } = Typography;
const { TabPane } = Tabs;

const OrderListPage = () => {
    useLoginCheck(); // 钩子调用
    const [orders, setOrders] = useState([]);
    const service = useContext(ServiceContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderData = async () => {
            const currentUser = service.user.getCurrentUser();
            if (currentUser) {
                const userOrders = service.order.getOrdersByUserId(currentUser.id);
                setOrders(userOrders);
            }
        };

        fetchOrderData();
    }, [service]);

    const handleViewDetails = (orderId) => {
        navigate(`/orderDetail/${orderId}`);
    };

    const filterOrders = (status) => {
        if (status === 'all') {
            return orders;
        }
        return orders.filter(order => order.status === status);
    };

    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const goToHome = () => {
        navigate('/home'); // Navigate to the home page
    };

    return (
        <>
            <TopNavBar onBack={goBack} onHome={goToHome} title="我的订单" />
            <div style={styles.container}>
                <div style={{ flex: '1 1 auto', padding: '20px' }}>
                    <Card style={styles.card}>
                        <Title level={2} style={styles.title}>我的订单</Title>
                        <Tabs defaultActiveKey="all">
                            <TabPane tab="全部订单" key="all">
                                <OrderList orders={filterOrders('all')} onViewDetails={handleViewDetails} />
                            </TabPane>
                            <TabPane tab="待付款" key="pending">
                                <OrderList orders={filterOrders(0)} onViewDetails={handleViewDetails} />
                            </TabPane>
                            <TabPane tab="待收货" key="shipped">
                                <OrderList orders={filterOrders(1)} onViewDetails={handleViewDetails} />
                            </TabPane>
                            <TabPane tab="退款/售后" key="refund">
                                <OrderList orders={filterOrders(2)} onViewDetails={handleViewDetails} />
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </>
    );
};

const OrderList = ({ orders, onViewDetails }) => (
    <List
        itemLayout="horizontal"
        dataSource={orders}
        renderItem={order => (
            <List.Item
                actions={[
                    <Button type="link" onClick={() => onViewDetails(order.id)}>查看详情</Button>
                ]}
            >
                <List.Item.Meta
                    title={`订单号: ${order.orderNo}`}
                    description={`创建时间: ${order.createTime}`}
                />
                <div>{order.status === 1 ? '已支付' : '未支付'}</div>
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

export default OrderListPage;

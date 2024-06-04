import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceContext } from '../contexts/ServiceContext';
import useLoginCheck from '../hook/LoginCheck';
import { Card, Typography, Divider, Input, Button, Select, Form } from 'antd';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
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
  console.log(order)
  if (!order)
  {
    alert('订单不存在');
    navigate('/home');
    return;
  }
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  const d = good.img;
  console.log(d)
  //换成自己的地址
  const indexMap = require('C:/Users/86133/Desktop/轻量化/work_4/ReactMall/src/static/temp/' + d);
  return <>
    <TopNavBar onBack={goBack} />
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', maxWidth: '600px', maxHeight: '600px', maxHeight: '900px', overflowY: 'auto', }}>
      <Card style={{ minWidth: '300px', minHeight: '100px', overflowY: 'auto', margin: '40px auto 0 auto' }}>
        <Title level={4}>订单详情</Title>
        <Text strong>订单状态: { }</Text>
        {order.status === 0 && '未支付'}
        {order.status === 1 && '已支付'}
        {order.status === 2 && '发货'}
        {order.status === 3 && '确认收货'}
        <br />
        <Text type="secondary">订单号：{order.orderNo}</Text>
        <br />
        <Text type="secondary">创建时间：{order.createTime}</Text>
        <Divider />
        <div style={{ marginBottom: '16px' }}>
          <Text strong>{user.username} {user.phone}</Text>
          <br />
          <Text>{user.address}</Text>
        </div>
      </Card>
      <Card style={{ minWidth: '300px', minHeight: '600px', margin: '10px auto 0 auto' }}>
        <Title level={4}>商品详情</Title>
        <Divider dashed />
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <img src={indexMap} style={{ width: '60px', height: '60px', marginRight: '16px' }} />
          <div>
            <Text strong>{good.name}</Text>
            <br />
            <Text type="secondary">{good.description}</Text>
            <br />
            <Text type="secondary">{good.types[order.type - 1].typeName}</Text>
            <br />
            <Text strong style={{ color: 'red', fontSize: '18px' }}>¥{good.types[order.type - 1].typePrice}*{order.quantity}</Text>
          </div>
        </div>
        <Divider />
        <Form>
          <Text>
            商品类型:{good.types[order.type - 1].typeName}
          </Text>
          <br />
          <Text>
            商品数量:{order.quantity}
          </Text>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>商品合计</Text>
            <Text>¥{order.price}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>运费</Text>
            <Text>¥0</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>活动优惠</Text>
            <Text>-¥0</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>优惠券</Text>
            <Text>-¥0</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>积分抵扣</Text>
            <Text>-¥0</Text>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <Text>实际支付</Text>
            <Text>¥{order.price}</Text>
          </div>
          <Text>备注</Text>
          <br />
          <Text>{order.remarksValue}</Text>
        </Form>
      </Card>
    </div>
  </>
}

export default OrderDetailPage;

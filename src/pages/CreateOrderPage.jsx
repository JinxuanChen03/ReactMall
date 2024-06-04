import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useLoginCheck from '../hook/LoginCheck';
import { ServiceContext } from '../contexts/ServiceContext';
import { Card, Typography, Divider, Input, Button, Select, Form } from 'antd';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
const { Title, Text } = Typography;
const { Option } = Select;


const CreateOrderPage = () => {
  useLoginCheck();
  const { goodId, type, number } = useParams();
  const services = useContext(ServiceContext);
  const parsedGoodId = parseInt(goodId, 10);
  const parsedquantityId = parseInt(number);
  const parsedTypeId = parseInt(type, 10);
  const good = services.good.getGoodById(parsedGoodId);
  const user = services.user.getCurrentUser();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  let price = good.types[parsedTypeId - 1].typePrice * parsedquantityId;
  const onSubmitClick = (values) => {
    // 1. 创建订单，拿到orderid
    const parsedGoodId = parseInt(goodId, 10);
    const good = services.good.getGoodById(parsedGoodId);
    const useId = services.user.getCurrentUser().id;
    good.buynum = good.buynum + 1;
    if (!good)
    {
      //TBD 跳转主页
      alert('商品不存在');
      navigate('/home');
      return;
    }
    const order = services.order.createOrder(useId, parsedGoodId, price, parsedTypeId, parsedquantityId, values.remarks)
    // 2. 跳转到支付页面
    alert('下单成功，请支付！');
    navigate(`/pay/${order.id}`);
  }

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const d = good.img;
  console.log(d)
  const indexMap = require('C:/Users/86133/Desktop/轻量化/work_4/ReactMall/src/static/temp/' + d);
  return <>
    <TopNavBar onBack={goBack} />
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', maxWidth: '600px', maxHeight: '900px', overflowY: 'auto', }}>
      <Card style={{ minWidth: '300px', minHeight: '800px', margin: '40px auto 0 auto' }}>
        <Title level={4}>创建订单</Title>
        <Divider />
        <div style={{ marginBottom: '16px' }}>
          <Text strong>{user.username} {user.phone}</Text>
          <br />
          <Text>{user.address}</Text>
        </div>
        <Divider dashed />
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <img src={indexMap} style={{ width: '60px', height: '60px', marginRight: '16px' }} />
          <div>
            <Text strong>{good.name}</Text>
            <br />
            <Text type="secondary">{good.description}</Text>
            <br />
            <Text type="secondary">{good.types[parsedTypeId - 1].typeName}</Text>
            <br />
            <Text strong style={{ color: 'red', fontSize: '18px' }}>¥{good.types[parsedTypeId - 1].typePrice}*{parsedquantityId}</Text>
          </div>
        </div>
        <Divider />
        <Form form={form} onFinish={onSubmitClick}>
          <Text>
            商品类型:{good.types[parsedTypeId - 1].typeName}
          </Text>
          <br />
          <Text>
            商品数量:{parsedquantityId}
          </Text>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>商品合计</Text>
            <Text>¥{price}</Text>
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
            <Text>¥{price}</Text>
          </div>
          <Form.Item label="备注" name="remarks">
            <Input.TextArea placeholder="请填写备注信息" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>提交订单</Button>
        </Form>
      </Card>
    </div>
  </>
}

export default CreateOrderPage;
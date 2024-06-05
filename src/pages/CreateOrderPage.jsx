import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useLoginCheck from '../hook/LoginCheck';
import { ServiceContext } from '../contexts/ServiceContext';
import { Card, Typography, Divider, Input, Button, Select, Form, Space, Row, Col } from 'antd';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
import { EnvironmentOutlined } from '@ant-design/icons';

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
    const order = services.order.createOrder(useId, parsedGoodId, price, parsedTypeId, parsedquantityId, values.remarks);
    // 2. 跳转到支付页面
    alert('下单成功，请支付！');
    navigate(`/pay/${order.id}`);
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const images = require(`../static/temp/${good.img[parsedTypeId - 1]}`);

  return (
    <>
      <TopNavBar onBack={goBack} title="创建订单" />
      <div className="co-container">
        <div className="co-user-info">
          <Row align="middle" className="co-user-info-row">
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <EnvironmentOutlined className="co-user-info-icon" />
              <div>
                <Text className="co-user-info-text">{user.username}</Text>
                <Text className="co-user-info-phone">{user.phone}</Text>
                <Text className="co-user-info-address">{user.address}</Text>
              </div>
            </Col>
            <Col style={{ marginLeft: 'auto' }}></Col>
          </Row>
          <div className="co-dashed-divider"></div>
        </div>
        <Card className="co-card">
          <Title level={4}>商品详情</Title>
          <Divider />
          <div className="co-item">
            <img src={images} className="co-item-img" />
            <div>
              <Text strong>{good.name}</Text>
              <br />
              <Text type="secondary">{good.types[parsedTypeId - 1].typeName}</Text>
              <br />
              <Text className="co-item-details">¥{good.types[parsedTypeId - 1].typePrice} x {parsedquantityId}</Text>
            </div>
          </div>
          <Divider />
          <Form form={form} onFinish={onSubmitClick}>
            <Text>商品类型: {good.types[parsedTypeId - 1].typeName}</Text>
            <br />
            <Text>商品数量: {parsedquantityId}</Text>
            <Divider />
            <div className="co-summary">
              <Text>商品合计</Text>
              <Text>¥{price}</Text>
            </div>
            <div className="co-summary">
              <Text>运费</Text>
              <Text>¥0</Text>
            </div>
            <div className="co-summary">
              <Text>活动优惠</Text>
              <Text>-¥0</Text>
            </div>
            <div className="co-summary">
              <Text>优惠券</Text>
              <Text>-¥0</Text>
            </div>
            <div className="co-summary">
              <Text>积分抵扣</Text>
              <Text>-¥0</Text>
            </div>
            <Divider />
            <div className="co-summary-total">
              <Text>实际支付</Text>
              <Text>¥{price}</Text>
            </div>
            <div className="co-form-remarks">
              <Form.Item label="备注" name="remarks">
                <Input.TextArea placeholder="请填写备注信息" />
              </Form.Item>
            </div>
            <Button type="primary" htmlType="submit" block>提交订单</Button>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default CreateOrderPage;

import 'antd/dist/reset.css'; // 导入 Ant Design 样式
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import useLoginCheck from '../hook/LoginCheck';
import { ServiceContext } from '../contexts/ServiceContext';
import { Card, Typography, Divider, Input, Button, Form, Space, Row, Col, Spin, message } from 'antd';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
import { EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CreateOrderPage = () => {
  useLoginCheck();
  const { goodId, type, number } = useParams();
  const services = useContext(ServiceContext);
  const parsedGoodId = parseInt(goodId, 10);
  const parsedquantityId = parseInt(number, 10);
  const parsedTypeId = parseInt(type, 10);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // 管理商品和用户数据的状态
  const [good, setGood] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        setLoading(true); // 开始加载时设置 loading
        setError(null); // 重置错误状态

        // 异步获取商品数据
        const fetchedGood = await services.good.getGoodById(parsedGoodId);
        setGood(fetchedGood);

        // 异步获取用户数据
        const currentUser = services.user.getCurrentUser();
        setUser(currentUser);

        if (!fetchedGood || !currentUser)
        {
          message.error('商品或用户信息获取失败');
          navigate('/home');
        }
      } catch (error)
      {
        setError(error);
      } finally
      {
        setLoading(false); // 请求完成，取消加载状态
      }
    };

    fetchData();
  }, [parsedGoodId, services.good, services.user, navigate]);

  const onSubmitClick = async (values) => {
    try
    {
      if (!good || !user)
      {
        throw new Error('商品或用户信息不可用');
      }

      // 1. 创建订单
      const order = await services.order.createOrder(
        user.id,
        parsedGoodId,
        good.types[parsedTypeId - 1].typePrice * parsedquantityId,
        parsedTypeId,
        parsedquantityId,
        values.remarks
      );
      console.log(order)

      // 2. 提示下单成功并跳转到支付页面
      message.success('下单成功，请支付！');
      navigate(`/pay/${order.id}`);
    } catch (error)
    {
      console.error('创建订单失败:', error);
      message.error('创建订单失败，请重试');
    }
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading)
  {
    return <Spin tip="Loading..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
  }

  if (error)
  {
    return <div>Error: {error.message}</div>;
  }

  if (!good || !user)
  {
    // 如果未找到商品或用户，跳转到主页或显示“未找到”信息
    navigate('/home');
    return null;
  }

  const images = require(`../static/temp/${good.img[parsedTypeId - 1]}`);
  const price = good.types[parsedTypeId - 1].typePrice * parsedquantityId;

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
            <img src={images} className="co-item-img" alt={good.name} />
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

import 'antd/dist/reset.css'; // 导入 Ant Design 样式
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import useLoginCheck from '../hook/LoginCheck';
import { ServiceContext } from '../contexts/ServiceContext';
import { Card, Typography, Divider, Input, Button, Form, Row, Col, Spin, message } from 'antd';
import { EnvironmentOutlined, RightOutlined } from '@ant-design/icons';
import TopNavBar from '../components/TopNavBar'; // 导入封装好的组件
import AddressSelectorModal from '../components/AddressSelectorModal'; // 导入 AddressSelectorModal 组件

const { Title, Text } = Typography;

const CreateOrderPage = () => {
  useLoginCheck();
  const { goodId, type, number } = useParams();
  const services = useContext(ServiceContext);
  const parsedGoodId = parseInt(goodId, 10);
  const parsedQuantity = parseInt(number, 10);
  const parsedTypeId = parseInt(type, 10);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // 管理商品和用户数据的状态
  const [good, setGood] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addresses, setAddresses] = useState([]); // 状态用于存储地址信息
  const [selectedAddress, setSelectedAddress] = useState(null); // 状态用于存储选中的地址
  const [isModalVisible, setIsModalVisible] = useState(false); // 管理弹窗的显示状态

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
          return;
        }

        // 异步获取地址信息
        const userAddresses = services.user.getLocalAddressesByUserId(currentUser.id);
        setAddresses(userAddresses);
        if (userAddresses.length > 0)
        {
          setSelectedAddress(userAddresses[0]); // 默认选中第一个地址
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

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsModalVisible(false); // 选择地址后关闭弹窗
  };

  const onSubmitClick = async (values) => {
    try
    {
      if (!good || !user || !selectedAddress)
      {
        throw new Error('商品、用户或地址信息不可用');
      }
      // 创建地址信息
      const newAddress = {
        username: selectedAddress.username,
        userphone: selectedAddress.userphone,
        areaaddress: selectedAddress.areaaddress,
        detailaddress: selectedAddress.detailaddress,
        usercode: "518000",
        userId: user.id
      };
      const addedAddress = await services.user.addReceivePerson(newAddress);

      // 创建订单
      const order = await services.order.createOrder(
        user.id,
        addedAddress.id,
        parsedGoodId,
        good.types[parsedTypeId - 1].typePrice * parsedQuantity,
        parsedTypeId,
        parsedQuantity,
        values.remarks
      );

      const orderGoods = {
        id: "",
        orderNum: order.orderNo.toString(),
        goodId: parsedGoodId.toString(),
        thisAmount: (good.types[parsedTypeId - 1].typePrice * parsedQuantity).toString(),
        number: parsedQuantity.toString()
      };
      await services.order.addOrderGood(orderGoods);

      // 提示下单成功并跳转到支付页面
      message.success('下单成功，请支付！');
      navigate(`/pay/${order.id}`);
    } catch (error)
    {
      console.error('创建订单失败:', error);
      message.error('创建订单失败，请重试');
    }
  };

  const goBack = () => {
    navigate(-1);
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
    navigate('/home');
    return null;
  }

  const images = require(`../static/temp/${good.img[parsedTypeId - 1]}`);
  const price = good.types[parsedTypeId - 1].typePrice * parsedQuantity;

  return (
    <>
      <TopNavBar onBack={goBack} title="创建订单" />
      <div className="co-container">
        <div className="co-user-info" style={{ position: 'relative', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '8px', marginBottom: '20px' }}>
          <Row align="middle" className="co-user-info-row">
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <EnvironmentOutlined className="co-user-info-icon" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '16px' }}>
                    {selectedAddress ? selectedAddress.username : user.username}
                  </Text>
                  <Text style={{ color: '#888' }}>
                    {selectedAddress ? selectedAddress.userphone : user.phone}
                  </Text>
                </div>
                <Text className="co-user-info-address" style={{ display: 'block', color: '#888', marginTop: '5px' }}>
                  {selectedAddress
                    ? `${selectedAddress.areaaddress} ${selectedAddress.detailaddress}`
                    : '未选择地址'}
                </Text>
              </div>
            </Col>
            <Col style={{ marginLeft: 'auto' }}>
              <RightOutlined
                style={{ fontSize: '20px', cursor: 'pointer' }}
                onClick={() => setIsModalVisible(true)}
              />
            </Col>
          </Row>
        </div>
        <Card className="co-card">
          <Title level={4}>商品详情</Title>
          <Divider />
          <div className="co-item" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={images} className="co-item-img" alt={good.name} style={{ width: '100px', marginRight: '20px' }} />
            <div>
              <Text strong>{good.name}</Text>
              <br />
              <Text type="secondary">{good.types[parsedTypeId - 1].typeName}</Text>
              <br />
              <Text className="co-item-details">¥{good.types[parsedTypeId - 1].typePrice} x {parsedQuantity}</Text>
            </div>
          </div>
          <Divider />
          <Form form={form} onFinish={onSubmitClick}>
            <div className="co-summary" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Text>商品合计</Text>
              <Text>¥{price}</Text>
            </div>
            <div className="co-summary" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Text>运费</Text>
              <Text>¥0</Text>
            </div>
            <div className="co-summary" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Text>活动优惠</Text>
              <Text>-¥0</Text>
            </div>
            <div className="co-summary" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Text>优惠券</Text>
              <Text>-¥0</Text>
            </div>
            <div className="co-summary" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Text>积分抵扣</Text>
              <Text>-¥0</Text>
            </div>
            <Divider />
            <div className="co-summary-total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
              <Text>实际支付</Text>
              <Text>¥{price}</Text>
            </div>
            <div className="co-form-remarks" style={{ marginTop: '20px' }}>
              <Form.Item label="备注" name="remarks">
                <Input.TextArea placeholder="请填写备注信息" />
              </Form.Item>
            </div>
            <Button type="primary" htmlType="submit" block style={{ marginTop: '20px' }}>提交订单</Button>
          </Form>
        </Card>
      </div>
      <AddressSelectorModal
        visible={isModalVisible}
        onAddressSelect={handleAddressSelect}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default CreateOrderPage;

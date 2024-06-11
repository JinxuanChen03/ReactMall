import React, { useContext, useState, useEffect } from 'react';
import { List, Button, Modal, Form, Input, message, Card, Typography } from 'antd';
import { ServiceContext } from '../contexts/ServiceContext';
import { useNavigate } from 'react-router';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import TopNavBar from '../components/TopNavBar';

const { Title, Text } = Typography;

const AddressManagementPage = () => {
  const services = useContext(ServiceContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const userId = services.user.getCurrentUser().id;

  useEffect(() => {
    const loadAddresses = () => {
      try
      {
        const fetchedAddresses = services.user.getLocalAddressesByUserId(userId);
        setAddresses(fetchedAddresses);
      } catch (error)
      {
        message.error('Failed to fetch local addresses');
      } finally
      {
        setLoading(false);
      }
    };

    loadAddresses();
  }, [services.user, userId]);

  const showModal = (address = null) => {
    setCurrentAddress(address);
    setIsModalVisible(true);
    form.setFieldsValue(address || {});
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try
    {
      const values = await form.validateFields();
      if (currentAddress)
      {
        services.user.updateLocalAddress(currentAddress.id, values);
        setAddresses(prev => prev.map(addr => (addr.id === currentAddress.id ? { ...addr, ...values } : addr)));
        message.success('地址更新成功');
      } else
      {
        const newAddress = {
          ...values,
          id: Date.now(),
          userId
        };
        services.user.addLocalAddress(newAddress);
        setAddresses(prev => [...prev, newAddress]);
        message.success('地址添加成功');
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error)
    {
      message.error('操作失败，请重试');
    }
  };

  const handleDelete = async (id) => {
    try
    {
      services.user.deleteLocalAddress(id);
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      message.success('地址删除成功');
    } catch (error)
    {
      message.error('删除失败，请重试');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <TopNavBar onBack={goBack} title="收货地址管理" />
      <div className="address-management-container" style={{ padding: '20px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ marginBottom: 20, marginTop: 40 }}
          size="large"
        >
          新增地址
        </Button>
        <List
          loading={loading}
          itemLayout="vertical"
          dataSource={addresses}
          renderItem={item => (
            <Card
              key={item.id}
              style={{ marginBottom: 20 }}
              actions={[
                <Button icon={<EditOutlined />} onClick={() => showModal(item)} type="link" size="small">编辑</Button>,
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)} type="link" size="small" danger>删除</Button>
              ]}
            >
              <List.Item.Meta
                title={<div><UserOutlined /> {item.username} - <PhoneOutlined /> {item.userphone}</div>}
                description={<div><EnvironmentOutlined /> {item.areaaddress} {item.detailaddress}</div>}
              />
            </Card>
          )}
          locale={{ emptyText: '没有地址信息，请添加新的地址' }}
        />
      </div>
      <Modal
        title={currentAddress ? '编辑地址' : '新增地址'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        width={435}
        bodyStyle={{ backgroundColor: '#f0f2f5', borderRadius: '8px', padding: '24px' }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="username" label="收货人姓名" rules={[{ required: true, message: '请输入收货人姓名' }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="userphone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="areaaddress" label="区域地址" rules={[{ required: true, message: '请输入区域地址' }]}>
            <Input prefix={<EnvironmentOutlined />} />
          </Form.Item>
          <Form.Item name="detailaddress" label="详细地址" rules={[{ required: true, message: '请输入详细地址' }]}>
            <Input prefix={<EnvironmentOutlined />} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddressManagementPage;

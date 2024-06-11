import React, { useState, useEffect } from 'react';
import { Modal, Radio, Space, Typography, message, Card } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Text } = Typography;

const AddressSelectorModal = ({ visible, onCancel, onAddressSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    // 从 localStorage 加载地址数据
    const loadAddresses = () => {
      const storedAddresses = localStorage.getItem('localAddresses');
      if (storedAddresses)
      {
        const parsedAddresses = JSON.parse(storedAddresses);
        setAddresses(parsedAddresses);
        if (parsedAddresses.length > 0)
        {
          setSelectedAddress(parsedAddresses[0].id); // 默认选择第一个地址
        }
      } else
      {
        message.info('没有找到地址信息，请添加地址');
      }
    };

    loadAddresses();
  }, []);

  const handleOk = () => {
    const address = addresses.find(addr => addr.id === selectedAddress);
    if (address)
    {
      onAddressSelect(address);
    }
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  return (
    <Modal
      title="选择收货地址"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
      width={435}
      Style={{ backgroundColor: '#f0f2f5', borderRadius: '8px', padding: '4px' }}
    >
      {addresses.length > 0 ? (
        <Radio.Group onChange={handleAddressChange} value={selectedAddress} style={{ width: '100%' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {addresses.map(address => (
              <Card key={address.id} bordered={false} style={{ marginBottom: 8, padding: '8px' }}>
                <Radio value={address.id} style={{ width: '100%' }}>
                  <Space>
                    <HomeOutlined style={{ color: '#1890ff' }} />
                    <Text strong>{address.username}</Text>
                    <Text>{address.userphone}</Text>
                    <Text>{address.areaaddress} {address.detailaddress}</Text>
                  </Space>
                </Radio>
              </Card>
            ))}
          </Space>
        </Radio.Group>
      ) : (
        <Text>没有地址信息，请添加地址</Text>
      )}
    </Modal>
  );
};

export default AddressSelectorModal;

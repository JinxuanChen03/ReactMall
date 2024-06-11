import React, { useState, useEffect } from 'react';
import { Modal, Button, Radio, Space, Typography, message } from 'antd';

const { Text } = Typography;

const AddressSelectorModal = ({ onAddressSelect }) => {
  const [visible, setVisible] = useState(false);
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

  const showModal = () => {
    if (addresses.length === 0)
    {
      message.info('没有地址可供选择，请先添加地址');
      return;
    }
    setVisible(true);
  };

  const handleOk = () => {
    const address = addresses.find(addr => addr.id === selectedAddress);
    if (address)
    {
      onAddressSelect(address);
    }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        选择收货地址
      </Button>
      <Modal
        title="选择收货地址"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        width={480} // 设置弹框的宽度
      >
        {addresses.length > 0 ? (
          <Radio.Group onChange={handleAddressChange} value={selectedAddress}>
            <Space direction="vertical">
              {addresses.map(address => (
                <Radio key={address.id} value={address.id}>
                  <Text>{address.username}, {address.userphone}, {address.areaaddress} {address.detailaddress}</Text>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        ) : (
          <Text>没有地址信息，请添加地址</Text>
        )}
      </Modal>
    </>
  );
};

export default AddressSelectorModal;

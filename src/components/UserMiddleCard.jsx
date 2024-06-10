import React from 'react';
import { Card } from 'antd';
import {AccountBookOutlined, CarOutlined, FileDoneOutlined, MoneyCollectOutlined} from "@ant-design/icons";

const gridStyle = {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const App = () => (
    <Card >
        <Card.Grid style={gridStyle}>
            <FileDoneOutlined style={{ fontSize: '24px' }} />
            全部订单
        </Card.Grid>
        <Card.Grid style={gridStyle}>
            <MoneyCollectOutlined style={{ fontSize: '24px' }} />
            待付款
        </Card.Grid>
        <Card.Grid style={gridStyle}>
            <CarOutlined style={{ fontSize: '24px' }} />
            待收货
        </Card.Grid>
        <Card.Grid style={gridStyle}>
            <AccountBookOutlined style={{ fontSize: '24px' }} />
            退款/售后
        </Card.Grid>
    </Card>
);

export default App;
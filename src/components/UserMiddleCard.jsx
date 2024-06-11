import React from 'react';
import { Card } from 'antd';
import {AccountBookOutlined, CarOutlined, FileDoneOutlined, MoneyCollectOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const gridStyle = {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const App = () => {
    const navigate = useNavigate();

    function handleClick(url) {
        navigate(url);
    }

    return (
        <Card>
            <Card.Grid style={gridStyle} onClick={() => handleClick('/orderList')}>
                <FileDoneOutlined style={{fontSize: '24px'}}/>
                全部订单
            </Card.Grid>
            <Card.Grid style={gridStyle}>
                <MoneyCollectOutlined style={{fontSize: '24px'}}/>
                待付款
            </Card.Grid>
            <Card.Grid style={gridStyle} >
                <CarOutlined style={{fontSize: '24px'}}/>
                待收货
            </Card.Grid>
            <Card.Grid style={gridStyle}>
                <AccountBookOutlined style={{fontSize: '24px'}}/>
                退款/售后
            </Card.Grid>
        </Card>
    );
}

export default App;
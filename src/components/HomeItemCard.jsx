import React from 'react';
import { Card } from 'antd';
import image from "../images/sample.jpg";
import {useNavigate} from "react-router-dom";

const gridStyle = {
    width: '50%',
    height: 300,
    textAlign: 'center',
};

const App = () => {
    const navigate = useNavigate();

    function handleClick(url) {
        navigate(url);
    }

    return (
        <Card >
            <Card.Grid style={gridStyle} onClick={() => handleClick('/detail/1')}>
                <img src={image} alt="img1" style={{width: '100%', height: '100%'}}/>
            </Card.Grid>
            <Card.Grid style={gridStyle} onClick={() => handleClick('/detail/2')}>
                <img src={image} alt="img1" style={{width: '100%', height: '100%'}}/>
            </Card.Grid>
        </Card>
    );
}

export default App;
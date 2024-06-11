import React from 'react';
import { Carousel } from 'antd';
import image from '../images/sample.jpg';

const contentStyle = {
    height: '250px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const App = () => (
    <Carousel autoplay>
        <div>
            <img src={image} alt="img1" style={{width:'100%',height:'250px'}} />
        </div>
        <div>
            <h3 style={contentStyle}>2</h3>
        </div>
        <div>
            <h3 style={contentStyle}>3</h3>
        </div>
        <div>
            <h3 style={contentStyle}>4</h3>
        </div>
    </Carousel>
);
export default App;
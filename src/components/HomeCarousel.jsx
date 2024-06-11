import React from 'react';
import { Carousel } from 'antd';
import img1 from '../static/hot_product_banner.png';
import img2 from '../static/new_product_banner.png'
import img3 from '../static/recommend_brand_banner.png'

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
            <img src={img1} alt="img1" style={{width:'100%',height:'250px'}} />
        </div>
        <div>
            <img src={img2} alt="img1" style={{width: '100%', height: '250px'}}/>
        </div>
        <div>
            <img src={img3} alt="img1" style={{width: '100%', height: '250px'}}/>
        </div>
    </Carousel>
);
export default App;
import BottomNav from '../components/BottomNav';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, useParams, useNavigate } from 'react-router-dom';
import { Menu, Tabs, Layout, Card, List } from 'antd';
import { fetchFirstClassify, fetchSecondClassify, fetchProductDetails } from '../services/ClassifyService';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;


const CategoryPage = () => {

    const [firstClassify, setFirstClassify] = useState([]);
    const [secondClassify, setSecondClassify] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFirstClassify().then(response => setFirstClassify(response.data));
    }, []);

    const handleMenuClick = ({ key }) => {
        fetchSecondClassify(key).then(response => setSecondClassify(response.data));
    };

    const handleCardClick = (id) => {
        navigate(`/categoryDetail/${id}`);
    };

    return (
        <div className="scrollable-content" style={{ display: 'flex', flexDirection: 'row' }}>
            {/* <CategoryMenu onSelect={handleSelectCategory} style={{ flex: 1 }} /> */}
            <Layout>
                <Sider>
                    <Menu mode="inline" onClick={handleMenuClick}>
                        {firstClassify.map(item => (
                            <Menu.Item key={item.id}>
                                {item.classifyname}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout>
                    <Content>
                        <div className="category-content">
                            {secondClassify.map(item => (
                                <Card
                                    key={item.id}
                                    hoverable
                                    cover={<img alt={item.classifyname} src={item.image} />}
                                    onClick={() => handleCardClick(item.id)}
                                >
                                    <Meta title={item.classifyname} />
                                </Card>
                            ))}
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <BottomNav style={{ flex: 0.2 }} />
        </div>
    );
};

export default CategoryPage;
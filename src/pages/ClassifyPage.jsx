import React, { useContext, useEffect, useState } from 'react';
import { Menu, Tabs, Layout } from 'antd';
import { fetchFirstClassify, fetchSecondClassify } from '../services/ClassifyService';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const ClassifyPage = () => {
    const [firstClassify, setFirstClassify] = useState([]);
    const [secondClassify, setSecondClassify] = useState([]);

    useEffect(() => {
        fetchFirstClassify().then(response => setFirstClassify(response.data));
    }, []);

    const handleMenuClick = ({ key }) => {
        fetchSecondClassify(key).then(response => setSecondClassify(response.data));
    };

    return (
        <div className="scrollable-content" style={{ display: 'flex', flexDirection: 'row' }}>
            <Layout>
                <Sider>
                    <Menu
                        mode="inline"
                        onClick={handleMenuClick}
                    >
                        {firstClassify.map(item => (
                            <Menu.Item key={item.id}>
                                {item.classifyname}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout>
                    <Content>
                        <Tabs>
                            {secondClassify.map(item => (
                                <TabPane tab={item.classifyname} key={item.id}>
                                    <div className="category-content">
                                        {/* Add content based on secondClassify */}
                                    </div>
                                </TabPane>
                            ))}
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default ClassifyPage;

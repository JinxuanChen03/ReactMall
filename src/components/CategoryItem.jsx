import React from 'react';
import { Card } from 'antd';
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};
const App = () => (
    <Card >
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
    </Card>
);
export default App;
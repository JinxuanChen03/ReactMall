const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const dbPath = path.resolve(__dirname, 'db.json');

// 中间件来解析 JSON 请求
app.use(bodyParser.json());

// 获取所有商品
app.get('/api/goods', (req, res) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    res.json(db.goods);
  });
});

// 根据ID获取单个商品
app.get('/api/goods/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    const good = db.goods.find(g => g.id === id);
    if (!good) return res.status(404).send('Good not found');
    res.json(good);
  });
});

// 添加新商品
app.post('/api/goods', (req, res) => {
  const newGood = req.body;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    db.goods.push(newGood);
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.status(201).json(newGood);
    });
  });
});

// 更新商品
app.put('/api/goods/:id', (req, res) => {
  const { id } = req.params;
  const updatedGood = req.body;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    const index = db.goods.findIndex(g => g.id === id);
    if (index === -1) return res.status(404).send('Good not found');
    db.goods[index] = updatedGood;
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.json(updatedGood);
    });
  });
});

// 删除商品
app.delete('/api/goods/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    db.goods = db.goods.filter(g => g.id !== id);
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.status(204).send();
    });
  });
});

// 获取所有订单
app.get('/api/orders', (req, res) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    res.json(db.orderInfo);
  });
});

// 根据ID获取单个订单
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    const order = db.orderInfo.find(o => o.id === id);
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
  });
});

// 添加新订单
app.post('/api/orders', (req, res) => {
  const newOrder = req.body;

  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);

    // 找到当前最大的 id
    const maxId = db.orderInfo.reduce((max, order) => Math.max(max, parseInt(order.id, 10)), 0);
    // 为新订单生成新的 id
    newOrder.id = (maxId + 1).toString();

    db.orderInfo.push(newOrder);
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.status(201).json(newOrder);
    });
  });
});

// 更新订单
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const updatedOrder = req.body;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    const index = db.orderInfo.findIndex(o => o.id === id);
    if (index === -1) return res.status(404).send('Order not found');
    db.orderInfo[index] = updatedOrder;
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.json(updatedOrder);
    });
  });
});

// 删除订单
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    db.orderInfo = db.orderInfo.filter(o => o.id !== id);
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.status(204).send();
    });
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

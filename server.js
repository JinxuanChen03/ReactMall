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

// 添加新的 deliveryInfo
app.post('/api/deliveries', (req, res) => {
  const newDelivery = req.body;

  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);

    // 添加新的 deliveryInfo
    db.deliveryInfo.push(newDelivery);
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.status(201).json(newDelivery);
    });
  });
});

// 根据订单ID获取 deliveryInfo
app.get('/api/deliveries/:orderId', (req, res) => {
  const { orderId } = req.params;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    const deliveryInfo = db.deliveryInfo.find(d => d.id === orderId);
    if (!deliveryInfo) return res.status(404).send('Delivery info not found');
    res.json(deliveryInfo);
  });
});

// 更新 deliveryInfo
app.put('/api/deliveries/:orderId', (req, res) => {
  const { orderId } = req.params;
  const updatedDelivery = req.body;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    const index = db.deliveryInfo.findIndex(d => d.id === orderId);
    if (index === -1) return res.status(404).send('Delivery info not found');
    db.deliveryInfo[index] = { ...db.deliveryInfo[index], ...updatedDelivery };
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.json(updatedDelivery);
    });
  });
});

app.get('/api/goods', (req, res) => {
  let { firstClassify } = req.query;
  firstClassify = String(firstClassify); // 将 firstClassify 转换为字符串
  console.log('firstClassify_qwq:', firstClassify); // 打印 firstClassify 的值
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    let goods = db.goods;
    console.log('goods.firstClassify:', goods.firstClassify);
    if (firstClassify)
    {
      goods = goods.filter(g => g.firstClassify === firstClassify);
    }
    res.json(goods);
  });
});

// 添加 receivePerson 的增删改查

// 获取指定用户ID的所有地址
app.get('/api/receivePerson/:userId', (req, res) => {
  const { userId } = req.params;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    const addresses = db.receivePerson.filter(r => r.userId === parseInt(userId, 10));
    res.json(addresses);
  });
});

// 获取指定ID的收货地址
app.get('/api/receivePerson/address/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    const address = db.receivePerson.find(addr => addr.id === id);
    if (!address)
    {
      return res.status(404).send('Address not found');
    }
    res.json(address);
  });
});

// 添加新的 receivePerson
app.post('/api/receivePerson', (req, res) => {
  const newReceivePerson = req.body;

  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);

    // 找到当前最大的 id
    const maxId = db.receivePerson.reduce((max, person) => Math.max(max, parseInt(person.id, 10)), 0);
    // 为新收货人生成新的 id
    newReceivePerson.id = (maxId + 1).toString();

    db.receivePerson.push(newReceivePerson);
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.status(201).json(newReceivePerson);
    });
  });
});

// 更新 receivePerson
app.put('/api/receivePerson/:id', (req, res) => {
  const { id } = req.params;
  const updatedReceivePerson = req.body;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    const index = db.receivePerson.findIndex(r => r.id === id);
    if (index === -1) return res.status(404).send('Receive person not found');
    db.receivePerson[index] = { ...db.receivePerson[index], ...updatedReceivePerson };
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.json(updatedReceivePerson);
    });
  });
});

// 删除 receivePerson
app.delete('/api/receivePerson/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);
    db.receivePerson = db.receivePerson.filter(r => r.id !== id);
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.status(204).send();
    });
  });
});

// 添加新的 orderGood
app.post('/api/orderGoods', (req, res) => {
  const newOrderGood = req.body;

  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const db = JSON.parse(data);

    // 找到当前最大的 id
    const maxId = db.orderGood.reduce((max, orderGood) => Math.max(max, parseInt(orderGood.id, 10)), 0);
    // 为新 orderGood 生成新的 id
    newOrderGood.id = (maxId + 1).toString();

    db.orderGood.push(newOrderGood);
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing file');
      res.status(201).json(newOrderGood);
    });
  });
});




// 启动服务器 node server.js
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

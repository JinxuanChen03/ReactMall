
npx create-react-app demo
npm install react-router react-router-dom


## 1. 基本项目结构

- src: 源代码
    - components: 组件
        - page1:  页面1的组件
            kk
        - page2:  页面2的组件
        - commo    
    - pages: 页面
        - page1: 页面1
        - page2: 页面2
    - utils: 工具

    - service: 服务
      - 
    - app.js
    - index.js 入口文件

## 入口路由配置
1. 规划好页面的路由
2. 在src/pages下创建对应的页面文件夹
3. 在src/pages下创建index.js文件，配置路由


 - /login 登录
 - /home 为首页
 - /category 分类
 - /cart 购物车
 - /user 个人中心
 - /detail 详情页
 - /createOrder 创建订单
 - /pay 支付
 - /orderList 订单列表
 - /orderDetail 订单详情


## 业务逻辑
- userService.js 用户服务
    - login 登录
    - logout 退出
    - getUserInfo 获取用户信息

- goodService.js 商品服务
    - getGoodList 获取商品列表
    - getGoodDetail 获取商品详情
    - getGoodByCategory  

- categoryService.js 分类服务
    - getCategoryList 获取分类列表

- orderService.js 订单服务
    - createOrder 创建订单
    - getOrderList 获取订单列表
    - getOrderDetail 获取订单详情

- cartService.js 购物车服务
    - addCart 添加购物车
    - getCartList 获取购物车列表
    - updateCart 更新购物车
    - deleteCart 删除购物车

- payService.js 支付服务
    - pay 支付

## 业务实体建模
good: {
    id: 1,
    name: '商品1',
    price: 100,
    categoryId: '1',
    img: 'http://www.baidu.com/1.jpg',
}

order: {
    id: 1,
    userId: 1,
    orderNo: '201801010001',
    createTime: '2018-01-01 00:00:00',
    payTime: '2018-01-01 00:00:00',
    status: 0,未支付 1已支付 2发货 3确认收货
    total: 100,
    goods: [
        {
            id: 1,
            count: 1
        }
    ],
}
user: {
    id: 1,
    name: '张三',
    phone: '13888888888',
    address: '北京市朝阳区'
    password: '123456',
}


## 业务里程梳理
### 购买
商品列表页 ->  goodService.getGoodList() 
商品详情页 goodId ->  goodService.getGoodDetail(goodId) 
创建订单 goodId ->  orderId = orderService.createOrder(goodId) 
支付orderId  ->  payService.pay(orderId)
订单详情 支付orderId orderService.getOrderDetail(orderId)





其他流程请自行梳理





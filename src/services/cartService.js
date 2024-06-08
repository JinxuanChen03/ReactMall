// const defaultCart = [
//   {
//     id: 1,
//     userId: 1,
//     goodId: 1,
//     quantity: 2,
//     type: 1,
//     createTime: '2018-01-01 00:00:00',
//   }
// ];
// class CartService {
//   cart = [];

//   constructor() {
//     this._loadData();
//   }

//   // 添加商品到购物车
//   addToCart (userId, goodId, quantity, type) {
//     const existingItem = this.cart.find(item => item.userId === userId && item.goodId === goodId && item.type == type);
//     if (existingItem)
//     {
//       existingItem.quantity += quantity;  // 如果商品已存在，增加数量
//     } else
//     {
//       const maxId = this.cart.reduce((max, item) => Math.max(max, item.id), 0);
//       this.cart.push({
//         id: maxId + 1,
//         userId,
//         goodId,
//         quantity,
//         type
//       });
//     }
//     this._saveData();
//   }

//   // 从购物车中移除商品
//   removeFromCart (userId, goodId) {
//     const index = this.cart.findIndex(item => item.userId === userId && item.goodId === goodId);
//     if (index !== -1)
//     {
//       this.cart.splice(index, 1);
//       this._saveData();
//     }
//   }

//   // 更新购物车中商品的数量
//   updateQuantity (userId, goodId, quantity) {
//     const item = this.cart.find(item => item.userId === userId && item.goodId === goodId);
//     if (item)
//     {
//       item.quantity = quantity;
//       this._saveData();
//     }
//   }

//   // 清空指定用户的购物车
//   clearCart (userId) {
//     this.cart = this.cart.filter(item => item.userId !== userId);
//     this._saveData();
//   }

//   // 获取用户的购物车
//   getCartByUserId (userId) {
//     return this.cart.filter(item => item.userId === userId);
//   }

//   // 将数据存入到localStorage中
//   _saveData () {
//     //localStorage.clear()
//     localStorage.setItem('cart', JSON.stringify(this.cart));
//   }

//   // 从localStorage加载数据
//   _loadData () {
//     const storedCart = localStorage.getItem('cart');
//     this.cart = storedCart ? JSON.parse(storedCart) : defaultCart;
//   }
// }

// const cartService = new CartService();
// export default cartService;
const defaultCart = [
  {
    id: 1,
    userId: 1,
    goodId: 1,
    quantity: 2,
    type: 1,
    createTime: '2018-01-01 00:00:00',
  }
];

class CartService {
  cart = [];

  constructor() {
    this._loadData();
  }

  // 添加商品到购物车
  addToCart(userId, goodId, quantity, type) {
    const existingItem = this.cart.find(item => item.userId === userId && item.goodId === goodId && item.type === type);
    if (existingItem) {
      existingItem.quantity += quantity;  // 如果商品已存在，增加数量
    } else {
      const maxId = this.cart.reduce((max, item) => Math.max(max, item.id), 0);
      this.cart.push({
        id: maxId + 1,
        userId,
        goodId,
        quantity,
        type
      });
    }
    this._saveData();
    console.log('购物车数据添加后:', this.cart); // 添加日志
  }

  // 从购物车中移除商品
  removeFromCart(userId, goodId) {
    const index = this.cart.findIndex(item => item.userId === userId && item.goodId === goodId);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this._saveData();
      console.log('购物车数据删除后:', this.cart); // 添加日志
    }
  }

  // 更新购物车中商品的数量
  updateQuantity(userId, goodId, quantity) {
    const item = this.cart.find(item => item.userId === userId && item.goodId === goodId);
    if (item) {
      item.quantity = quantity;
      this._saveData();
      console.log('购物车数据更新后:', this.cart); // 添加日志
    }
  }

  // 清空指定用户的购物车
  clearCart(userId) {
    this.cart = this.cart.filter(item => item.userId !== userId);
    this._saveData();
    console.log('购物车数据清空后:', this.cart); // 添加日志
  }

  // 获取用户的购物车
  getCartByUserId(userId) {
    const userCart = this.cart.filter(item => item.userId === userId);
    console.log('获取到的用户购物车数据:', userCart); // 添加日志
    return userCart;
  }

  // 将数据存入到localStorage中
  _saveData() {
    // 确保每个条目的 goodId 是一个有效的值而不是对象
    this.cart = this.cart.map(item => {
      if (typeof item.goodId === 'object') {
        item.goodId = item.goodId.id;  // 假设对象有一个 id 属性
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log('数据保存到localStorage:', this.cart); // 添加日志
  }

  // 从localStorage加载数据
  _loadData() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : defaultCart;
    console.log('从localStorage加载的数据:', this.cart); // 添加日志
  }
}

const cartService = new CartService();
export default cartService;

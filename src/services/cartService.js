const defaultCart = [
  {
    id: 1,
    userId: 1,
    goodId: 1,
    quantity: 2,
    price: 50,
    description: "High-quality widget"
  }
];
class CartService {
  cart = [];

  constructor() {
    this._loadData();
  }

  // 添加商品到购物车
  addToCart (userId, goodId, quantity, price, description) {
    const existingItem = this.cart.find(item => item.userId === userId && item.goodId === goodId);
    if (existingItem)
    {
      existingItem.quantity += quantity;  // 如果商品已存在，增加数量
    } else
    {
      const maxId = this.cart.reduce((max, item) => Math.max(max, item.id), 0);
      this.cart.push({
        id: maxId + 1,
        userId,
        goodId,
        quantity,
        price,
        description
      });
    }
    this._saveData();
  }

  // 从购物车中移除商品
  removeFromCart (userId, goodId) {
    const index = this.cart.findIndex(item => item.userId === userId && item.goodId === goodId);
    if (index !== -1)
    {
      this.cart.splice(index, 1);
      this._saveData();
    }
  }

  // 更新购物车中商品的数量
  updateQuantity (userId, goodId, quantity) {
    const item = this.cart.find(item => item.userId === userId && item.goodId === goodId);
    if (item)
    {
      item.quantity = quantity;
      this._saveData();
    }
  }

  // 清空指定用户的购物车
  clearCart (userId) {
    this.cart = this.cart.filter(item => item.userId !== userId);
    this._saveData();
  }

  // 获取用户的购物车
  getCartByUserId (userId) {
    return this.cart.filter(item => item.userId === userId);
  }

  // 将数据存入到localStorage中
  _saveData () {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // 从localStorage加载数据
  _loadData () {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : defaultCart;
  }
}

const cartService = new CartService();
export default cartService;

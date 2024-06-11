import axios from 'axios';

const defaultUsers = [
  {
    id: 1,
    username: 'hyx',
    password: 'MTIz',
    email: 'hyx@example.com',
    phone: '133',
    address: 'hhhhhhh',
    head: "" // 头像，可以考虑添加
  }
];

class UserService {
  users = [];
  currentUser = null; // 保存当前登录的用户信息
  localAddresses = []; // 单独存储用户地址信息

  constructor() {
    this._loadData();
    this._loadAddressesFromLocalStorage();
  }

  // 添加用户
  addUser (username, password, email) {
    const existingUser = this.users.find(user => user.username === username || user.email === email);
    if (existingUser)
    {
      throw new Error('Username or email already exists');
    }
    const maxId = this.users.reduce((max, user) => Math.max(max, user.id), 0);
    const phone = "13326637878937";
    const address = "北京交通大学";
    const head = null;
    const newUser = {
      id: maxId + 1,
      username,
      password, // 密码应进行哈希处理
      email,
      phone,
      address,
      head
    };
    this.users.push(newUser);
    this._saveData();
    return newUser;
  }

  // 删除用户
  removeUser (id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1)
    {
      this.users.splice(index, 1);
      this.localAddresses = this.localAddresses.filter(addr => addr.userId !== id); // 删除用户的所有本地地址信息
      this._saveData();
      this._saveAddressesToLocalStorage();
    }
  }

  // 更新用户信息
  updateUser (id, updateFields) {
    const user = this.users.find(user => user.id === id);
    if (!user)
    {
      throw new Error('User not found');
    }
    Object.assign(user, updateFields);
    this._saveData();
    return user;
  }

  // 获取用户信息
  getUserById (id) {
    return this.users.find(user => user.id === id);
  }

  // 用户登录验证
  validateLogin (username, password) {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user)
    {
      this.currentUser = user; // 登录成功后保存当前用户信息
      this._saveCurrentUser(); // 选择性地保存到 localStorage 或其他存储
    }
    return user !== undefined;
  }

  // 获取当前登录的用户
  getCurrentUser () {
    return this.currentUser;
  }

  // 检查是否有用户当前登录
  isLoggedIn () {
    return this.currentUser !== null;
  }

  // 退出登录
  logout () {
    this.currentUser = null;
    this._saveCurrentUser();
  }

  // 获取指定用户的所有收货地址
  async getReceivePersonByUserId (userId) {
    try
    {
      // 从 API 获取地址信息
      const response = await axios.get(`/api/receivePerson/${userId}`);
      return response.data;
    } catch (error)
    {
      console.error('Error:', error);
      throw error;
    }
  }

  // 获取指定ID的收货地址
  async getReceivePersonById (id) {
    try
    {
      const response = await axios.get(`/api/receivePerson/address/${id}`);
      return response.data;
    } catch (error)
    {
      console.error('Error fetching address:', error);
      throw error;
    }
  }

  // 添加新的收货地址
  async addReceivePerson (receivePerson) {
    try
    {
      // 通过 API 添加新地址
      const response = await axios.post('/api/receivePerson', receivePerson);
      return response.data;
    } catch (error)
    {
      console.error('Error:', error);
      throw error;
    }
  }

  // 更新收货地址
  async updateReceivePerson (id, updatedFields) {
    try
    {
      const response = await axios.put(`/api/receivePerson/${id}`, updatedFields);
      return response.data;
    } catch (error)
    {
      console.error('Error:', error);
      throw error;
    }
  }

  // 删除收货地址
  async deleteReceivePerson (id) {
    try
    {
      await axios.delete(`/api/receivePerson/${id}`);
      return true;
    } catch (error)
    {
      console.error('Error:', error);
      throw error;
    }
  }

  // 获取指定用户的所有本地存储的地址信息
  getLocalAddressesByUserId (userId) {
    return this.localAddresses.filter(addr => addr.userId === userId);
  }

  // 添加本地地址
  addLocalAddress (address) {
    this.localAddresses.push(address);
    this._saveAddressesToLocalStorage();
  }

  // 更新本地地址
  updateLocalAddress (id, updatedFields) {
    this.localAddresses = this.localAddresses.map(addr => (addr.id === id ? { ...addr, ...updatedFields } : addr));
    this._saveAddressesToLocalStorage();
  }

  // 删除本地地址
  deleteLocalAddress (id) {
    this.localAddresses = this.localAddresses.filter(addr => addr.id !== id);
    this._saveAddressesToLocalStorage();
  }

  // 将地址信息保存到localStorage中
  _saveAddressesToLocalStorage () {
    localStorage.setItem('localAddresses', JSON.stringify(this.localAddresses));
  }

  // 从localStorage加载地址信息
  _loadAddressesFromLocalStorage () {
    const storedAddresses = localStorage.getItem('localAddresses');
    this.localAddresses = storedAddresses ? JSON.parse(storedAddresses) : [];
  }

  // 将当前用户数据存入到localStorage中
  _saveCurrentUser () {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  // 从localStorage加载当前用户数据
  _loadCurrentUser () {
    const userData = localStorage.getItem('currentUser');
    this.currentUser = userData ? JSON.parse(userData) : null;
  }

  // 将数据存入到localStorage中
  _saveData () {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  // 从localStorage加载数据
  _loadData () {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : defaultUsers;
    this._loadCurrentUser(); // 确保在加载用户数据时加载当前用户
  }
}

const userService = new UserService();
export default userService;

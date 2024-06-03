const defaultUsers = [
  {
    id: 1,
    username: 'hyx',
    password: 'MTIz',
    email: 'hyx@example.com'
  }
];
class UserService {
  users = [];
  currentUser = null;  // 添加一个属性来保存当前登录的用户信息

  constructor() {
    this._loadData();
  }

  // 添加用户
  addUser (username, password, email) {
    const existingUser = this.users.find(user => user.username === username || user.email === email);
    if (existingUser)
    {
      throw new Error('Username or email already exists');
    }
    const maxId = this.users.reduce((max, user) => Math.max(max, user.id), 0);
    const newUser = {
      id: maxId + 1,
      username,
      password,  // 密码应进行哈希处理
      email
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
      this._saveData();
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
      this.currentUser = user;  // 登录成功后保存当前用户信息
      this._saveCurrentUser();  // 选择性地保存到 localStorage 或其他存储
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
  }
}

const userService = new UserService();
export default userService;

const defaultList = [
  {
    id: 1,
    name: '小米12 Pro 天玑版',
    price: 100,
    categoryId: '1',//类型索引
    buynum: 0,//购买量
    description: "这款小米12 Pro 天玑版手机配备了顶级的天玑9000+处理器和5000万像素的疾速影像摄像头，确保用户能够享受到流畅的操作体验和高清的拍照效果。其2K AMOLED超视感屏幕不仅支持120Hz高刷新率，还具有极佳的视觉效果。配合67W的快充技术和5160mAh的大电池容量，为用户提供了持久的使用时间和快速的充电体验。",
    detail: "这款小米12 Pro 天玑版手机配备了顶级的天玑9000+处理器和5000万像素的疾速影像摄像头，确保用户能够享受到流畅的操作体验和高清的拍照效果。其2K AMOLED超视感屏幕不仅支持120Hz高刷新率，还具有极佳的视觉效果。配合67W的快充技术和5160mAh的大电池容量，为用户提供了持久的使用时间和快速的充电体验。处理器：天玑9000+ 处理器\n摄像头：5000万疾速影像\n显示屏：2K超视感屏 120Hz高刷\n充电：67W快充\n电池容量：5160mAh大电量\n屏幕类型：2K AMOLED超视感屏\n颜色：玄黑",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '基础版', typePrice: 100 },
      { typeid: 2, typeName: '高级版', typePrice: 150 },
      { typeid: 3, typeName: '豪华版', typePrice: 200 }
    ],//不同类型有着不同价格
    img: "cate1.jpg"
  },
  {
    id: 2,
    name: '商品2',
    price: 200,
    categoryId: '2',
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '基础版', typePrice: 100 },
      { typeid: 2, typeName: '高级版', typePrice: 150 },
      { typeid: 3, typeName: '豪华版', typePrice: 200 }
    ],//不同类型有着不同价格
    img: "cate2.jpg",
  },
  {
    id: 3,
    name: '商品3',
    price: 300,
    categoryId: '3',
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '基础版', typePrice: 100 },
      { typeid: 2, typeName: '高级版', typePrice: 150 },
      { typeid: 3, typeName: '豪华版', typePrice: 200 }
    ],//不同类型有着不同价格
    img: "cate3.jpg"
  }
]

class GoodService {
  list = [];

  constructor() {
    this._loadData();
  }

  // 根据id获取单个商品
  getGoodById (id) {
    return this.list.find(item => item.id === id);
  }

  // 获取商品列表
  getGoodList () {
    return this.list;
  }

  // 添加商品
  addGood (good) {
    this.list.push(good);
    this._saveData();
  }

  // 删除商品
  deleteGood (id) {
    this.list = this.list.filter(item => item.id !== id);
    this._saveData();
  }

  // 更新商品
  updateGood (good) {
    this.list = this.list.map(item => {
      if (item.id === good.id)
      {
        return good;
      }
      return item;
    });
    this._saveData();
  }


  // 将数据存入到localstorage中
  _saveData () {
    localStorage.setItem('goodList', JSON.stringify(this.list));
  }

  _loadData () {
    //localStorage.clear()
    const list = localStorage.getItem('goodList');
    if (list)
    {
      this.list = JSON.parse(list);
    } else
    {
      this.list = defaultList;
      this._saveData();
    }
  }
}

const goodService = new GoodService()
export default goodService;
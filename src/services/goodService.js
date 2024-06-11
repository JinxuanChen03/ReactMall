import axios from 'axios';
const defaultList = [
  {
    id: 1,
    name: '小米12 Pro 天玑版',
    price: 2999,
    categoryId: '1',//类型索引//这个是手机数码
    buynum: 0,//购买量
    description: "天玑9000+处理器,5000万像素的疾速影像摄像头,2K AMOLED超视感屏幕,支持120Hz高刷新率,67W的快充技术和5160mAh的大电池容量。",
    detail: "这款小米12 Pro 天玑版手机配备了顶级的天玑9000+处理器和5000万像素的疾速影像摄像头，确保用户能够享受到流畅的操作体验和高清的拍照效果。其2K AMOLED超视感屏幕不仅支持120Hz高刷新率，还具有极佳的视觉效果。配合67W的快充技术和5160mAh的大电池容量，为用户提供了持久的使用时间和快速的充电体验。处理器：天玑9000+ 处理器\n摄像头：5000万疾速影像\n显示屏：2K超视感屏 120Hz高刷\n充电：67W快充\n电池容量：5160mAh大电量\n屏幕类型：2K AMOLED超视感屏\n颜色：玄黑",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '白色 128G', typePrice: 2999 },
      { typeid: 2, typeName: '黑色 128G', typePrice: 2999 },
      { typeid: 3, typeName: '黑色 256G', typePrice: 4999 },
      { typeid: 4, typeName: '白色 256G', typePrice: 4999 },
      { typeid: 5, typeName: '粉色特别款 256G', typePrice: 6999 }
    ],//不同类型有着不同价格
    "img": ["cate1.jpg", "cate2.jpg", "cate3.jpg", "cate4.jpg", "cate5.jpg"],
  },
  {
    id: 2,
    name: '原装正品摩托GP328防爆对讲机',
    price: 200,
    categoryId: '1',
    buynum: 0,
    description: "支持官方查询验货",
    detail: "你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '基础版', typePrice: 100 },
      { typeid: 2, typeName: '高级版', typePrice: 150 },
      { typeid: 3, typeName: '豪华版', typePrice: 200 }
    ],//不同类型有着不同价格
    img: ["cate6.jpg", "cate6.jpg", "cate6.jpg"],
  },
  {
    id: 3,
    name: '花束',
    price: 300,
    categoryId: '2',//花朵
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
    img: ["cate8.jpg", "cate9.jpg", "cate10.jpg"]
  },
  {
    id: 4,
    name: '花束',
    price: 300,
    categoryId: '2',//花朵
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '基础版', typePrice: 100 },
      { typeid: 2, typeName: '高级版', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate11.jpg", "cate12.jpg"]
  },
  {
    id: 5,
    name: '衣服',
    price: 300,
    categoryId: '3',//衣服
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: 'M', typePrice: 100 },
      { typeid: 2, typeName: 'L', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate13.jpg", "cate13.jpg"]
  },
  {
    id: 6,
    name: '衣服',
    price: 300,
    categoryId: '3',//衣服
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: 'M', typePrice: 100 },
      { typeid: 2, typeName: 'L', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate14.jpg", "cate14.jpg"]
  },
  {
    id: 7,
    name: '衣服',
    price: 300,
    categoryId: '3',//衣服
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: 'M', typePrice: 100 },
      { typeid: 2, typeName: 'L', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate15.jpg", "cate15.jpg"]
  },
  {
    id: 8,
    name: '衣服',
    price: 300,
    categoryId: '3',//衣服
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: 'M', typePrice: 100 },
      { typeid: 2, typeName: 'L', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate16.jpg", "cate16.jpg"]
  },
  {
    id: 9,
    name: '衣服',
    price: 300,
    categoryId: '3',//衣服
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: 'M', typePrice: 100 },
      { typeid: 2, typeName: 'L', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate19.jpg", "cate19.jpg"]
  },
  {
    id: 10,
    name: '奶粉',
    price: 300,
    categoryId: '4',//食物？
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '一桶', typePrice: 100 },
      { typeid: 2, typeName: '两桶', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate17.jpg", "cate17.jpg"]
  },
  {
    id: 11,
    name: '果汁',
    price: 300,
    categoryId: '4',//食物？
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '一桶', typePrice: 100 },
      { typeid: 2, typeName: '两桶', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate18.jpg", "cate18.jpg"]
  },
  {
    id: 12,
    name: '宝宝营养快线',
    price: 300,
    categoryId: '4',//食物？
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '一桶', typePrice: 100 },
      { typeid: 2, typeName: '两桶', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate20.jpg", "cate20.jpg"]
  },
  {
    id: 13,
    name: '锅',
    price: 300,
    categoryId: '5',//家用物品
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '一桶', typePrice: 100 },
      { typeid: 2, typeName: '两桶', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate22.jpg", "cate22.jpg"]
  },
  {
    id: 14,
    name: '香蕉玩具',
    price: 300,
    categoryId: '6',//玩具
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '一桶', typePrice: 100 },
      { typeid: 2, typeName: '两桶', typePrice: 150 },
    ],//不同类型有着不同价格
    img: ["cate23.jpg", "cate23.jpg"]
  },
  {
    id: 15,
    name: '可爱袋子',
    price: 30,
    categoryId: '6',//玩具
    buynum: 0,
    description: "hhhhhhhh",
    detail: "hhhhhhhh",
    look: 0,//浏览量
    storage: 100000,//存储量
    types: [
      { typeid: 1, typeName: '一桶', typePrice: 10 },
      { typeid: 2, typeName: '两桶', typePrice: 15 },
    ],//不同类型有着不同价格
    img: ["cate24.jpg", "cate24.jpg"]
  }
]

// class GoodService {
//   list = [];

//   constructor() {
//     this._loadData();
//   }

//   // 根据id获取单个商品
//   getGoodById (id) {
//     return this.list.find(item => item.id === id);
//   }

//   // 获取商品列表
//   getGoodList () {
//     return this.list;
//   }

//   // 添加商品
//   addGood (good) {
//     this.list.push(good);
//     this._saveData();
//   }

//   // 删除商品
//   deleteGood (id) {
//     this.list = this.list.filter(item => item.id !== id);
//     this._saveData();
//   }

//   // 更新商品
//   updateGood (good) {
//     this.list = this.list.map(item => {
//       if (item.id === good.id)
//       {
//         return good;
//       }
//       return item;
//     });
//     this._saveData();
//   }


//   // 将数据存入到localstorage中
//   _saveData () {
//     localStorage.setItem('goodList', JSON.stringify(this.list));
//   }

//   _loadData () {
//     //localStorage.clear()
//     const list = localStorage.getItem('goodList');
//     if (list)
//     {
//       this.list = JSON.parse(list);
//     } else
//     {
//       this.list = defaultList;
//       this._saveData();
//     }
//   }
// }
class GoodService {
  // 获取所有商品
  async getGoodList () {
    try
    {
      const response = await axios.get('/api/goods');
      return response.data.map(this.convertToFrontendFormat);
    } catch (error)
    {
      console.error('Error fetching goods:', error);
      throw error;
    }
  }

  // 根据ID获取单个商品
  async getGoodById (id) {
    try
    {
      const response = await axios.get(`/api/goods/${id}`);
      return this.convertToFrontendFormat(response.data);
    } catch (error)
    {
      console.error(`Error fetching good with ID ${id}:`, error);
      throw error;
    }
  }

  // 模糊搜索商品名称
  async getGoodsByName (name) {
    try {
      console.log('search:', name);
      const response = await axios.get(`/api/goods?name=${name}`);
      console.log("响应数据",response); // 打印请求参数
      const data = response.data;
      console.log('获取的商品数据:', data);
      let correctData =[];
      for (let key in data) {
        console.log(`The value of ${key} is ${data[key].name}`);
        const regex = new RegExp(name, 'i'); // 创建一个新的正则表达式，其中包含用户输入的搜索文本
        if(regex.test(data[key].name)){
          console.log('The value of firstClassify is equal to firstClassify');
          correctData.push(data[key]);
        }
      }
      return correctData;
    } catch (error) {
      console.error('Failed to fetch goods:', error);
      throw error;
    }
  }

  // 添加新商品
  async addGood (good) {
    try
    {
      const dbGood = this.convertToDatabaseFormat(good);
      const response = await axios.post('/api/goods', dbGood);
      return this.convertToFrontendFormat(response.data);
    } catch (error)
    {
      console.error('Error adding good:', error);
      throw error;
    }
  }


  // 更新商品
  async updateGood (id, good) {
    try
    {
      const dbGood = this.convertToDatabaseFormat(good);
      const response = await axios.put(`/api/goods/${id}`, dbGood);
      return this.convertToFrontendFormat(response.data);
    } catch (error)
    {
      console.error(`Error updating good with ID ${id}:`, error);
      throw error;
    }
  }

  // 删除商品
  async deleteGood (id) {
    try
    {
      await axios.delete(`/api/goods/${id}`);
    } catch (error)
    {
      console.error(`Error deleting good with ID ${id}:`, error);
      throw error;
    }
  }

  // 将数据库格式转换为前端格式
  convertToFrontendFormat (dbGood) {
    // 处理图片数组：确保图片数量与 types 数量一致
    let images = Array.isArray(dbGood.image) ? dbGood.image : [dbGood.image];
    if (images.length < dbGood.stockDetails.length)
    {
      // 如果图片数量少于 types 数量，重复最后一张图片以匹配 types 数量
      const additionalImages = new Array(dbGood.stockDetails.length - images.length).fill(images[images.length - 1]);
      images = images.concat(additionalImages);
    } else if (images.length > dbGood.stockDetails.length)
    {
      // 如果图片数量多于 types 数量，截取前面的图片
      images = images.slice(0, dbGood.stockDetails.length);
    }

    return {
      id: dbGood.id,
      name: dbGood.name,
      price: dbGood.price,
      categoryId: dbGood.firstClassify,
      buynum: dbGood.sales,
      description: dbGood.description || "",
      detail: dbGood.detail || "",
      look: dbGood.look || 0,
      storage: dbGood.stock,
      types: dbGood.stockDetails.map((detail, index) => ({
        typeid: index + 1, // 使用索引作为 typeid
        typeName: `${detail.color} ${detail.size}`,
        typePrice: detail.price
      })),
      img: images // 对齐后的图片数组
    };
  }

  // 将前端格式转换为数据库格式
  convertToDatabaseFormat (frontendGood) {
    // 确保每个 type 都有一个对应的图片
    let images = frontendGood.img;
    if (images.length < frontendGood.types.length)
    {
      // 如果图片数量少于 types 数量，重复最后一张图片以匹配 types 数量
      const additionalImages = new Array(frontendGood.types.length - images.length).fill(images[images.length - 1]);
      images = images.concat(additionalImages);
    } else if (images.length > frontendGood.types.length)
    {
      // 如果图片数量多于 types 数量，截取前面的图片
      images = images.slice(0, frontendGood.types.length);
    }

    return {
      id: frontendGood.id,
      name: frontendGood.name,
      price: frontendGood.price,
      firstClassify: frontendGood.categoryId,
      sales: frontendGood.buynum,
      description: frontendGood.description,
      detail: frontendGood.detail,
      look: frontendGood.look,
      stock: frontendGood.storage,
      stockDetails: frontendGood.types.map((type, index) => ({
        color: type.typeName.split(' ')[0], // 假设颜色是类型名称中的第一个单词
        size: type.typeName.split(' ')[1], // 假设大小是类型名称中的第二个单词
        price: type.typePrice,
        stock: frontendGood.storage, // 假设 stock 是相同的库存量
        sku: Math.random().toString(36).substring(2, 15) // 生成一个随机的 SKU 作为示例
      })),
      image: images // 对齐后的图片数组
    };
  }
}
const goodService = new GoodService()
export default goodService;
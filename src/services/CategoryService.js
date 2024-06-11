// 如果你使用的是自定义的 API 调用服务
import axios from "axios";

const CategoryService = {
    good: {
        getGoodsByClassify: async (firstClassify) => {
            try {
                console.log('firstClassify:', firstClassify);
                const response = await axios.get(`/api/goods?firstClassify=${firstClassify}`);
                console.log("响应数据",response); // 打印请求参数
                const data = response.data;
                console.log('获取的商品数据:', data);
                let correctData =[];
                for (let key in data) {
                    console.log(`The value of ${key} is ${data[key].firstClassify}`);
                    if(data[key].firstClassify === firstClassify){
                        console.log('The value of firstClassify is equal to firstClassify');
                        correctData.push(data[key]);
                    }
                }
                return correctData;
            } catch (error) {
                console.error('Failed to fetch goods:', error);
                throw error;
            }
        },
    },
};

export default CategoryService;
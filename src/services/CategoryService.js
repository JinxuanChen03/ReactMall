// 如果你使用的是自定义的 API 调用服务
import axios from "axios";

const CategoryService = {
    good: {
        getGoodsByClassify: async (firstClassify) => {
            try {
                // 在这里替换为你的实际 API 调用
                // const response = await fetch(`/api/goods?firstClassify=${firstClassify}`);
                const response = await axios.get(`/api/goods?firstClassify=${firstClassify}`);
                console.log("响应数据",response); // 打印请求参数
                const data = response.data;
                console.log('获取的商品数据:', data);
                return data;
            } catch (error) {
                console.error('Failed to fetch goods:', error);
                throw error;
            }
        },
    },
};

export default CategoryService;
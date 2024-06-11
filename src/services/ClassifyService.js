// const defaultFirstClassify = [];
// const defaultSecondClassify = [];

// class ClassifyService {

//     async getFirstClassify() {
//         try {
//             const response = await axios.get('/api/firstClassify');
//             return response.data.map(this.convertToFrontendFormat);
//         } catch (error) {
//             console.error('Error fetching goods:', error);
//             throw error;
//         }
//     }

//     // 根据id获取二级菜单
//     async getSecondClassify(id) {
//         try {
//             const response = await axios.get(`/api/secondClassify/${id}`);
//             return response.data.map(this.convertToFrontendFormat);
//         } catch (error) {
//             console.error('Error fetching goods:', error);
//             throw error;
//         }
//     }
// }

// const classifyService = new classifyService()
// export default classifyService;


import axios from 'axios';

export const fetchFirstClassify = () => {
    return axios.get('/api/firstClassify');
};

export const fetchSecondClassify = (lastGrade) => {
    return axios.get(`/api/secondClassify/${lastGrade}`);
};

export const fetchClassifyProductDetails = (categoryId) => {
    return axios.get(`/api/classifyProduct/${categoryId}`);
};
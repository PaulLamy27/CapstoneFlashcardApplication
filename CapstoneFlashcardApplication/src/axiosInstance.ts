import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: 'https://capstone-flashcard-api.vercel.app/'
// });

const axiosInstance = axios.create({
    baseURL: 'https://capstone-flashcard-api.vercel.app'
    // baseURL: 'http://localhost:5000'
});

export default axiosInstance;
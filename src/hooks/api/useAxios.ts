
import axios from 'axios';
import { ApiHead } from '../../configs/envConfig';


export const useAxios = () => {


    // const user = useUser()


    const axiosConfig = {
        baseURL: ApiHead,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${''}`,
     
        },
    };

    const axiosInstance = axios.create(axiosConfig);

    const interceptor = axiosInstance.interceptors.response.use(
        response => response,
        async error => {

            if (error.response.status == 401 || error.response?.data?.status === 401) {
                axiosInstance.interceptors.response.eject(interceptor);
                // logout()
            } else {
                // errorHandler(error)
            }

            return Promise.reject(error);
        },
    );
    return axiosInstance;
};
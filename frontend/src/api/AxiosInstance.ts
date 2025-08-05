import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const reissueAccessToken = async() =>{
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    if(!refreshToken) throw new Error('RefreshToken이 존재하지 않습니다.');

    const res = await axios.post('http://10.0.2.2:8082/api/auth/refresh', 
        {}, //body -> null
        {
            headers: {
                'Refresh-Token': refreshToken
            }
        });
    const newAccessToken = res.data.accessToken;

    await EncryptedStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
}


const api = axios.create({
    baseURL : 'http://10.0.2.2:8082/api',
    timeout: 5000,
    headers : {
        'Content-Type': 'application/json',
    },
});

//요청 인터셉터 : 토큰 자동 추가
api.interceptors.request.use(
    async(config) =>{
        const token = await EncryptedStorage.getItem('accessToken');

        if(token) {
            config.headers.Authorization= `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


//응답 인터셉터 : 에러 처리 
api.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry ){
            originalRequest._retry = true;
            try{
                const newAccessToken = await reissueAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }catch(err) {
                await EncryptedStorage.clear();
                return Promise.reject(err);
            }
        }else if(error.code === 'ECONNABORTED' && error.message.includes('timeout')){
            return Promise.reject(new Error('요청 시간이 초과되었습니다.'));
        }
        return Promise.reject(error);
    }
);

export default api;
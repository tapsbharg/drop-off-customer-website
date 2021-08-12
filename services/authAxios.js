import axios from "axios";
import {reactLocalStorage} from 'reactjs-localstorage';

const baseURL = 'ROOT_URL';
const authAxios = axios.create();
authAxios.interceptors.request.use((config) => {   

    let token = reactLocalStorage.get('token');
    let headers = {
        'baseURL':baseURL,
        'Content-Type': 'application/json',
        'x-access-token': token
        // x-access-token
    }
    config.headers = headers;   
    return config;
}, (error) => {
    console.log('reqErrr',error);
    return Promise.reject(error);
});

// 401 Logout
// rest return 
/* authAxios.interceptors.response.use((response) => {
    
    if (response.status >= 201 && response.status < 300) {
        reactLocalStorage.remove('token');
        reactLocalStorage.remove('user');
        window.location='/login'  //  Subayan;s hisotry service 
        
    }else{
        return response;
    }
}, (error) => {
    console.log('resErrr',error);
    return Promise.reject(error);
}); */

authAxios.interceptors.response.use((response) => {
    return response;
},(error) => {
    console.log(error.response.data.message)
    return Promise.reject(error);
});
authAxios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
    if(err.response.status === 401){
        reactLocalStorage.clear('token');
        window.location='/login'
    }
    return Promise.reject(err); 
})

export default authAxios;
import axios from "axios";
import { toast } from "react-toastify";
import {reactLocalStorage} from 'reactjs-localstorage';

const baseURL = 'ROOT_URL';
const authAxios = axios.create();
authAxios.interceptors.request.use((config) => {  
    // config.loader == false ? null : document.body.className = 'loading_page';
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
        window.location='/sign-in'  //  Subayan;s hisotry service 
        
    }else{
        return response;
    }
}, (error) => {
    console.log('resErrr',error);
    return Promise.reject(error);
}); */
const errorshow = (err) =>{
    console.log(err.response.data.message)
    toast.error(err.response.data.message)
    return err.response.data.message
  }
authAxios.interceptors.response.use((response) => {
    // document.body.className = document.body.className.replace("loading_page","");
    return response;
},(error) => {
    // document.body.className = document.body.className.replace("loading_page","");    
    // return Promise.reject(error);
    return errorshow(error)
});
authAxios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
    if(err.response.status === 401){
        reactLocalStorage.clear('token');
        window.location='/sign-in'
    }
    // return Promise.reject(err); 
    return errorshow(err)
})

export default authAxios;
import axios from "axios";

import {reactLocalStorage} from 'reactjs-localstorage';


const bodyAnimation = (type, loader)=>{
    if(type == 'add' && loader){
        document.body.className = 'loading_page';
    }else if(type == 'remove' && loader){
        document.body.className = document.body.className.replace("loading_page","");
    }
}

const baseURL = 'ROOT_URL';
const authAxios = axios.create();
authAxios.interceptors.request.use((config) => {  
    bodyAnimation('add', config.loader);
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
    if(err.response.status === 401){
        reactLocalStorage.clear('token');
        window.location='/sign-in'
    }
    // return err.response.data.message
  }
authAxios.interceptors.response.use((response) => {
    bodyAnimation('remove', response.config.loader)
    return response;
},(error) => {
    // document.body.className = document.body.className.replace("loading_page","");  
    bodyAnimation('remove', error.response.config.loader)  
    errorshow(error)
    return Promise.reject(error);
});
authAxios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
    bodyAnimation('remove', err.response.config.loader)
    errorshow(err)
    return Promise.reject(err); 
})

export default authAxios;
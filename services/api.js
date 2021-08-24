import authAxios from "../services/authAxios";
import UnauthAxios from "../services/unauthAxios";
import ROOT_URL from "./api-url";
/* if(window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1'){
    console.log(1);
    ROOT_URL ='http://staging.alphonic.net.in:6002/api/v1/v'
}else{
    // TODO: Server API URL
    // ROOT_URL ='https://jsonplaceholder.typicode.com'
    console.log(2);
} */
const apiFunc = {
  refreshToken: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/users/token/refresh`,
    }).catch((err) => {
      console.log(err);
    }),
  getProfileData: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/users/profile`,
    }).catch((err) => {
      console.log(err);
    }),
  postUpload: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/upload`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  postProfileImage: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/profileImage`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  getDashboardData: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/dashboard?lat=36.19040274808616&lng=-101.19938638888843`,
    }).catch((err) => {
      console.log(err);
    }),
  searchProductData: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/searchProducts?lat=36.19940274808616&lng=-101.19988638888843`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  vendorProductData: (vendorId) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/vendorProductListing/${vendorId}`,
    }).catch((err) => {
      console.log(err);
    }),
    addTocart: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/user/addToCart/${data.vendorId}`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  cartListData: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/user/cartlist`,
    }).catch((err) => {
      console.log(err);
    }),
};

export default apiFunc;

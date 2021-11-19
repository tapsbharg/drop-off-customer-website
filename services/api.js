import authAxios from "../services/authAxios";
import UnauthAxios from "../services/unauthAxios";
import ROOT_URL from "./api-url";
import letlong from "./letlong";
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
      loader:false,
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
    
    postChangePassword: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/change_password`,
      data: data,
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
    postProfileUpdate: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/profileUpdate`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  getDashboardData: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/dashboard?lat=${letlong.let}&lng=${letlong.lng}`,
    }).catch((err) => {
      console.log(err);
    }),
  searchProductData: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/searchProducts?lat=${letlong.let}&lng=${letlong.lng}`,
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
    getVendor: (vendorId) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/vendor/${vendorId}`,
    }).catch((err) => {
      console.log(err);
    }),
    addTocart: (data, prodId) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/user/addToCart/${prodId}`,
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
    deleteCartData: (id) =>
    authAxios({
      method: "DELETE",
      url: `${ROOT_URL}/user/deleteCart/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    deleteCartDataAll: () =>
    authAxios({
      method: "DELETE",
      url: `${ROOT_URL}/user/deleteWholeCart`,
    }).catch((err) => {
      console.log(err);
    }),
    deleteGuestCartAll: (id) =>
    authAxios({
      method: "DELETE",
      url: `${ROOT_URL}/guest/clearCart/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    guestid: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/guest/guestid`,
    }).catch((err) => {
      console.log(err);
    }),
    addTocartGuest: (data,prodId) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/guest/addToCart/${prodId}`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    cartListGuest: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/guest/cartlist/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    userCartMerge: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/user/mergeCart/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    getAllCard: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/viewAllCards`,
    }).catch((err) => {
      console.log(err);
    }),
    addNewCard: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/addNewCard`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    setDefaultCard: (id) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/setDefaultCard/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    deleteCard: (id) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/deleteCard/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    placeOrder: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/charge`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    getOrdersAll: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/order/products`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    getOrderById: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/order/product/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    getFaqs: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/faqs`,
    }).catch((err) => {
      console.log(err);
    }),
    getTerms: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/terms-and-conditions/getAll`,
    }).catch((err) => {
      console.log(err);
    }),
    getPrivacy: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/privacy-policy/getAll`,
    }).catch((err) => {
      console.log(err);
    }),
    getCancellationPolicy: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/cancellation-policy/getAll`,
    }).catch((err) => {
      console.log(err);
    }),
    helpdesk: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/helpdesk/insert`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    getHelpdeskActive: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/helpdesk/active/pagin`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    getHelpdeskClose: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/helpdesk/closed/pagin`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    addNewAddress: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/address`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    defaultAddress: (id) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/setDefault/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    preference: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/preference`,
    }).catch((err) => {
      console.log(err);
    }),
    orderCharges: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/ordeSettings/getAll`,
    }).catch((err) => {
      console.log(err);
    }),
    distanceCalculate: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/distanceCalculate`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
};

export default apiFunc;

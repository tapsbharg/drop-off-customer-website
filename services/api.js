
import authAxios from "../services/authAxios";
import UnauthAxios from "../services/unauthAxios";
import ROOT_URL from "./api-url";
import { toast } from "react-toastify";
import common from "./common";
import { reactLocalStorage } from "reactjs-localstorage";
/* if(window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1'){
    console.log(1);
    ROOT_URL ='http://staging.alphonic.net.in:6002/api/v1/v'
}else{
    // TODO: Server API URL
    // ROOT_URL ='https://jsonplaceholder.typicode.com'
    console.log(2);
} */
const errorshow = (err) =>{
  let errHndle = err.response != undefined ? true : false
  if(errHndle){
    console.log(err.response)
    console.log(err.response.data.message)
    toast.error(err.response.data.message)
  }    
  // return err.response.data.message
}
const letlong = () =>{
  common.coordinateLocal();
  let geoL = reactLocalStorage.get('geoLocal');
  let token = reactLocalStorage.get('token');
  let coords={
    lat: 0,
    lng: 0
  };
  if(geoL && !token){
    coords = JSON.parse(geoL)
  }else if(token){
    geoL = reactLocalStorage.get('geoServer');
    coords = JSON.parse(geoL)
  }
  // return common.coordinate()
  return {
    let:coords.lat || 0,
    lng:coords.lng || 0
  }
}
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
      loader:true,
    }).catch((err) => {
      console.log(err);
    }),
    
    postChangePassword: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/change_password`,
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  postUpload: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/upload`,
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  postProfileImage: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/profileImage`,
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    postProfileUpdate: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/profileUpdate`,
      loader:true,
      data: data,
    }).catch((err) => {
      errorshow(err)
    }),
  getDashboardData: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/dashboard?lat=${letlong().let}&lng=${letlong().lng}`,
    }).catch((err) => {
      console.log(err);
    }),
  searchProductData: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/searchProducts?lat=${letlong().let}&lng=${letlong().lng}`,
      loader:true,
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
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  cartListData: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/user/cartlist`,
      loader:true,
    }).catch((err) => {
      console.log(err);
    }),
    deleteCartData: (id) =>
    authAxios({
      method: "DELETE",
      url: `${ROOT_URL}/user/deleteCart/${id}`,
      loader:true,
    }).catch((err) => {
      console.log(err);
    }),
    deleteCartDataAll: () =>
    authAxios({
      method: "DELETE",
      url: `${ROOT_URL}/user/deleteWholeCart`,
      loader:true,
    }).catch((err) => {
      console.log(err);
    }),
    deleteGuestCartAll: (id) =>
    authAxios({
      method: "DELETE",
      url: `${ROOT_URL}/guest/clearCart/${id}`,
      loader:true,
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
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    cartListGuest: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/guest/cartlist/${id}`,
      loader:true,
    }).catch((err) => {
      console.log(err);
    }),
    userCartMerge: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/user/mergeCart/${id}`,
      loader:true,
    }).catch((err) => {
      console.log(err);
    }),
    getAllCard: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/viewAllCards`,
      loader:true,
    }).catch((err) => {
      console.log(err);
    }),
    addNewCard: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/addNewCard`,
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    setDefaultCard: (id) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/setDefaultCard/${id}`,
      loader:true,
    }).catch((err) => {
      console.log(err);
    }),
    deleteCard: (id) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/deleteCard/${id}`,
      loader:true,
    }).catch((err) => {
      console.log(err);
    }),
    placeOrder: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/charge`,
      loader:true,
      data: data,
    }).catch((err) => {
      errorshow(err)
    }),
    getOrdersAll: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/order/products`,
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    getOrderById: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/order/product/${id}`,
      loader:true,
    }).catch((err) => {
      console.log(err);
    }),
    getFaqs: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/faqs`,
      loader:true,
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
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    getHelpdeskActive: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/helpdesk/active/pagin`,
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    getHelpdeskByid: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/helpdesk/${id}`,
    }),
    getHelpChatData: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/getReplytoTicket/${id}`,
      loader:true,
    }),
    helpChatReply: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/replytoTicket`,
      loader:true,
      data: data,
    }),
    getHelpdeskClose: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/helpdesk/closed/pagin`,
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    addNewAddress: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/address`,
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    editAddress: (data,id) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/addressUpdate/${id}`,
      loader:true,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    defaultAddress: (id) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/setDefault/${id}`,
      loader:true,
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
    inStock: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/order/productsInStock/check`,
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
    updateUserDoc: (name,data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/users/update/${name}`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    couponIsvalid: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/coupon/isValid`,
      data: data,
    })
};

export default apiFunc;

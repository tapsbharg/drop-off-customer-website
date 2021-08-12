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
  getStoreType: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/vendorCategory/getAll`,
    }).catch((err) => {
      console.log(err);
    }),
  postProfileData: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/update/ownProfile`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  postUploadCOE: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/update/coe`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  postUploadLicense: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/update/license`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  postProfileImage: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/update/profileImage`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  postBannerImage: (data) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/update/coverImage`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
  postProfileWebPasswordChange: (postData) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/change_password`,
      data: postData,
    }).catch((err) => {
      Promise.reject(err);
      console.log(err);
    }),

  postAvailableStatus: (postData) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/update/available`,
      data: postData,
    }).catch((err) => Promise.reject(err)),

  postProfileAppPasswordChange: (postData) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/change_app_password`,
      data: postData,
    }).catch((error) => {
      console.log(error);
      return Promise.reject(error);
    }),
};

export default apiFunc;

import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

const common = {
  loader : (type) => {
    if(type){
      document.body.className = 'loading_page';
    }else{
      document.body.className = document.body.className.replace("loading_page","");
    }
  },
  base64Mime:(encoded)=> {
      var result = null;
      if (typeof encoded !== 'string') {
        return result;
      }
      var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
      if (mime && mime.length) {
        result = mime[1];
      }
      return result;
  },
  base64ReadFile : (base64String) => {
    var nonBlob = base64String==undefined?0:base64String.length;
    var filetype = common.base64Mime(base64String)
    var datass={size:nonBlob/1000, type:filetype}
    return datass;
  },
  previewURL : (file) => {
    let URL = '';
    if(file != ''){
      URL = window.URL.createObjectURL(file)
    }
      return URL;
  },
  mineTypeValidate : (value) => {
    if(value == undefined || value == null){
        return false;
    }
    let fileType = value.type;
    return value && (
      fileType === "image/jpeg" ||
      fileType === "image/bmp" ||
      fileType === "image/png"/* ||
      fileType === 'application/pdf' ||
      fileType === "application/msword" */
    )
  },
  fileSizeValidate : (value, size) => {
    if(value == undefined || value == null){
        return false;
    }
    let fileSize = value.size
    if(!fileSize){
      fileSize == 2
    }
    let mb = fileSize * 1024;
    return fileSize <=  mb
  },
  getMiles:(i)=> {
    return (i*0.000621371192).toFixed(1);
  },
  coupanTypeDiscount:(obj)=> {
    let ctype = obj.couponType || 0;
    let price = obj.price || 0;
    let discount = obj.discount || 0;
    let minAmount = obj.minAmount || 0;
    let disUpto = obj.disUpto || 0;
    let disRate = 0;
    if(ctype == "FLAT PERCENT") {
      disRate = price >= minAmount ? (price * discount) / 100 : disRate;
    }else if (ctype == "FLAT PERCENT UPTO") {
      disRate = price >= minAmount ? (price * discount) / 100 : disRate;
      disRate = disRate <= disUpto ? disRate : disUpto;
      console.log('FLAT PERCENT UPTO', disRate)
    }else if (ctype == "CASH DISCOUNT UPTO") {
      disRate = price >= minAmount ? discount : disRate;
      disRate = disRate <= disUpto ? disRate : disUpto;
      console.log('CASH DISCOUNT UPTO', disRate)
    }
    return parseFloat(disRate.toFixed(2));
  },
  isMobile:(num)=>{
    var isphone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(num);
    return isphone;
  },
  coordinateLocal : ()=>{
    let coordataL;
    function asignData(data){
      coordataL = data
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      let jsonCoords = {
        lat:lat,
        lng:lng
      }
      jsonCoords = JSON.stringify(jsonCoords);
      asignData(jsonCoords)
      reactLocalStorage.set('geoLocal', jsonCoords);
    })
    // console.log('coordataL', coordataL)
  },
  creditCardType : (cardType) =>{
    let imageUrl;
    cardType = cardType.toLowerCase();
    switch (cardType) {
      case "visa":
        imageUrl = "card-logo-visa.svg";
        break;
      case "mastercard":
        imageUrl = "card-logo-mastercard.svg";
        break;
      case "american-express":
        imageUrl = "card-logo-amex.svg";
        break;
      default:
        imageUrl = "card-logo-unknown.svg";
    }
    return imageUrl;
  }
}

export default common
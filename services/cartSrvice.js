import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import apiFunc from "./api";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { reactLocalStorage } from "reactjs-localstorage";
const cartService = {
     addToCart : async(prodId, vendId,props) => {
        let vendorData = props.cartData.vendor;
        if(vendorData._id != undefined && (vendorData._id !=vendId)){

            await confirmAlert({
                title: "Are you sure ?",
                message: "You have choose different vendor's product, You want to replace cart.",
                buttons: [
                  {
                    label: 'Confirm',
                    onClick: async() => {
                        let userid = reactLocalStorage.get('userId');
                        let  guestId = reactLocalStorage.get("guestid");
                        if(userid != undefined){
                            await cartService.clearCartCart();
                        }else{
                            await cartService.clearCartCartGuest(guestId);
                        }
                        await cartService.addcartFunc(prodId, vendId, vendorData);
                        props.getCart();
                    }
                  },
                  {
                    label: 'Cancel',
                    // onClick: () => alert('Click No')
                  }
                ]
              });
        }else{
            await cartService.addcartFunc(prodId, vendId, vendorData);
            props.getCart()
        }
        return true
    },
    addcartFunc : async(prodId, vendId, vendorData) => {
        let  guestId = reactLocalStorage.get("guestid");
        if(!guestId){
            const cartData={
                "vendorId": vendId,
                "quantity": 1
            }
            await apiFunc.addTocart(cartData,prodId).then((res)=>{
                // props.getCart()
            }).catch((error)=>{
                toast.error(error.message);
                console.log(error);
            })
        }
        else{
            const cartData={
                "guestId":guestId,
                "vendorId": vendId,
                "quantity": 1
            }
            await apiFunc.addTocartGuest(cartData,prodId).then((res)=>{
                // setProductList(res.data.data)
                // props.getCart()
                // toast.success(res.data.message);
            }).catch((error)=>{
                var message = JSON.parse(error.request.response).message;
                toast.error(message);
            })
        }
    },
    removeToCart : async(prodId, vendId, props) => {
        let  guestId = reactLocalStorage.get("guestid");
        if(!guestId){
            var cartDataDelete={
                "vendorId": vendId,
                "quantity": -1
            }
            await apiFunc.addTocart(cartDataDelete,prodId).then((res)=>{
                // setProductList(res.data.data)
                props.getCart()
                return true;
            }).catch((error)=>{
                console.log(error);
            })
        }
        else{
            var cartDataDelete={
                "guestId":guestId,
                "vendorId": vendId,
                "quantity": -1
            }
            await apiFunc.addTocartGuest(cartDataDelete,prodId).then((res)=>{
                // setProductList(res.data.data)
                props.getCart()
                return true;
            }).catch((error)=>{
                console.log(error);
            })
        }
        
    },
    clearCartCart : async(id) => {
        await apiFunc.deleteCartDataAll().then((res)=>{
            // console.log(id)
        }).catch((error)=>{
            toast.error(error.message);
            console.log(error);
        }) 
    },
    clearCartCartGuest : async(id) => {
        await apiFunc.deleteGuestCartAll(id).then((res)=>{
            // console.log(id)
        }).catch((error)=>{
            toast.error(error.message);
            console.log(error);
        })  
    },
}

export default cartService;
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import Link from "next/link";
import AuthLayout from "../components/authLayout";
import apiFunc from "../services/api";
import { toast, ToastContainer } from "react-toastify";
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
import SplitFormCheckout from "../components/cardsComp";
import AddressComp from "../components/addressComp";
import CouponComp from "../components/checkout/coupon";
import EmptyCart from "../components/emptyCart";
import cartService from "../services/cartSrvice";
import common from "../services/common";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { UserContext } from "../components/context/locationContext";
import ProductList from "../components/checkout/productList";
import Prescriptions from "../components/checkout/prescriptions";
import ScheduleDate from "../components/checkout/scheduleDate";
import OrderSummery from "../components/checkout/orderSummery";
import SplitForm from "../components/stripe-card";

export default function CheckoutPage(props) {
    
    const [stocktatus,setStockStatus]=useState(false)

    const context = useContext(UserContext);
    //order status
    const [orderMsgModal,setOrderMsgModal]=useState(false);
    
    //after order
    const [orderData,setOrderData]=useState(null);
    const [orderTotal,setOrderTotal]=useState({
        subTotal :0.00,
        referralDiscount:0.00,
        maxReferalDisocunt:0.00,
        couponDeduction:0.00,
        serviceFee:0.00,
        deliveryAmount:0.00,
        serviceFeePercent:0.00,
        deliveryBasePrice:0.00,
        deliveryPerMileCharge:0.00,
        deliveryDistanceInMiles:0,
        scheduleDate:"",
        couponId:"",
        addressId:"",
        prescriptionImage:"",
        grandTotal:0,
    });

    const orderMsgModalFunc = (type) =>{
        setOrderMsgModal(type)
    }

    
    // order charges 
    function orderCharges(){
        apiFunc.orderCharges().then((res)=>{
            let orderChrg={
                deliveryPerMileCharge:res.data.data.per_mile_charge,
                deliveryBasePrice:res.data.data.driver_base_charge,
                serviceFeePercent:res.data.data.service_charge_percentage,
                maxReferalDisocunt:res.data.data.maxReferralDiscount,
            }
            context.setSetigns(orderChrg);
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        orderCharges();
    },[])

    async function cartTotalAmout(data){
        common.loader(true)
        var total=0;
        if(data){
            for (var i=0; i < data.cart.length; i++) {
                if(data.cart[i].productId){
                    total += data.cart[i].quantity * data.cart[i].productId.price
                }
            }
        }
        let subTotal  = parseFloat(total);
        let serviceFee = parseFloat(((total * context.settings.serviceFeePercent) / 100));
        let serviceFeePercent = context.settings.serviceFeePercent || 0;
        let deliveryAmount = parseFloat(((context.settings.deliveryPerMileCharge * context.totalMiles) + context.settings.deliveryBasePrice));
        // let referralDiscount = parseFloat(orderTotal.referralDiscount);
        let maxReferalDisocunt = context.settings.maxReferalDisocunt || 0.00 ;
        let referralDiscount = context.profile?.balance > context.settings.maxReferalDisocunt ? context.settings.maxReferalDisocunt : context.profile?.balance || 0.00 ;
        // console.log(referralDiscount, context.profile?.balance, chargess.referralDiscount)
        let couponObj = {
            ...context.couponData,
            price:subTotal
        }
        let couponDeduction = common.coupanTypeDiscount(couponObj) || 0;
        let deliveryBasePrice = context.settings.deliveryBasePrice || 0;
        let grandTotal = (parseFloat((parseFloat(total) + parseFloat(serviceFee) + parseFloat(deliveryAmount))) - parseFloat(couponDeduction + referralDiscount));
        
        let addressId = context.addressId || "";
        let cardId = context.cardId || "";
        let prescriptionImage = context.prescription || "";
        let deliveryDistanceInMiles = context.totalMiles || 0
        let couponId = context.couponId || "";
        let scheduleDate = context.orderDate || null
        await setOrderTotal({
            ...orderTotal,
            subTotal :subTotal.toFixed(2) ,
            serviceFee:serviceFee.toFixed(2),
            deliveryAmount:deliveryAmount.toFixed(2),
            couponDeduction:couponDeduction.toFixed(2),
            referralDiscount:referralDiscount.toFixed(2),
            maxReferalDisocunt:maxReferalDisocunt.toFixed(2),
            deliveryBasePrice:deliveryBasePrice.toFixed(2),
            grandTotal:grandTotal.toFixed(2),
            addressId:addressId,
            prescriptionImage:prescriptionImage,
            cardId:cardId,
            deliveryPerMileCharge:context.settings.deliveryPerMileCharge,
            deliveryDistanceInMiles:deliveryDistanceInMiles,
            serviceFeePercent:serviceFeePercent,
            couponId:couponId,
            scheduleDate:scheduleDate,
        });
        common.loader(false)
    }
    useEffect(()=>{
        cartTotalAmout(props.cartData);
    },[context])


    function stockchecker(){
        return apiFunc.inStock().then((res)=>{
            let qtycheck=res.data.data.NotInStockProducts.length >= 1?false:true
            setStockStatus(qtycheck);
            return qtycheck;
        }).catch((error)=>{
            console.log(error);
        })
    }
    async function placeOrder(){
        let stock = await stockchecker();
        // let array = [addressStatus, cardStatus, stock, idcardCheck, prescripCheck];
        if(stock){
            console.log(orderTotal)
            apiFunc.placeOrder(orderTotal).then((res)=>{
                setOrderData(res.data)
                props.getCart();
                orderMsgModalFunc(true);
                context.clearOrderData();
                // toast.success(res);
            }).catch((error)=>{
                console.log(error.response);
            })
        }else{
            toast.error("out of stock");
        }
        /*  */
    }
// console.log(context)



    return (
      <>
      <AuthLayout props={props}>
          {props.cartData && (
              props.cartData.cart.length > 0 ? (
                <div>
                    <div className="checkout py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="summer_outer mb-5">
                                    <ProductList props={props} />
                                    <CouponComp total={orderTotal.subTotal} vendorId={props.cartData.vendor._id}  />
                                    <Prescriptions props={props} />
                                    <ScheduleDate  />
                                    <OrderSummery orderTotal={orderTotal}  />
                                    {
                                        (context.cardId) && 
                                        (context.addressId) &&  
                                        (context.prescripCheck ? (context.prescription ? true :false) : true) &&
                                        (context.idcardCheck ? (context.profile.photoId ? true :false) : true) ? (
                                            <a className="btn cus_btn custom01" onClick={()=>placeOrder()}> Place Order </a>
                                        ):(
                                            <a className="btn cus_btn custom01 disabled"> Place Order </a>
                                        )
                                    }

                                </div>
                            </div>
                            <div className="col-sm-6">
                                <h3> Checkout </h3>   
                                
                                <AddressComp  props={props} />
                                <SplitForm page="checkout" />

                                {/* <PaymentCards/> */}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            ):
                (<EmptyCart/>)
            )}
           
            <Modal
                show={orderMsgModal}
                onHide={()=>{orderMsgModalFunc(false)}}
                backdrop="static"
                keyboard={false}
                className="modal-gray"
                centered
            >
                <div className="order_Confirmed">
                    <div className="order_Confirmed_contant bg-white p-5">
                        {/* <i className="fal fa-times-circle"></i> */}
                        <i className="fas fa-check-circle"></i>
                        {orderData && (
                            <div>
                                <h5>{orderData.message} </h5>
                                <p>Order No : {orderData.data.orderNumber}</p>
                                <Link href={`/order-detail?orderId=${orderData.data._id}`}>
                                    <a className="btn cus_btn custom01 mb-3"> Order Details</a>
                                </Link>
                            </div>
                        )}
                        <Link href="/">
                            <a className="btn cus_btn custom01 mb-3"> Home </a>
                        </Link>
                    </div>
                </div>
            </Modal>
            
            </AuthLayout>
      </>
    )
  }
  
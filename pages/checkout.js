import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import Link from "next/link";
import AuthLayout from "../components/authLayout";
import apiFunc from "../services/api";
import { toast, ToastContainer } from "react-toastify";
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
import SplitForm from "../components/cardsComp";
import AddressComp from "../components/addressComp";
import EmptyCart from "../components/emptyCart";
import cartService from "../services/cartSrvice";
// const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

export default function CheckoutPage(props) {
    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const [couponModal,setCouponModal]=useState(false);
    const [orderMsgModal,setOrderMsgModal]=useState(false);
    const [cardList,setCardList]=useState([]);
    const [cardStatus,setCardStatus]=useState(false);
    const [addressStatus,setAddressStatus]=useState(false);
    const [stocktatus,setStockStatus]=useState(false);
    const [idcardCheck,setIdcardCheck]=useState(false);
    const [prescripCheck,setPrescripCheck]=useState(false);
    const [defaultLatlong,setDefaultLetLong]=useState([]);
    const [totalMiles,setTotalMiles]=useState(null);


    // const [totalAmt,setTotalAmt]=useState(0); 
    const [orderTotal,setOrderTotal]=useState({
        subTotal :0.00,
        referralDeduction:0.00,
        couponDeduction:0.00,
        serviceAmt:0.00,
        deliverAmt:0.00,
        grandTotal:0.00,
        serviceFeePercent:0.00,
        deliveryBasePrice:0.00,
        deliveryPerMileCharge:0.00,
        deliveryDistanceInMiles:0,
        coupon:{},
    });
    const [orderData,setOrderData]=useState(null);

    const addCardModal = (type) =>{
        setWithdrawalModal(type)
    }
    const couponModalFunc = (type) =>{
        setCouponModal(type)
    }
    const orderMsgModalFunc = (type) =>{
        setOrderMsgModal(type)
    }
    
    const cardStatusFuc = (e) =>{
        setCardStatus(e)
    }
    
    
    async function addToCart(prodId,vendId){
        await cartService.addToCart(prodId, vendId, props);
    }
    async function removeToCart(prodId,vendId){
        await cartService.removeToCart(prodId, vendId, props);
    }

    /*card list*/
    
    function cardListingFunc(){
        apiFunc.getAllCard().then((res)=>{
            setCardList(res.data.cardListing)
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        cardListingFunc();
    },[])

    function prescpAndidcard(){
        if(props.cartData){
            props.cartData.cart.map((data, index)=>{
                let idStatus = data.productId.isIdRequired;
                let PresStatus = data.productId.isIdRequired;
                idStatus ? setIdcardCheck(idStatus):false;
                PresStatus ? setPrescripCheck(PresStatus):false;
            })
        }
    }
    useEffect(()=>{
        prescpAndidcard();
    },[props.cartData])

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
        
        if(addressStatus == true){
            if(cardStatus == true){
                if(stock == true){
                    apiFunc.placeOrder(orderTotal).then((res)=>{
                        setOrderData(res.data)
                        props.getCart();
                        orderMsgModalFunc(true)
                        // toast.success(res);
                    }).catch((error)=>{
                        console.log(error.response);
                    })
                }else{
                    toast.error("out of stock");
                }
            }else{
                toast.error("Please select card before submit");
            }
        }else{
            toast.error("Please choose an address");
        }
        /*  */
    }
    function getMiles(i) {
        return (i*0.000621371192).toFixed(1);
    }
    function setLatlongfc(data){
        setDefaultLetLong(data)
    }
    async function orderCharges(data){
        let ordResData=orderTotal;
        if(totalMiles != null){
            ordResData = await apiFunc.orderCharges().then((res)=>{
                let orderChrg={
                    ...orderTotal,
                    deliveryPerMileCharge:res.data.data.per_mile_charge,
                    deliveryBasePrice:res.data.data.driver_base_charge,
                    serviceFeePercent:res.data.data.service_charge_percentage,
                }
                setOrderTotal(orderChrg);
                return orderChrg ;
            }).catch((error)=>{
                console.log(error);
            })
        }
        await cartTotalAmout(data,ordResData);
    }
    
/*     useEffect(()=>{
        orderCharges();
    },[]) */

    async function getDistance(data){
        if(data != null){
            let venderDetail=data.vendor
            if(venderDetail.location && defaultLatlong[1]){
                let postData={
                    originLat: defaultLatlong[1],
                    originLong: defaultLatlong[0],
                    destinationLat: venderDetail.location.coordinates[1],
                    destinationLong: venderDetail.location.coordinates[0],
                    units: "imperial"
                }
                await apiFunc.distanceCalculate(postData).then((res)=>{
                    let resData = res.data.data.rows[0].elements[0].distance;
                    let miles = getMiles(resData?resData.value:0);
                    setTotalMiles(parseFloat(miles));
                }).catch((error)=>{
                    console.log(error);
                }) 
                
            }
        }
        
        
        
    }
    async function cartTotalAmout(data,chargess){
        var total=0;
        if(data){
            for (var i=0; i < data.cart.length; i++) {
                if(data.cart[i].productId){
                    total += data.cart[i].quantity * data.cart[i].productId.price
                }
            }
        }
        let subTotal  = parseFloat(total.toFixed(2));
        let serviceAmt = parseFloat(((total * chargess.serviceFeePercent) / 100).toFixed(2));
        let deliverAmt = parseFloat(((chargess.deliveryPerMileCharge * totalMiles) + chargess.deliveryBasePrice).toFixed(2));
        let grandTotal = parseFloat((parseFloat(total) + parseFloat(serviceAmt) + parseFloat(deliverAmt)).toFixed(2));
        await setOrderTotal({
            ...orderTotal,
            subTotal :subTotal ,
            serviceAmt:serviceAmt,
            deliverAmt:deliverAmt,
            grandTotal:grandTotal,
        });
    }
    
  
    

    useEffect(()=>{
        orderCharges(props.cartData)
    },[props.cartData, defaultLatlong, totalMiles])

    useEffect(()=>{
        getDistance(props.cartData)
    },[defaultLatlong])

  /*   useEffect(()=>{
        cartTotalAmout(props.cartData)
        console.log('s',defaultLatlong)
    },[props.cartData, defaultLatlong, totalMiles])
 */
    
/*     useEffect(()=>{
        cartTotalAmout(props.cartData);
        console.log(totalMiles)
    },[props.cartData,totalMiles]) */
   /*card list*/
    return (
      <>
      <ToastContainer />
      <AuthLayout props={props}>
          {props.cartData && (
              props.cartData.cart.length > 0 ? (
              <div>
                <div className="checkout py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="summer_outer mb-5">
                                    <h3> Summary </h3>   
                                    <div className="summer_box00 bg-light02 rounded-3 p-3 mb-3">
                                        <table className="order_from">
                                            <thead>
                                                <tr>
                                                    <th colSpan="4"> Order From </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {props.cartData && (
                                                <tr>
                                                    <td className="address" colSpan="2"> 
                                                        {props.cartData.vendor.storeName} 
                                                        <span><i className="fas fa-map-marker-alt"></i> {props.cartData.vendor.address}</span> 
                                                    </td>
                                                    <td colSpan="2" align="right"> Upload Your Identity/ Prescriptions </td>
                                                </tr>
                                            )}
                                                {props.cartData && (
                                                    props.cartData.cart.map((data, index)=>(
                                                        data.productId && (
                                                            <tr key={index}>
                                                            <td className="on-off"> 
                                                                <div className={`vegtype ${data.productId.isNonVeg?'non-veg':'veg'}`}></div>
                                                            </td>
                                                            <td className="content">{data.productId.name}</td>
                                                            <td className={`${data.productId.stock < data.quantity?'stockOut':'stockIn'}`}>  
                                                                <div className={`quntityPls show`}>
                                                                    <button type="button" onClick={()=>removeToCart(data.productId._id,data.vendorId._id)} className="qty-minus">-</button>
                                                                    <input type="number" readOnly className="qty" value={data.quantity} />
                                                                    <button type="button" onClick={()=>addToCart(data.productId._id,data.vendorId._id)} className="qty-plus">+</button>
                                                                </div>
                                                                {data.productId.stock < data.quantity && (
                                                                    <div className="text-danger text-center">Out of stock</div>
                                                                )}
                                                            </td>
                                                            <td className="price" > ${data.quantity * data.productId.price} </td>
                                                        </tr> 
                                                        )
                                                            
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div className="summer_box01 bg-light02 rounded-3 p-3 mb-3">
                                        <ul className="d-flex justify-content-between">
                                            <li> Select Coupon Code </li>
                                            <li> <a  onClick={()=>{couponModalFunc(true)}}> View Coupons </a> </li>
                                        </ul>
                                    </div>
                                    <div className="summer_box02 bg-light02 rounded-3 p-3 mb-3">
                                        <ul className="d-flex justify-content-between">
                                            <li> Upload Your ID Card </li>
                                            <li> <a href="#"> Upload </a> </li>
                                        </ul>
                                        <hr/>
                                        <ul className="d-flex justify-content-between">
                                            <li> Upload Your Prescriptions </li>
                                            <li> <a href="#"> Upload </a> </li>
                                        </ul>
                                    </div>
                                    <div className="summer_box03 bg-light02 rounded-3 p-3 mb-3">
                                        <ul className="d-flex justify-content-between">
                                            <li> Schedule Order </li>
                                            <li> <a href="#"> Select Date & Time </a> </li>
                                        </ul>
                                    </div>

                                    <div className="summer_box04 bg-light02 rounded-3 p-3 mb-3">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th colSpan="2">Billing Summary</th>
                                                </tr>
                                            </thead>
                                            <tbody>   
                                                <tr>   
                                                    <td> Sub Total </td>
                                                    <td>${orderTotal.subTotal }</td>
                                                </tr>
                                                <tr>
                                                    <td>Service Fee </td>
                                                    <td>${orderTotal.serviceAmt}</td>
                                                </tr>
                                                <tr>
                                                    <td>Delivery Charge </td>
                                                    <td>${orderTotal.deliverAmt}</td>
                                                </tr>
                                                <tr>
                                                    <td> Referral </td>
                                                    <td>- ${orderTotal.referralDeduction}</td>
                                                </tr>
                                                <tr>
                                                    <td>Coupon (Store) </td>
                                                    <td>- ${orderTotal.couponDeduction}</td>
                                                </tr>
                                                <tr>
                                                    <td>Grand Total </td>
                                                    <td>${orderTotal.grandTotal}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {(addressStatus && cardStatus) && (
                                        <a className="btn cus_btn custom01" onClick={()=>placeOrder()}> Place Order </a>
                                    )}
                                    {(!addressStatus || !cardStatus) && (
                                        <a className="btn cus_btn custom01 disabled"> Place Order </a>
                                    )}

                                </div>
                            </div>
                            <div className="col-sm-6">
                                <h3> Checkout </h3>   

                                
                                <AddressComp selectClass={addressStatus?'selected':''} getLatLong={(val)=>setLatlongfc(val)} addressSelct={(e)=>setAddressStatus(e)} />
                                <SplitForm selectClass={cardStatus?'selected':''} cardSelct={(e)=>cardStatusFuc(e)} />

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
                show={couponModal}
                onHide={()=>{couponModalFunc(false)}}
                backdrop="static"
                keyboard={false}
                className="modal-gray"
                centered
            >
                <div className="apply_coupon">
                    <div className="apply_coupon_contant bg-white p-5 rounded-3">
                        <i className="fal fa-times-circle"  onClick={()=>{couponModalFunc(false)}}></i>
                        <h5> Apply Coupon </h5>
                        <form className="mb-3" action="">
                            <div>
                                <i className="far fa-search"></i>
                                <input type="search" className="form-control" placeholder="Search Item..." aria-label="Search"/> 
                            </div>
                        </form>
                        <div className="coupon_code mb-3">
                            <ul>
                                <li className="off"><b> 50% OFF </b></li>
                                <li className="content">Use code NEW50 to avail this offer</li>
                                <li className="edit">
                                    <a href="#"> Apply </a> 
                                </li>
                            </ul>
                        </div>
                        <div className="coupon_code mb-3">
                            <ul>
                                <li className="off"><b> 50% OFF </b></li>
                                <li className="content">Use code NEW50 to avail this offer</li>
                                <li className="edit">
                                    <a href="#"> Apply </a> 
                                </li>
                            </ul>
                        </div>
                        <div className="coupon_code mb-3">
                            <ul>
                                <li className="off"><b> 50% OFF </b></li>
                                <li className="content">Use code NEW50 to avail this offer</li>
                                <li className="edit">
                                    <a href="#"> Apply </a> 
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>
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
  
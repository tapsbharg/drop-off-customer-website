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
import CouponComp from "../components/coupon";
import EmptyCart from "../components/emptyCart";
import cartService from "../services/cartSrvice";
import common from "../services/common";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
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
    const [prescripCheck,setPrescripCheck]=useState(null);
    const [prescription,setPrescription]=useState(null);
    const [defaultLatlong,setDefaultLetLong]=useState([]);
    const [totalMiles,setTotalMiles]=useState(null);
    const [profileData, SetProfileData]=useState({});
    const [prescrpImage, setPrescrpImage]=useState(null);
    const [orderDate, setOrderDate]=useState();
    const [couponData, setCouponData]=useState(null);
    // const [totalAmt,setTotalAmt]=useState(0); 
    const [orderTotal,setOrderTotal]=useState({
        subTotal :0.00,
        referralDeduction:0.00,
        couponDeduction:0.00,
        serviceFee:0.00,
        deliverAmt:0.00,
        serviceFeePercent:0.00,
        deliveryBasePrice:0.00,
        deliveryPerMileCharge:0.00,
        deliveryDistanceInMiles:0,
        scheduleDate:null,
        couponId:null,
        addressId:null,
        prescriptionImage:null,
        grandTotal:0,
    });
    const [orderData,setOrderData]=useState(null);


    
    function getProfileData(){
        apiFunc.getProfileData().then((res) => {
            SetProfileData(res.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
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

    useEffect(()=>{
        idcardCheck?getProfileData():null
    },[idcardCheck])
 /*    const checkProductRequire = () => {
        let requiredPrp = props.cartData.cart.map((data,index)=>{
            // console.log(data.productId.isIdRequired)
            // console.log(data.productId.isPrescriptionRequired)
            if(data.productId.isIdRequired){

            }
            return true
        })
        console.log(requiredPrp)
    }
    useEffect(()=>{   
        if(props.cartData){
            checkProductRequire();
        }   
        
    },[props.cartData])
 */

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
        
        if(addressStatus){
            if(cardStatus){
                if(stock){
                    console.log(orderTotal)
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
        let subTotal  = parseFloat(total);
        let serviceFee = parseFloat(((total * chargess.serviceFeePercent) / 100));
        let deliverAmt = parseFloat(((chargess.deliveryPerMileCharge * totalMiles) + chargess.deliveryBasePrice));
        let referralDeduction = parseFloat(orderTotal.referralDeduction);
        let couponObj = {
            ...couponData,
            price:subTotal
        }
        console.log(couponObj)
        let couponDeduction = common.coupanTypeDiscount(couponObj) || 0;
        let deliveryBasePrice = chargess.deliveryBasePrice || 0;
        let grandTotal = (parseFloat((parseFloat(total) + parseFloat(serviceFee) + parseFloat(deliverAmt))) - parseFloat(couponDeduction + referralDeduction));
        
        let addressId = addressStatus?addressStatus._id:null || null
        let prescriptionImage = prescription || null
        await setOrderTotal({
            ...orderTotal,
            subTotal :subTotal.toFixed(2) ,
            serviceFee:serviceFee.toFixed(2),
            deliverAmt:deliverAmt.toFixed(2),
            couponDeduction:couponDeduction.toFixed(2),
            referralDeduction:referralDeduction.toFixed(2),
            deliveryBasePrice:deliveryBasePrice.toFixed(2),
            grandTotal:grandTotal.toFixed(2),
            addressId:addressId,
            prescriptionImage:prescriptionImage
        });
    }
    
  
    

    useEffect(()=>{
        orderCharges(props.cartData)
    },[props.cartData, 
        defaultLatlong, 
        totalMiles, 
        couponData, 
        addressStatus,
        prescription])

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
  
    const prescHandleChange = (e)=>{
        var file = e.target.files[0]
        setPrescrpImage(file);
        const formData = new FormData();
        formData.append("coverImage", file);
        apiFunc.postUpload(formData).then(response => {
            setPrescription(response.data.data._id)
        }).catch((error) => {
            toast.success(error)
            console.log(error)
        });
    }
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
                                                                    <input type="text" readOnly className="qty" value={data.quantity} />
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
                                    
                                    <CouponComp total={orderTotal.subTotal} setDataCoupon={(e)=>{
                                        setOrderTotal({
                                            ...orderTotal,
                                            couponId:e.couponObj._id
                                        });
                                        setCouponData(e.couponObj);
                                    }}/>
                                    {
                                        (idcardCheck || prescripCheck)?(
                                            <div className="summer_box02 bg-light02 rounded-3 p-3 mb-3">
                                                {idcardCheck && (
                                                    <>
                                                        {profileData.photoId ? (
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="id_photo">
                                                                        {profileData.photoId && (
                                                                            <img src={profileData.photoId.path} alt=""/>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="id_photo">
                                                                        {profileData.photoId2 && (
                                                                            <img src={profileData.photoId2.path} alt=""/>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ):(
                                                            <ul className="d-flex justify-content-between">
                                                                <li> Upload Your ID Card </li>
                                                                <li> <Link href="/id-card">Upload</Link></li>
                                                            </ul>
                                                        )}
                                                        <hr/>
                                                    </>
                                                    
                                                )}
                                                
                                                {prescripCheck && (
                                                    <>
                                                        {
                                                            prescrpImage && (
                                                                <div>
                                                                    <img src={common.previewURL(prescrpImage)} className="img-fluid" />
                                                                    <hr/>
                                                                </div>
                                                            )
                                                        }
                                                        <ul className="d-flex justify-content-between">
                                                            <li> Upload Your Prescriptions </li>
                                                            <li> <input type="file" className="upload" onChange={(e)=>prescHandleChange(e)}></input> </li>
                                                        </ul>
                                                    </>
                                                )}
                                                
                                                
                                            </div>
                                        ):null
                                    }
                                    
                                    <div className="summer_box03 bg-light02 rounded-3 p-3 mb-3">
                                    
                                        <ul className="d-flex justify-content-between">
                                            <li> Schedule Order </li>
                                            <li> 
                                                <DatePicker 
                                                dateFormat="dd-MMM-yyyy"
                                                placeholder="Select Date & Time"
                                                selected={orderDate} 
                                                minDate={new Date().setDate(new Date().getDate() + 1)}
                                                maxDate={new Date().setDate(new Date().getDate() + 3)}
                                                onChange={date => {
                                                    setOrderDate(date);
                                                    setOrderTotal({
                                                        ...orderTotal,
                                                        scheduleDate:date
                                                    })
                                                }} className="form-control" />
                                            </li>
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
                                                    <td>${orderTotal.serviceFee}</td>
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
  
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import Link from "next/link";
import AuthLayout from "../components/authLayout";
import apiFunc from "../services/api";
import { toast } from "react-toastify";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SplitForm from "../components/cardsComp";
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

export default function CheckoutPage(props) {
    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const [couponModal,setCouponModal]=useState(false);
    const [orderMsgModal,setOrderMsgModal]=useState(false);
    const [cardList,setCardList]=useState([]);
    const addCardModal = (type) =>{
        setWithdrawalModal(type)
    }
    const couponModalFunc = (type) =>{
        setCouponModal(type)
    }
    const orderMsgModalFunc = (type) =>{
        setOrderMsgModal(type)
    }


    function addToCart(_id){
        const cartData={
            "vendorId": _id,
            "quantity": 1
        }
        apiFunc.addTocart(cartData).then((res)=>{
            props.getCart();
        }).catch((error)=>{
            toast.error(error.message);
            console.log(error);
        })

    }
    function removeToCart(_id){
        const cartDataDelete={
            "vendorId": _id,
            "quantity": -1
        }
        apiFunc.addTocart(cartDataDelete).then((res)=>{
            props.getCart()
        }).catch((error)=>{
            console.log(error);
        })
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
   /*card list*/
   
    return (
      <>
      <AuthLayout props={props}>
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
                                        <tr>
                                            <td className="address" colSpan="2"> The Austin Store <span><i className="fas fa-map-marker-alt"></i> Austin, Texas</span> </td>
                                            <td colSpan="2" align="right"> Upload Your Identity/ Prescriptions </td>
                                        </tr>
                                        {props.cartData && (
                                            props.cartData.cart.map((data, index)=>(
                                                data.productId && (
                                                    <tr key={index}>
                                                    <td className="on-off"> 
                                                        <div className={`vegtype ${data.productId.isNonVeg?'non-veg':'veg'}`}></div>
                                                    </td>
                                                    <td className="content">{data.productId.name}</td>
                                                    <td>  
                                                        <div className={`quntityPls show`}>
                                                            <button type="button" onClick={()=>removeToCart(data.productId._id)} className="qty-minus">-</button>
                                                            <input type="number" readOnly className="qty" value={data.quantity} />
                                                            <button type="button" onClick={()=>addToCart(data.productId._id)} className="qty-plus">+</button>
                                                        </div>
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
                                            <td> Payable Amount </td>
                                            <td>$100</td>
                                        </tr>
                                        <tr>
                                            <td> Referral </td>
                                            <td>-$5</td>
                                        </tr>
                                        <tr>
                                            <td>Coupon (Store) </td>
                                            <td>-$10</td>
                                        </tr>
                                        <tr>
                                            <td>Service Fee </td>
                                            <td>$17</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <a className="btn cus_btn custom01" onClick={()=>orderMsgModalFunc(true)}> Place Order </a>
                            
                            

                            

                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h3> Checkout </h3>   

                        <div className="delivery-address bg-white rounded-3 p-3 mb-3">
                            <h6> Choose A Delivery Address </h6> 
                            <hr/>
                            <div className="address_group d-flex my-3">
                                <div className="location_img">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="location_content">
                                    <h6> <b>Home</b></h6>
                                    <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                                        sed diam nonumy eirmod tempor invidunt 
                                        ut labore et dolore magna 30 Mins </span>
                                    <div className="d-flex">
                                        <a href="#"> Edit </a> 
                                        <a href="#"> Delete </a> 
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="address_group d-flex my-3">
                                <div className="location_img">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="location_content">
                                    <h6> <b>Home</b></h6>
                                    <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  </span>
                                    <div className="d-flex">
                                        <a href="#"> Edit </a> 
                                        <a href="#"> Delete </a> 
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="address_group d-flex my-3">
                                <div className="location_img">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="location_content">
                                    <h6> <b>Home</b></h6>
                                    <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  </span>
                                    <div className="d-flex">
                                        <a href="#"> Edit </a> 
                                        <a href="#"> Delete </a> 
                                    </div>
                                </div>
                            </div>
                            <a className="but03" href="#"> <i className="fas fa-plus"></i> Add New Address </a>
                        </div>
                        <Elements stripe={stripePromise}>
                            <SplitForm />
                        </Elements>

                        {/* <PaymentCards/> */}
                    </div>
                </div>
            </div>
        </div>
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
                        <h5>Your Order has been placed </h5>
                        <p>Order No: 2222222222</p>
                        <Link href="/order-detail?orderId=2222222222">
                            <a className="btn cus_btn custom01 mb-3"> Order Details</a>
                        </Link>
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
  
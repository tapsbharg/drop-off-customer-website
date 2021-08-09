import { useState } from "react";
import { Modal } from "react-bootstrap"
import Link from "next/link";
export default function CheckoutPage(props) {
    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const [couponModal,setCouponModal]=useState(false);
    const [orderMsgModal,setOrderMsgModal]=useState(false);
    const addCardModal = (type) =>{
        setWithdrawalModal(type)
    }
    const couponModalFunc = (type) =>{
        setCouponModal(type)
    }
    const orderMsgModalFunc = (type) =>{
        setOrderMsgModal(type)
    }
    return (
      <>
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
                                        <tr>
                                            <td className="on-off"> 
                                                <div className="  form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                                                </div>
                                            </td>
                                            <td className="content">Glenfiddich Excellence</td>
                                            <td className="quntity">  
                                                <input type="button" defaultValue="-" className="qty-minus"/>
                                                <input type="number" defaultValue="1" className="qty"/>
                                                <input type="button" defaultValue="+" className="qty-plus"/> 
                                            </td>
                                            <td className="price" > $50 </td>
                                        </tr>
                                        <tr>
                                            <td className="on-off"> 
                                                <div className="  form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                                                </div>
                                            </td>
                                            <td className="content">Glenfiddich Excellence</td>
                                            <td  className="quntity">  
                                                <input type="button" defaultValue="-" className="qty-minus"/>
                                                <input type="number" defaultValue="1" className="qty"/>
                                                <input type="button" defaultValue="+" className="qty-plus"/> 
                                            </td>
                                            <td className="price"> $50 </td>
                                        </tr>
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


                        <div className="delivery-address bg-white rounded-3 p-3 mb-3">
                            <h6> Select Card </h6> 
                            <hr/>
                            <div className="address_group d-flex justify-content-between my-3">
                                <div className="location_img">
                                    <p> <b> 4545-xxxx-xxxx-1512 </b></p>
                                </div>
                                <div className="location_content">
                                    <a className="but03" href="#"> Pay Now </a>        
                                </div>
                            </div>
                            <hr/>
                            <div className="address_group d-flex justify-content-between my-3">
                                <div className="location_img">
                                    <p> <b> 4545-xxxx-xxxx-1512 </b></p>
                                </div>
                                <div className="location_content">
                                    <a className="but03" href="#"> Pay Now </a>        
                                </div>
                            </div>
                            
                            <a className="but03" onClick={()=>addCardModal(true)}> <i className="fas fa-plus"></i>  Add New Card </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <Modal
                show={withdrawalModal}
                onHide={()=>{addCardModal(false)}}
                backdrop="static"
                keyboard={false}
                className="modal-gray"
                centered
            >
                <div className="add_new_card">
                    <div className="add_new_card_contant bg-white p-5 rounded-3">
                        <i className="fal fa-times-circle" onClick={()=>addCardModal(false)}></i>
                        <h5> Add New Card </h5>
                        <form className=" " action="">
                            <div className="row bg-black p-4 rounded-3 mb-3">
                                <div className="col-sm-12 mb-3">
                                    <input type="text" placeholder="Enter Card Number"/>
                                </div>
                                <div className="col-sm-7  mb-3">
                                    <input type="text" placeholder="Card Holder's Name"/>
                                </div>
                                <div className="col-sm-5  mb-3">
                                    <input type="text" placeholder="Expiry Date"/>
                                </div>
                            </div>
                            <button className="btn cus_btn custom01" onClick={()=>addCardModal(false)}> Continue </button>
                        </form>
                        
                    </div>
                </div>
            </Modal>
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

      </>
    )
  }
  
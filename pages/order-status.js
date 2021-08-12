import { useState } from "react";
import { Modal } from "react-bootstrap"
import Link from "next/link";
import AuthLayout from "../components/authLayout";
export default function OrderStatusPage(props) {
    const [orderModal,setOrderModal]=useState(false);
    const orderModalFunc = (type) =>{
        setOrderModal(type)
    }
    return (
      <>
      
      <AuthLayout props={props}>
        <div className="checkout py-4">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                    <div className="summer_outer">
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
                                        
                                    </tr>
                                    <tr>
                                        <td className="on-off"> 
                                            <div className="  form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                                            </div>
                                        </td>
                                        <td className="content">Glenfiddich Excellence</td>
                                        <td className="quntity">  
                                                    x1
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
                                                    x1
                                        </td>
                                        <td className="price"> $50 </td>
                                    </tr>
                                </tbody>
                            </table>
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
                        <a className="btn cus_btn custom01"  onClick={()=>{orderModalFunc(true)}}> Cancel Order </a>
                    </div>
                    </div>

                    <div className="col-sm-6">
                    <h3> Track Details </h3> 
                    <div className="delivery-address bg-white rounded-3 p-3 mb-3"> 
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.609990511238!2d75.82660729999999!3d26.788699299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db145c498be13%3A0x399f8dbabe9756c6!2sAlphonic%20Network%20Solutions!5e0!3m2!1sen!2sin!4v1626343305970!5m2!1sen!2sin" width="100%" height="400"  allowFullScreen="" loading="lazy"></iframe>
                        <div className="address_group d-flex   my-3">
                            <div className="location_img">
                                    <img src="assets/images/web/store01.jpg" alt=""/>
                            </div>
                            <div className="location_content">
                                <h6>Store Details</h6>
                                <p> The Austin Store 
                                    <br/>Texas, USA 
                                    <br/>Mobile Number : 959494949
                                </p>
                            </div>
                        </div> 
                    </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <h6>Order Status</h6>
                        <ul className="order_status d-flex flex-wrap justify-content-between p-4 rounded-3 bg-white mb-5">
                            <li> 
                                <div className="order">
                                    <i className=" active fas fa-check"> </i>
                                </div> 
                                <h6> Pending </h6> 
                                <span> 09:30PM, May 12,2021 </span> 
                            </li>
                            <li> 
                                <div className="order">
                                    <i className="active fas fa-check"> </i>
                                </div> 
                                <h6> Accepted </h6> 
                                <span> 09:30PM, May 12,2021 </span> 
                            </li>
                            <li> 
                                <div className="order">
                                    <i className="fas fa-check"> </i>
                                </div> 
                                <h6> Packaging </h6> 
                                <span> 09:30PM, May 12,2021 </span> 
                            </li>
                            <li> 
                                <div className="order">
                                    <i className="fas fa-check"> </i>
                                </div> 
                                <h6> On The Way </h6> 
                                <span> 09:30PM, May 12,2021 </span> 
                            </li>
                            <li> 
                                <div className="order">
                                    <i className="fas fa-check"> </i>
                                </div> 
                                <h6> Delivered </h6> 
                                <span> 09:30PM, May 12,2021 </span> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Modal
                show={orderModal}
                onHide={()=>{orderModalFunc(false)}}
                backdrop="static"
                keyboard={false}
                className="modal-gray"
                centered
            >
                <div className="cancel_popup">
                    <div className="cancel_popup_content bg-white p-5">
                        <i className="fal fa-times-circle" onClick={()=>{orderModalFunc(false)}}></i> 
                        <h5>Are You Sure? </h5>
                        <select className="form-control mb-3" >
                            <option>I Ordered Wrong Product</option>
                            <option>2</option>
                        </select>
                        <textarea className="mb-3" rows="4" placeholder="Please return this order...."></textarea>
                        <button className="btn cus_btn custom01 "> Submit </button> 
                    </div>
                </div>
            </Modal>
            </AuthLayout>
      </>
    )
  }
  
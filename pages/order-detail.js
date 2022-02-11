import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthLayout from "../components/authLayout";
import apiFunc from "../services/api";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Rating from "react-rating";
import { toast } from "react-toastify";
import Link from 'next/link'
import Moment from "react-moment";

export default function OrderDetailPage(props) {
    const [reviewModal, setReviewModal]=useState(false);
    const [CancelModal, setCancelModal]=useState(false);
    const [reviewType, setReviewType]=useState('');
    const [ratingView, setRating]=useState(0);
    const [orderReview, setOrderReview]=useState({});
    const [orderData, setOrderData] = useState({
        vendorId:{storeName:'',address:''},
        products:[],
        rating:{},
        subTotal:0,
        serviceFee:0,
        deliveryAmount:0,
        referralDeduction:0,
        couponDeduction:0,
        grandTotal:0,
    });
    const router = useRouter() ;
    const params = router.query || '';
    const orderId = params.orderId || '';
    function getOrderById(data){
        apiFunc.getOrderById(data).then((res)=>{
            setOrderData(res.data.data);
        }).catch((error)=>{
            console.log(error);
        })
    }
    function getOrderReview(id){
        apiFunc.getOrderReview(id).then((res)=>{
            setOrderReview(res.data.result);
            let toVendor , toDriver, toCustomer = {}
            res.data.result.map((data,index)=>{
                data.givenForUserType == "VENDOR" ? toVendor = data : '' ;
                data.givenForUserType == "DRIVER" ? toDriver = data : '' ;
                data.givenForUserType == "CUSTOMER" ? toCustomer = data : '' ;
            });
            setOrderReview({
                toVendor:toVendor,
                toDriver:toDriver,
                toCustomer:toCustomer,
            })
        }).catch((error)=>{
            console.log(error);
        })
    }

   
    useEffect(()=>{
        if(orderId){
            getOrderById(orderId);
            getOrderReview(orderId)
        }
        formik.setFieldValue("orderId",orderId);
        formik.setFieldValue("rating",5);
        setRating(5)
    },[orderId])

    const addReivew =(type)=>{
        setReviewType(type);
        setReviewModal(true);
    }
    const initialValues = {
        orderId: "",
        rating: "",
        review: ""
      };
    const validationSchema = Yup.object({
        orderId: Yup.string().required("Please enter orderId"),
        rating:Yup.string().required('Please select rating'),
        review: Yup.string().required("Please enter review"),
      });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async(values) => {
          console.log("submit", values);
          if(reviewType === 'vendor'){
            await reviewVendor(values);
          }else if('driver'){
            await reviewDriver(values);
          }
        },
      });
      const reviewVendor =(data)=>{
        apiFunc.ratingVendor(data).then((res)=>{
            setReviewModal(false);
            getOrderReview(orderId)
            toast.success(`Thankyou for giving your valuable feedback`)
        })
      }
      const reviewDriver =(data)=>{
        apiFunc.ratingDriver(data).then((res)=>{
            setReviewModal(false);
            getOrderReview(orderId)
            toast.success(`Thankyou for giving your valuable feedback`)
        }).catch((error) => {
            var message = JSON.parse(error.request.response).message;
            toast.error(message);
          });
      }
      const handleRating = (rate)=>{
          formik.setFieldValue("rating",rate);
          formik.handleChange("rating");
          setRating(rate)
      }
      const initialValues2 = {
        cancelReason: "",
        cancelMessage: "", 
      };
    const validationSchema2 = Yup.object({
        cancelReason: Yup.string().required("Please select reason"),
        cancelMessage:Yup.string().required('Please enter message'),
      });
    const formik2 = useFormik({
        initialValues:initialValues2,
        validationSchema2,
        onSubmit: async(values) => {
          console.log("submit", values,orderId);
          cancelOrder(values,orderId);
        },
      });
      const cancelOrder = (data,orderId) =>{
          if(orderId){
            apiFunc.cancelOrder(data,orderId).then((res)=>{
                setCancelModal(false)
                if(orderId){
                    getOrderById(orderId);
                    getOrderReview(orderId)
                }
                toast.success(res.data.message);
            }).catch((error) => {
                var message = JSON.parse(error.request.response).message;
                toast.error(message);
                setCancelModal(false)
              });
          }
        
      }
    return (
      <>
      <AuthLayout props={props}>
        <div className="checkout py-4">
            <div className="container">
                {orderData &&(
                <div className="row">
                    <div className="col-sm-6">
                        <div className="summer_outer">
                            <h3> Order Detail </h3>   
                            <div className="summer_box00 bg-light02 rounded-3 p-3 mb-3">
                                <table className="order_from">
                                    <thead>
                                        <tr>
                                            <th colSpan="4">
                                                <div className="ordDetaheadWRp">
                                                    <div className="ordrInfor">
                                                        <h3>ORDER ID #{orderData.orderNumber}</h3>
                                                    </div>
                                                    <div className="goHelp">
                                                        <Link href="/help">
                                                            Help
                                                        </Link>
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="address" colSpan="2">
                                                {orderData.vendorId.storeName} 
                                                <span><i className="fas fa-map-marker-alt"></i> {orderData.vendorId.address}</span> 
                                            </td>
                                        </tr>
                                        {orderData.products.map((data,index)=>(
                                            <tr key={index}>
                                                <td className="content on-off" valign="center">
                                                    <span className={`vegtype ${data.isNonVeg?'non-veg':'veg'}`}></span>
                                                    <span>{data.productName}</span>
                                                </td>
                                                <td className="quntity">  
                                                            x{data.quantity}
                                                </td>
                                                <td className="price text-end" > ${(data.price).toFixed(2)} </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                                
                            <div className= "order_detail p-3 my-3 bg-light02" > 
                                <div className="ordDetaheadWRp">
                                    <div className="ordrInfor">
                                        <h3>
                                            Order Status
                                            {orderData.scheduleDate && (orderData.status != 'CANCELLED' && orderData.status != 'REJECTED') && (
                                                <span> (Scheduled for <Moment format="DD MMM YYYY">{orderData.scheduleDate}</Moment>)</span>
                                            )}
                                        </h3>
                                    </div>
                                    <div className="goHelp">
                                        {(orderData.status == 'PENDING') && (
                                            <div className="cancel_ordr_Pwrp">
                                                <a onClick={()=>setCancelModal(true)}>Cancel</a>
                                            </div>
                                        )}
                                        
                                    </div>
                                </div>
                                <ul className={`ordr_status ${orderData.status}`}>
                                    <li className={`unactive ${(orderData.status == 'ACCEPTS' || orderData.status == 'PACKED' || orderData.status == 'ONTHEWAY' || orderData.status == 'CANCELLED' || orderData.status == 'DELIVERED' || orderData.status == 'REJECTED') ? 'active':''}`}>
                                        <i className="fas fa-check "></i > 
                                        <span> <b> Accepted </b></span> 
                                    </li>
                                    {(orderData.status != 'CANCELLED' && orderData.status != 'REJECTED') && (
                                        <>
                                            <li className={`unactive ${(orderData.status == 'PACKED' || orderData.status == 'ONTHEWAY' || orderData.status == 'CANCELLED' || orderData.status == 'DELIVERED') ? 'active':''}`}>
                                                <i className="fas fa-check"></i> 
                                                <span> <b> Packed </b></span> 
                                            </li>
                                            <li className={`unactive ${(orderData.status == 'ONTHEWAY' || orderData.status == 'CANCELLED' || orderData.status == 'DELIVERED') ? 'active':''}`}>
                                                <i className="fas fa-check"></i> 
                                                <span> <b> On The Way </b>&nbsp;</span > 
                                            </li>
                                            <li className={`unactive ${orderData.status == 'DELIVERED'? 'active':''}`}>
                                                <i className="fas fa-check"></i> 
                                                <span> <b> Delivered </b>&nbsp;</span>
                                            </li>
                                        </>
                                    )}
                                    {orderData.status == 'CANCELLED' &&  (
                                        <li className={`unactive ${orderData.status == 'CANCELLED'? 'active':''}`}>
                                            <i className="fas fa-check"></i> 
                                            <span> <b> Cancelled </b>&nbsp;</span>
                                        </li>
                                    )}
                                    {orderData.status == 'REJECTED' &&  (
                                        <li className={`unactive ${orderData.status == 'REJECTED'? 'active':''}`}>
                                            <i className="fas fa-check"></i> 
                                            <span> <b> Rejected </b>&nbsp;</span>
                                        </li>
                                    )}
                                    
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
                                            <td>${(orderData.subTotal).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Service Fee </td>
                                            <td>${(orderData.serviceFee).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Delivery Charge </td>
                                            <td>${(orderData.deliveryAmount).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td> Referral </td>
                                            <td>- ${(orderData.referralDeduction).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Coupon {orderData.coupon?`(${orderData.coupon.couponIssuer})`:''} </td>
                                            <td>- ${(orderData.couponDeduction).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Grand Total </td>
                                            <td>${(orderData.grandTotal).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>
                            
                        </div>
                    </div>

                    <div className="col-sm-6">
                    <h3> Review </h3> 
                        <div className="delivery-address bg-white rounded-3 p-3 mb-3">
                            <h6> Given Review </h6> 
                            <hr/>
                            <div className="address_group d-flex justify-content-between my-3 reviewRatignwrp">
                                <div className="location_img">
                                    <p> <b> Store </b>  </p>
                                    {orderReview.toVendor ? (
                                        <p><span> {orderReview.toVendor.review} </span></p>
                                    ) : (orderData.status == 'DELIVERED' && (orderReview.toDriver? orderReview.toDriver.rating > 0 : true)) && (
                                            <a className="but03" onClick={()=>addReivew('vendor')}>   Add Review </a>
                                        )
                                    }
                                </div>
                                <div className="location_content">
                                    <div className="starsRating">
                                        <Rating
                                            emptySymbol="far fa-star"
                                            fullSymbol="fas fa-star"
                                            fractions={2}
                                            initialRating={orderReview.toVendor ?orderReview.toVendor.rating:0}
                                            readonly
                                        />
                                        <sup>{orderReview.toVendor ?orderReview.toVendor.rating:0}</sup>
                                    </div> 
                                </div>
                            </div>
                            <hr/>
                            <div className="address_group d-flex justify-content-between my-3 reviewRatignwrp">
                                <div className="location_img">
                                    <p> <b> Driver </b>  </p>
                                    {orderReview.toDriver ? (
                                        <p><span> {orderReview.toDriver.review} </span></p>
                                    ) : (orderData.status == 'DELIVERED' && (orderReview.toDriver? orderReview.toDriver.rating > 0 : true)) && (
                                            <a className="but03" onClick={()=>addReivew('driver')}>   Add Review </a>
                                        )
                                    }
                                </div>
                                <div className="location_content">
                                    <div className="starsRating">
                                        <Rating
                                            emptySymbol="far fa-star"
                                            fullSymbol="fas fa-star"
                                            fractions={2}
                                            initialRating={orderReview.toDriver ?orderReview.toDriver.rating:0}
                                            readonly
                                        />
                                        <sup>{orderReview.toDriver ?orderReview.toDriver.rating:0}</sup>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="delivery-address bg-white rounded-3 p-3 mb-3">
                            <h6> Received Review </h6> 
                            <hr/>
                            <div className="address_group d-flex justify-content-between my-3">
                                <div className="location_img">
                                    <p> <b> By Driver </b> </p>
                                    {orderReview.toCustomer && (
                                        <p><span> {orderReview.toCustomer.review} </span></p>
                                    )}
                                </div>
                                <div className="location_content">
                                    <div className="starsRating">
                                        <Rating
                                            emptySymbol="far fa-star"
                                            fullSymbol="fas fa-star"
                                            fractions={2}
                                            initialRating={orderReview.toCustomer ?orderReview.toCustomer.rating:0}
                                            readonly
                                        />
                                        <sup>{orderReview.toCustomer ?orderReview.toCustomer.rating:0}</sup>
                                    </div> 
                                </div>
                            </div>
                            
                        </div>
                    
                    </div>
                </div> 
                )}

            </div>
        </div>
        <Modal
    show={reviewModal}
    onHide={()=>{setReviewModal(false)}}
    backdrop="static"
    keyboard={false}
    className="modal-gray"
    centered
        >
            <div className="add_new_card">
                <div className="add_new_card_contant bg-white p-5 rounded-3">
                    <i className="fal fa-times-circle" onClick={()=>setReviewModal(false)}></i>
                    <h5 className="mb-4"> Rating & Reivew </h5>
                    
                    <form className=" " onSubmit={formik.handleSubmit}>
                        <div className="">
                            <div className="mb-5 text-center starsRating">{/* fa-star-half-alt */}
                                <Rating
                                    emptySymbol="far fa-star fa-2x"
                                    fullSymbol="fas fa-star fa-2x"
                                    fractions={2}
                                    initialRating={ratingView}
                                    onChange={(rate) =>handleRating(rate)}
                                />
                                {formik.touched.rating && formik.errors.rating ? (
                                    <div className="errorMsg">{formik.errors.rating}</div>
                                ) : null}
                            </div> 
                            <div className="mb-3">
                                <input type="text" {...formik.getFieldProps("review")} className="form-control" placeholder="Enter review"/>
                                {formik.touched.review && formik.errors.review ? (
                                    <div className="errorMsg">{formik.errors.review}</div>
                                ) : null}
                            </div> 
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn cus_btn custom01"> Submit </button>
                        </div>
                        
                    </form>
                    
                </div>
            </div>
        </Modal>
        <Modal
    show={CancelModal}
    onHide={()=>{setCancelModal(false)}}
    backdrop="static"
    keyboard={false}
    className="modal-gray"
    centered
        >
            <div className="add_new_card">
                <div className="add_new_card_contant bg-white p-5 rounded-3">
                    <i className="fal fa-times-circle" onClick={()=>setCancelModal(false)}></i>
                    <h5 className="mb-4"> Cancel Order </h5>
                    
                    <form className=" " onSubmit={formik2.handleSubmit}>
                        <div className="">
                            <div className="mb-3">
                                <select {...formik2.getFieldProps("cancelReason")} className="form-select" placeholder="Enter cancel message">
                                    <option>Select Reason</option>
                                    <option value="Price is too high">Price is too high</option>
                                    <option value="Other">Other</option>
                                </select>
                                {formik2.touched.reason && formik2.errors.reason ? (
                                    <div className="errorMsg">{formik2.errors.reason}</div>
                                ) : null}
                            </div> 
                            <div className="mb-3">
                                <textarea type="text" {...formik2.getFieldProps("cancelMessage")} className="form-textarea" placeholder="Enter cancel message"></textarea>
                                {formik2.touched.message && formik2.errors.message ? (
                                    <div className="errorMsg">{formik2.errors.message}</div>
                                ) : null}
                            </div> 
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn cus_btn custom01"> Submit </button>
                        </div>
                        
                    </form>
                    
                </div>
            </div>
        </Modal>

        </AuthLayout>
      </>
    )
  }
  
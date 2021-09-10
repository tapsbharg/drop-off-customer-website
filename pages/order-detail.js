import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthLayout from "../components/authLayout";
import apiFunc from "../services/api";

export default function OrderDetailPage(props) {
    const [orderData, setOrderData] = useState({
        vendorId:{storeName:'',address:''},
        products:[]
});
    const router = useRouter()
    const params = router.query || '';
    const orderId = params.orderId || '';
    function getOrderById(data){
        apiFunc.getOrderById(data).then((res)=>{
            setOrderData(res.data.data);
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        if(orderId){
            getOrderById(orderId);
        }
        
    },[orderId])
    console.log(orderData)
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
                                            <th colSpan="4"> Order From </th>
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
                                                <td className="on-off"> 
                                                    <div className={`vegtype ${data.isNonVeg?'non-veg':'veg'}`}></div>
                                                </td>
                                                <td className="content">{data.productName}</td>
                                                <td className="quntity">  
                                                            x{data.quantity}
                                                </td>
                                                <td className="price" > ${data.price} </td>
                                            </tr>
                                        ))}
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
                                            <td> Grand Total </td>
                                            <td>${orderData.grandTotal}</td>
                                        </tr>
                                        <tr>
                                            <td>Service Fee </td>
                                            <td>${orderData.serviceFee}</td>
                                        </tr>
                                        <tr>
                                            <td>Delevery Charges </td>
                                            <td>${orderData.deliveryAmount}</td>
                                        </tr>
                                        <tr>
                                            <td> Referral </td>
                                            <td>-${orderData.referralDeduction}</td>
                                        </tr>
                                        <tr>
                                            <td>Coupon (Store) </td>
                                            <td>-${orderData.couponDeduction}</td>
                                        </tr>
                                        <tr>   
                                            <td> Payable Amount </td>
                                            <td>${orderData.payableAmount}</td>
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
                            <div className="address_group d-flex justify-content-between my-3">
                                <div className="location_img">
                                    <p> <b> Store </b> <span> Good Quality, Good Wine </span> </p>
                                </div>
                                <div className="location_content">
                                    <div className="stars">
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <sup>4.5</sup>
                                    </div> 
                                </div>
                            </div>
                            <hr/>
                            <p> <b> Driver </b>   <a className="but03" href="#">   Add Review </a></p>
                        </div>
                        <div className="delivery-address bg-white rounded-3 p-3 mb-3">
                            <h6> Received Review </h6> 
                            <hr/>
                            <div className="address_group d-flex justify-content-between my-3">
                                <div className="location_img">
                                    <p> <b> By Driver </b> <span> Good Communication </span> </p>
                                </div>
                                <div className="location_content">
                                    <div className="stars">
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <sup>4.5</sup>
                                    </div> 
                                </div>
                            </div>
                            
                        </div>
                    
                    </div>
                </div> 
                )}

            </div>
        </div>

        </AuthLayout>
      </>
    )
  }
  
import React, { useContext } from 'react'
import { UserContext } from '../context/locationContext';

const OrderSummery = ({orderTotal}) => {
    const context = useContext(UserContext);
  return (
    <>
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
                                                    <td>${orderTotal.deliveryAmount}</td>
                                                </tr>
                                                <tr>
                                                    <td> Referral </td>
                                                    <td>- ${orderTotal.referralDiscount}</td>
                                                </tr>
                                                <tr>
                                                    <td>Coupon {context.couponData.couponIssuer?`(${context.couponData.couponIssuer})`:''}</td>
                                                    <td>- ${orderTotal.couponDeduction}</td>
                                                </tr>
                                                <tr>
                                                    <td>Grand Total </td>
                                                    <td>${orderTotal.grandTotal}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
    </>
  )
}

export default OrderSummery
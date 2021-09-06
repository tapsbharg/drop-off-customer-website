import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import apiFunc from '../services/api';

export default function Cart(appProps) {
    const [cartData,SetCartData]=useState();
    const [cartTotal,SetCartTotal]=useState(0);
    const [cartQty,SetCartQty]=useState(0);

    
    useEffect(()=>{
        SetCartData(appProps.props.cartData)
        if(appProps.props.cartData){
            const icart= appProps.props.cartData.cart.length;
            SetCartQty(icart);
            var crtotl=0;
            for (var i = 0; i < icart; i++) {
                if(appProps.props.cartData.cart[i].productId){
                    let quantity=appProps.props.cartData.cart[i].quantity || 0
                    crtotl +=(appProps.props.cartData.cart[i].productId.price || 0 )*quantity
                    SetCartTotal(crtotl);
                }
            }
        }
        
    },[appProps.props.cartData])
    return (
      <>
      {appProps.props.cartData && (
          appProps.props.cartData.cart.length>0 && (
          <div className="cartMainWrapper">
          <div className="container">
              <div className="cartiNsiWRp">
                  <div className="cartNwlmrp">
                      <h4>View Cart</h4>
                  </div>
                  <div className="cartDetals">
                      <div className="cartinsrp">
                          <span>{cartQty} Item</span> | 
                          <span>${cartTotal}</span>
                      </div>
                      <div className="cartBntnsp">
                          {appProps.props.auth &&(
                              <Link href="/checkout"><a className="thm-1 btn-sm">Continue</a></Link>
                          )}
                          {!appProps.props.auth &&(
                              <Link href="/sign-in"><a className="thm-1 btn-sm">Continue</a></Link>
                          )}
                          
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
      )}
        
      </>
    )
  }
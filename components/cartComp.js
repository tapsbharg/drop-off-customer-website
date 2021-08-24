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
                    crtotl +=appProps.props.cartData.cart[i].productId.price || 0
                    SetCartTotal(crtotl);
                }
            }
        }
        
    },[appProps.props.cartData])
    return (
      <>
      {appProps.props.cartData && (
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
                          <a href="#" className="thm-1 btn-sm">Continue</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    
      )}
        
      </>
    )
  }
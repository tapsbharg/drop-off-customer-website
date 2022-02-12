
import React, { useMemo,useEffect, useState, useContext } from "react";
import apiFunc from "../services/api";
import { toast } from "react-toastify";
import { UserContext } from "./context/locationContext";
import SplitForm from "./stripe-card";

const SplitFormCheckout = (props) => {
    const context = useContext(UserContext);
    const [cardList,setCardList]=useState([]);
    const [defaultCardItem,setDefaultCardItem]=useState([]);
    /*card list*/
    function cardListingFunc(){
        apiFunc.getAllCard().then((res)=>{
            setCardList(res.data.cardListing)
            checkStatus(res.data.cardListing)
        }).catch((error)=>{
            console.log(error);
        })
    }
    function checkStatus(datas){
        datas.map((data,i)=>{
            if(data.defaultCard == true){
                context.setCardId(data.cardId)
            }
        })
    }
    useEffect(()=>{
        cardListingFunc();
    },[])
    
    function setDefaultCard(data){
        apiFunc.setDefaultCard(data.cardId).then((res)=>{
            toast.success(res.data.message);
            setDefaultCardItem(data);
            cardListingFunc();
            // context.setCouponId(data.cardId)
        }).catch((error)=>{
            console.log(error);
        })
    }
    
  return (
    <>
    {props.page && (
        <SplitForm page="card" reload={()=>cardListingFunc()} />
    )}
    {(!props.page || props.page=='checkout') && (
    <div className={`delivery-address bg-white rounded-3 p-3 mb-3 ${props.selectClass?props.selectClass:''}`}>
          <h6> Select Card </h6> 
          
          <hr/>
          {cardList.map((data, index)=>(
              <div key={index}>
                  <div className={`address_group d-flex justify-content-between my-3 ${data.defaultCard?' selectDefault':''}`}>
                      <div className="location_img">
                          <p> <b> xxxx-xxxx-xxxx-{data.cardLast4} </b></p>
                      </div>
                      <div className="location_content">
                          {/* <a className="but03" onClick={()=>setDefaultCard(data)}> Select </a>  */}  
                          {data.defaultCard && (
                                <i className="setDefault"> Selected </i> 
                            )}
                            {!data.defaultCard && (
                                <a onClick={()=>setDefaultCard(data)} className="setDefault"> Set As Default </a> 
                            )}     
                      </div>
                  </div>
                  <hr/>
              </div>
          ))}
          <SplitForm page="checkout" reload={()=>cardListingFunc()} />
      </div>
    )}

</>
    
  );
};

export default SplitFormCheckout;

import { useFormik } from "formik";
import React, { useMemo,useEffect, useState, useContext } from "react";
import { Modal } from "react-bootstrap"
import apiFunc from "../services/api";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import CheckoutForm from "./checkoutForm";
import { UserContext } from "./context/locationContext";


const stripePromise = loadStripe('pk_test_51J3DGCCSN2jNmtALotIqwa1DkZIQkHHJALZuHHOFvbWCRwxxlvXUYjuNF7AlSOC65tjBk54I3acnD10OttMHRgmu007HanxG0F');

// const clientKey =""

const SplitForm = (props) => {
    const context = useContext(UserContext);
    /* const options = {
        // passing the client secret obtained from the server
        clientSecret: clientKey,
      }; */

    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const [cardList,setCardList]=useState([]);
    const [defaultCardItem,setDefaultCardItem]=useState([]);
    const addCardModal = (type) =>{
        setWithdrawalModal(type)
    }
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
                props.cardSelct?props.cardSelct(true):null;
            }
        })
    }
    useEffect(()=>{
        cardListingFunc();
    },[])


    function addCard(data){
        console.log(data)
        apiFunc.addNewCard(data).then((res)=>{
            toast.success(res.data.message);
            setWithdrawalModal(false);
            cardListingFunc();
            props.reload?props.reload():null;
        }).catch((error)=>{
            console.log(error);
        })
    }
    function setDefaultCard(data){
        apiFunc.setDefaultCard(data.cardId).then((res)=>{
            toast.success(res.data.message);
            setDefaultCardItem(data);
            cardListingFunc();
            props.cardSelct?props.cardSelct(true):null
        }).catch((error)=>{
            console.log(error);
        })
    }
    
  return (
    <Elements stripe={stripePromise}>
    <>
    {props.page!='checkout' && (
        <a  className="btn custom01" onClick={()=>addCardModal(true)}> <i className="fas fa-plus"></i>  Add New Card </a>
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
          <a className="but03" onClick={()=>addCardModal(true)}> <i className="fas fa-plus"></i>  Add New Card </a>
      </div>
    )}

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
                    <CheckoutForm addcard={(data)=>addCard(data)}/>
              </div>
          </div>
      </Modal>
</>
    </Elements>
  );
};

export default SplitForm;

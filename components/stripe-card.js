import React, { useMemo,useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import { Modal } from "react-bootstrap"
import apiFunc from "../services/api";


const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
            backgroundColor:"#fff",
            color: "#000",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
                color: "#252525"
            },
        },
        invalid: {
            color: "#f00",
            "::placeholder": {
                color: "#f00"
            }
        }
      }
    }),
    []
  );

  return options;
};

const SplitForm = () => {
    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const [cardList,setCardList]=useState([]);
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const addCardModal = (type) =>{
        setWithdrawalModal(type)
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
    function addCard(options){
        
        apiFunc.addNewCard().then((res)=>{
            setCardList(res.data.cardListing)
        }).catch((error)=>{
            console.log(error);
        })
    }
  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });
    if(!payload.error){
        console.log(event.target);
        // addCard(event)
    }
    
  };

  return (
    <>
    <div className="delivery-address bg-white rounded-3 p-3 mb-3">
          <h6> Select Card </h6> 
          
          <hr/>
          {cardList.map((data, index)=>(
              <div key={index}>
                  <div className="address_group d-flex justify-content-between my-3">
                      <div className="location_img">
                          <p> <b> 4545-xxxx-xxxx-1512 </b></p>
                      </div>
                      <div className="location_content">
                          <a className="but03" href="#"> Pay Now </a>        
                      </div>
                  </div>
                  <hr/>
              </div>
          ))}
          <a className="but03" onClick={()=>addCardModal(true)}> <i className="fas fa-plus"></i>  Add New Card </a>
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
                  <form onSubmit={handleSubmit}>
                        <div className="row bg-black p-4 rounded-3 mb-3">
                            <div className="col-sm-12 mb-3">
                                <CardNumberElement  options={options} placeholder="Enter Card Number" />
                            </div>
                            <div className="col-sm-6  mb-3">
                                <CardExpiryElement options={options}  placeholder="Card Holder's Name" />
                            </div>
                            <div className="col-sm-6  mb-3">
                                <CardCvcElement options={options} placeholder="Expiry Date" />
                            </div>
                        </div>
                        <button type="submit" className="btn cus_btn custom01" disabled={!stripe}>
                            Add Card
                        </button>
                    </form>
              </div>
          </div>
      </Modal>
</>
    
  );
};

export default SplitForm;

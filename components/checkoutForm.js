import {useStripe, 
    useElements, 
    PaymentElement, 
    CardElement,
    
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardNumberElement,CardCvcElement,CardExpiryElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      console.log(result.error.message);
    }else {
      if(result.token.id){
          let postData={
            cardToken:result.token.id
          }
        props.addcard(postData)
        console.log(postData)
      }
      console.log(result);
    }
  };
  
  return (
    <form  onSubmit={handleSubmit}>
          <div className="row bg-black p-4 rounded-3 mb-3">
            {/* <CardElement /> */}
              <div className="col-sm-12 mb-3">
                <CardNumberElement options={{showIcon: true}} />
              </div>
              <div className="col-sm-5  mb-3">
                <CardExpiryElement />
              </div>
              <div className="col-sm-4  mb-3">
              </div>
              <div className="col-sm-3  mb-3">
                <CardCvcElement />
              </div>
          </div>
          <button className="btn cus_btn custom01" type="submit" disabled={!stripe}> Continue </button>
      </form>
  )
};

export default CheckoutForm;
import { useFormik } from "formik";
import React, { useMemo,useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import apiFunc from "../services/api";
import * as Yup from "yup";
import { usePaymentInputs } from 'react-payment-inputs';
import { toast, ToastContainer } from "react-toastify";

const SplitForm = (props) => {
    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const [cardList,setCardList]=useState([]);
    const [defaultCardItem,setDefaultCardItem]=useState([]);
    const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
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
                props.cardSelct(true);
            }
        })
    }
    useEffect(()=>{
        cardListingFunc();
    },[])
    /*card list*/
    const testNumber=(e)=>{
        const re = /^[0-9\b]+$/;
        if (re.test(e)) {
           return true
        }else{
            return false
        }
    }
    const initialValues = {
        cardName: "",
        cardNumber: "",
        cardExpMonth: "",
        cardExpYear: "",
        cardCVC: "",
      };
      const validationSchema = Yup.object({
        cardName:Yup.string().required('Please enter card name'),
        cardNumber:Yup
        .mixed()
        .required("Please enter card number"),
        cardExpMonth:Yup
        .mixed()
        .required("Please enter exp. date"),
        cardExpYear:Yup
        .mixed()
        .required("Please enter exp. date"),
        cardCVC:Yup
        .mixed()
        .required("Please enter card CVV"),
      });
      const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
          console.log("submit", values);
          if(
                meta.erroredInputs.cardNumber != 'undefined' && 
                meta.erroredInputs.expiryDate != 'undefined' && 
                meta.erroredInputs.cvc != 'undefined'
            ){
                formik.resetForm()
            addCard(values)
          }else{
              console.log(meta.error)
            toast.error(meta.error);
          }
        },
    });

    function addCard(options){
        apiFunc.addNewCard(options).then((res)=>{
            toast.success(res.data.message);
            setWithdrawalModal(false);
            cardListingFunc();
            props.reload();
        }).catch((error)=>{
            console.log(error);
        })
    }
    function setDefaultCard(data){
        apiFunc.setDefaultCard(data.cardId).then((res)=>{
            toast.success(res.data.message);
            setDefaultCardItem(data);
            cardListingFunc();
            props.cardSelct(true)
        }).catch((error)=>{
            console.log(error);
        })
    }
    
    function handleChangeCardNumber(e){
        formik.setFieldValue('cardNumber',e.target.value)
    }
    function handleChangeExpiryDate(e){
        var date=e.target.value;
         date=date.split(' / ');
        var dateMonth=date[0];
        var dateYear=date[1];
        formik.setFieldValue('cardExpMonth',dateMonth)
        formik.setFieldValue('cardExpYear',dateYear)
    }
    function handleChangeCVC(e){
        formik.setFieldValue('cardCVC',e.target.value)
    }
  return (
    <>
    {props.page && (
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
                  <form  onSubmit={formik.handleSubmit}>
                    {meta.isTouched && meta.error && <div className="errorMsg text-center mb-1">Error: {meta.error}</div>}
                            <div className="row bg-black p-4 rounded-3 mb-3">
                                <div className="col-sm-12  mb-3">
                                    <input type="text" {...formik.getFieldProps("cardName")} placeholder="Card Holder's Name"/>
                                    {formik.touched.cardName && formik.errors.cardName ? (
                                    <div className="errorMsg">{formik.errors.cardName}</div>
                                    ) : null}
                                </div>
                                <div className="col-sm-12 mb-3">
                                    <input type="text"  {...getCardNumberProps({ onChange: handleChangeCardNumber })} placeholder="Enter Card Number"/>
                                    {formik.touched.cardNumber && formik.errors.cardNumber ? (
                                    <div className="errorMsg">{formik.errors.cardNumber}</div>
                                    ) : null}
                                </div>
                                <div className="col-sm-5  mb-3">
                                    <input type="text" {...getExpiryDateProps({ onChange: handleChangeExpiryDate })} placeholder="Month"/>
                                    {formik.touched.cardExpMonth && formik.errors.cardExpMonth ? (
                                    <div className="errorMsg">{formik.errors.cardExpMonth}</div>
                                    ) : null}
                                </div>
                                <div className="col-sm-4  mb-3">
                                </div>
                                <div className="col-sm-3  mb-3">
                                    <input type="text" {...getCVCProps({ onChange: handleChangeCVC })} placeholder="CVV"/>
                                    {formik.touched.cardCVC && formik.errors.cardCVC ? (
                                        <div className="errorMsg">{formik.errors.cardCVC}</div>
                                    ) : null}
                                </div>
                            </div>
                            <button className="btn cus_btn custom01"> Continue </button>
                        </form>
              </div>
          </div>
      </Modal>
</>
    
  );
};

export default SplitForm;

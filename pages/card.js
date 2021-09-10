import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SplitForm from "../components/cardsComp";
import DashLayout from "../components/dashLayout";
import apiFunc from "../services/api";

export default function CardPage(props) {
    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const [cardList,setCardList]=useState([]);
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
    function DeleteCard(id){
        apiFunc.deleteCard(id).then((res)=>{
            cardListingFunc()
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        cardListingFunc();
    },[props])
   /*card list*/

console.log(cardList)





    return (
      <>
      <DashLayout props={props}>
        <div className="description_right">
            <div className="id-outer"> 
                <ul className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <li><a href="#"> Card </a></li>
                <li><SplitForm page="card" reload={()=>cardListingFunc()} /></li>
                </ul>
                <div className="row">
                    {cardList.map((data,index)=>(
                        <div className="col-sm-6" key={index}>
                            <div className="id_photo">
                                <div className="cardboxRps">
                                    <h3>XXXXX-XXXX-XXXX-{data.cardLast4}</h3>
                                    <div className="carditpsbx">
                                        <div className="cardHldrName">
                                            <h4>Card Holder's Name</h4>
                                            <p>{data.cardName}</p>
                                        </div>
                                        <div className="cardCvvsrn">
                                            <h4>Expiry Date</h4>
                                            <p>{data.cardExpDetails}</p>
                                        </div>
                                    </div>
                                </div>
                                <a onClick={()=>DeleteCard(data.cardId)}> Delete</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
                    <form className=" " action="">
                        <div className="row bg-black p-4 rounded-3 mb-3">
                            <div className="col-sm-12 mb-3">
                                <input type="text" placeholder="Enter Card Number"/>
                            </div>
                            <div className="col-sm-7  mb-3">
                                <input type="text" placeholder="Card Holder's Name"/>
                            </div>
                            <div className="col-sm-5  mb-3">
                                <input type="text" placeholder="Expiry Date"/>
                            </div>
                        </div>
                        <button className="btn cus_btn custom01" onClick={()=>addCardModal(false)}> Continue </button>
                    </form>
                    
                </div>
            </div>
        </Modal>
      
      </DashLayout>
      </>
    )
  }
  
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SplitForm from "../components/stripe-card";
import DashLayout from "../components/dashLayout";
import apiFunc from "../services/api";
import common from "../services/common";

export default function CardPage(props) {
    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const [cardList,setCardList]=useState([]);
    const addCardModal = (type) =>{
        setWithdrawalModal(type)
    }

    /*card list*/
    
    function cardListingFunc(){
        apiFunc.getAllCard().then((res)=>{
            // creditCardType
            let resData = res.data.cardListing.map((data,index)=>{
                data.cardTypeImage=common.creditCardType(data.cardType);
                return data
            })
            setCardList(resData)
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
                                            <img src={`/assets/images/${data.cardTypeImage}`} alt=""/>
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
      
      </DashLayout>
      </>
    )
  }
  
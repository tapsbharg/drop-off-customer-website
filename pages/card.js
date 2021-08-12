import { useState } from "react";
import { Modal } from "react-bootstrap";
import DashLayout from "../components/dashLayout";

export default function CardPage(props) {
    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const addCardModal = (type) =>{
        setWithdrawalModal(type)
    }
    return (
      <>
      <DashLayout props={props}>
        <div className="description_right">
            <div className="id-outer"> 
                <ul className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <li><a href="#"> Card </a></li>
                <li><a className="btn custom01" onClick={()=>addCardModal(true)}> Add New </a></li>
                </ul>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="id_photo">
                            <img src="assets/images/web/card01.svg" alt=""/>
                            <a href="#"> Delete</a>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="id_photo">
                            <img src="assets/images/web/card01.svg" alt=""/>
                            <a href="#"> Delete</a>
                        </div>
                    </div>
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
  
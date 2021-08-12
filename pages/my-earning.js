import { Tab, Tabs } from "react-bootstrap";
import DashLayout from "../components/dashLayout";

export default function MyEarningPage(props) {
    return (
      <>
      <DashLayout props={props}>
      <div className="description_right">
                        <div className="referral_outer"> 

                            <div className="referral_box01 d-flex flex-wrap justify-content-between align-items-center">
                            <h6>My Earnings </h6>
                            </div>

                            <div className="referral_box05 d-flex flex-wrap justify-content-center align-items-center bg-red my-3 p-3 rounded-3">
                                <a className="btn custom01 mb-3" href="#"> Available Balance : $5 </a>
                                <p>Invite your friends and earn assured $1 for every friend that signs up and make a order. Your friend also gets $1.</p>
                                <h6> Total Referrals <span> 10 </span>  </h6>
                                <ul className="d-flex flex-wrap justify-content-between align-items-center">
                                    <li> <a href="#"> Registered <span> 3 </span> </a> </li>
                                    <li> <a href="#"> Transaction<span> 7 </span> </a> </li>
                                </ul>
                            </div>

                            <div className="referral_box06">
                                <Tabs defaultActiveKey="tab1" id="nav-tab" className="nav nav-tabs my-4">
                                    <Tab eventKey="tab1" title="Registered">
                                        <div className="tablpanel">
                                            <div className="registered_transactions d-flex flex-wrap justify-content-between align-items-center p-3 mb-3  bg-white">
                                                <div className="registered_detail d-flex  flex-wrap align-items-center ">
                                                    <img src="assets/images/web/earning.png" alt=""/>    
                                                    <div className="px-3">
                                                        <h6>Referred by Paul </h6> 
                                                        <span> 12 May,2021 </span>
                                                        <span> Available Balance : $7 </span>
                                                    </div>
                                                </div>
                                                <div className="transactions_detail">
                                                    <a href="#"> $1 Cr </a>
                                                </div>
                                            </div>

                                            <div className="registered_transactions d-flex flex-wrap justify-content-between align-items-center p-3 mb-3  bg-white">
                                                <div className="registered_detail d-flex  flex-wrap align-items-center">
                                                    <img src="assets/images/web/earning.png" alt=""/>    
                                                    <div className="px-3">
                                                        <h6>Referred by Paul </h6> 
                                                        <span> 12 May,2021 </span>
                                                        <span> Available Balance : $7 </span>
                                                    </div>
                                                </div>
                                                <div className="transactions_detail">
                                                    <a href="#"> $1 Cr </a>
                                                </div>
                                            </div>

                                            <div className="registered_transactions d-flex flex-wrap justify-content-between align-items-center p-3  mb-3  bg-white" >
                                                <div className="registered_detail d-flex  flex-wrap align-items-center">
                                                    <img src="assets/images/web/earning.png" alt=""/>    
                                                    <div className="px-3">
                                                        <h6>Referred by Paul </h6> 
                                                        <span> 12 May,2021 </span>
                                                        <span> Available Balance : $7 </span>
                                                    </div>
                                                </div>
                                                <div className="transactions_detail">
                                                    <a href="#"> $1 Cr </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="tab2" title="Transactions">
                                        <div className="tablpanel">
                                            <div className="registered_transactions d-flex flex-wrap justify-content-between align-items-center p-3  mb-3  bg-white">
                                                <div className="registered_detail d-flex  flex-wrap align-items-center">
                                                    <img src="assets/images/web/earning.png" alt=""/>    
                                                    <div className="px-3">
                                                        <h6>Referred by Paul </h6> 
                                                        <span> 12 May,2021 </span>
                                                        <span> Available Balance : $7 </span>
                                                    </div>
                                                </div>
                                                <div className="transactions_detail">
                                                    <a href="#"> $1 Cr </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                            
                            </div>
                        </div>
                    </div>
                
      </DashLayout>
      </>
    )
  }
  
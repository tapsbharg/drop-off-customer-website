import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Moment from "react-moment";
import { UserContext } from "../components/context/locationContext";
import DashLayout from "../components/dashLayout";
import PageModule from "../components/Pagination";
import apiFunc from "../services/api";

export default function MyEarningPage(props) {
    const router = useRouter()
    const params = router.query || '';
    const page = params.page || 1;
    
    const [referral, setReferral]= useState({
        list: [],
        activePage: parseInt(page) || 1,
        itemsCountPerPage: 10,
        totalItemsCount: 10,
    });
    const [referralAcc, setReferralAcc]= useState({
        list: [],
        activePage: parseInt(page) || 1,
        itemsCountPerPage: 10,
        totalItemsCount: 10,
    });
    const getReferral = (page) => {
        let postData = {
            "page": page,
            "perPage": "5"
        }
        apiFunc.referralDetail(postData).then((res)=>{
            setReferral({ ...referral, list: res.data.result, totalItemsCount: res.data.totalCount });
        })
    }
    const getReferralAcc = (page) => {
        let postDataAcc = {
            "page": page,
            "perPage": "5",
            "searchString":""
        }
        apiFunc.referralAcount(postDataAcc).then((res)=>{
            setReferralAcc({ ...referralAcc, list: res.data.result, totalItemsCount: res.data.totalCount });
        })
    }
    useEffect(()=>{
        getReferral(page);
        getReferralAcc(page);
    },[page])

    
  const context = useContext(UserContext);

//   pagehaschagned start
function pageHasChanged(pageNumber) {
    if (pageNumber !== referral.activePage) {
        setReferral({
        ...referral,
        activePage: pageNumber,
        list: [],
      });

      router.push({
        pathname: '/my-earning',
        query: { page: pageNumber},
      })
    }
  }
function pageHasChangedAcc(pageNumber) {
    if (pageNumber !== referralAcc.activePage) {
        setReferralAcc({
        ...referralAcc,
        activePage: pageNumber,
        list: [],
      });

      router.push({
        pathname: '/my-earning',
        query: { page: pageNumber},
      })
    }
  }
  const handleTabs = (e) =>{
    router.push({
        pathname: '/my-earning',
        query: { page: 1 },
      })
  }
    return (
      <>
      <DashLayout props={props}>
      <div className="description_right">
                        <div className="referral_outer"> 

                            <div className="referral_box01 d-flex flex-wrap justify-content-between align-items-center">
                            <h6>My Earnings </h6>
                            </div>

                            <div className="referral_box05 d-flex flex-wrap justify-content-center align-items-center bg-red my-3 p-3 rounded-3">
                                <a className="btn custom01 mb-3" href="#"> Available Balance : ${context.profile.balance} </a>
                                <p>Invite your friends and earn assured $1 for every friend that signs up and make a order. Your friend also gets $1.</p>
                                <h6> Total Referrals <span> {context.profile.count} </span>  </h6>
                                <ul className="d-flex flex-wrap justify-content-between align-items-center">
                                    <li> <a href="#"> Registered <span> {context.profile.count} </span> </a> </li>
                                    <li> <a href="#"> Transaction<span> {referralAcc.totalItemsCount} </span> </a> </li>
                                </ul>
                            </div>

                            <div className="referral_box06">
                                <Tabs defaultActiveKey="tab1" onSelect={(e)=>handleTabs(e)} id="nav-tab" className="nav nav-tabs my-4">
                                    <Tab eventKey="tab1" title="Registered">
                                        <div className="tablpanel">
                                            {referral.list.map((data,key)=>(
                                                <div key={key} className="registered_transactions d-flex flex-wrap justify-content-between align-items-center p-3 mb-3  bg-white">
                                                    <div className="registered_detail d-flex  flex-wrap align-items-center ">
                                                        <div className="refrimagBox">
                                                            {data.userId.image ? (
                                                                <img src={data.userId.image.path} alt=""/>
                                                            ):(
                                                                <img src={`assets/images/default_user.jpg`} alt=""/>
                                                            )}
                                                        </div>
                                                        <div className="constRefstr px-3">
                                                            <h6>You invited {data.userId.name} </h6> 
                                                            <span> <Moment format="DD MMM, YYYY">{data.createdAt}</Moment> </span>
                                                        </div>
                                                    </div>
                                                    <div className="transactions_detail">
                                                        <span className="trns_amount"> ${data.amount} </span><br></br>
                                                        <span className="trns_remarks"> {data.remarks} </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="table_botm_paging">
                                            <div className="table_border">
                                                {/* <div className="release"> */}
                                                <PageModule
                                                    totalItems={referral.totalItemsCount}
                                                    itemsPerPage={referral.itemsCountPerPage}
                                                    currentPage={referral.activePage}
                                                    range={3}
                                                    pageChange={(page) => {
                                                        pageHasChanged(page);
                                                    }}
                                                />
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </Tab>
                                     <Tab eventKey="tab2" title="Transactions">
                                        <div className="tablpanel">
                                            {referralAcc.list.map((data,key)=>(
                                                <div key={key} className="registered_transactions d-flex flex-wrap justify-content-between align-items-center p-3 mb-3  bg-white">
                                                    <div className="registered_detail d-flex  flex-wrap align-items-center ">
                                                        <div className="refrimagBox">
                                                            {data.userId.image ? (
                                                                <img src={data.userId.image.path} alt=""/>
                                                            ):(
                                                                <img src={`assets/images/default_user.jpg`} alt=""/>
                                                            )}
                                                        </div>
                                                        <div className="constRefstr px-3">
                                                            <h6>{data.remarks} </h6> 
                                                            <span> <Moment format="DD MMM, YYYY">{data.createdAt}</Moment> </span>
                                                            <span> Available Balance : ${data.balance} </span>
                                                        </div>
                                                    </div>
                                                    <div className="transactions_detail">
                                                        <span className={`trns_amount TRNSC_${data.txnType}`}> ${data.amountOut} {data.txnType} </span>
                                                    </div> 
                                                </div>
                                            ))}
                                        </div>
                                        <div className="table_botm_paging">
                                            <div className="table_border">
                                                {/* <div className="release"> */}
                                                <PageModule
                                                    totalItems={referralAcc.totalItemsCount}
                                                    itemsPerPage={referralAcc.itemsCountPerPage}
                                                    currentPage={referralAcc.activePage}
                                                    range={3}
                                                    pageChange={(page) => {
                                                        pageHasChangedAcc(page);
                                                    }}
                                                />
                                                {/* </div> */}
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
  
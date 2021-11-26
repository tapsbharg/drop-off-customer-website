import Link from "next/link";
import { Tab, Tabs } from "react-bootstrap";
import DashLayout from "../components/dashLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiFunc from "../services/api";
import PageModule from "../components/Pagination";
export default function HelpPage(props) {
    const router = useRouter()
    const params = router.query || '';
    const page = params.page || '';
    const [orderData, setOrderData] = useState({
        list: [],
        activePage: parseInt(page) || 1,
        itemsCountPerPage: 10,
    });
    const [orderDataClose, setOrderDataClose] = useState({
        list: [],
        activePage: parseInt(page) || 1,
        itemsCountPerPage: 10,
    });
     function getHelpdeskClose(){
        const getHelpPropsClose = {
            "page": orderData.activePage,
            "perPage": orderData.itemsCountPerPage
        }
        apiFunc.getHelpdeskClose(getHelpPropsClose).then((res)=>{
            setOrderDataClose({ ...orderDataClose, list: res.data.result });
        }).catch((error)=>{
            console.log(error);
        })
    }
    function getHelpdeskActive(){
        const getHelpProps = {
            "page": orderData.activePage,
            "perPage": orderData.itemsCountPerPage
        }
        apiFunc.getHelpdeskActive(getHelpProps).then((res)=>{
            setOrderData({ ...orderData, list: res.data.result });
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        getHelpdeskActive();
        getHelpdeskClose();
    },[page])

  //   pagehaschagned start
  function pageHasChanged(pageNumber) {
    if (pageNumber !== orderData.activePage) {
      setOrderData({
        ...orderData,
        activePage: pageNumber,
        list: [],
        listClose: [],
      });

      router.push({
        pathname: '/my-orders',
       query: values,
    }) 
    }
  }
  function pageHasChangedClose(pageNumber) {
    if (pageNumber !== orderData.activePage) {
      setOrderDataClose({
        ...orderDataClose,
        activePage: pageNumber,
        list: []
      });

      router.push({
        pathname: '/my-orders',
       query: values,
    }) 
    }
  }
  //   pagehaschagned end
// console.log(orderData)
    return (
      <>
      <DashLayout props={props}>
      <div className="description_right">
                    <div className="help_outer p-3 tabs03">
                        <div className="d-flex justify-content-between align-items-center">
                            <h6> Help </h6>
                            <Link href="/get-help"><span className="btn cus_btn custom01"> Get Help </span></Link>
                        </div> 
                        <Tabs defaultActiveKey="tab1" id="nav-tab" className="nav nav-tabs my-4">
                                <Tab eventKey="tab1" title="Active">
                                    <div className="orddeislWRp">
                                    {
                                        orderData.list.map((data,key)=>(
                                            <div className="order_loop my-3 px-3 py-2 bg-light02" key={key}>
                                                <ul>
                                                <li> <b> Ticket No. </b>: {data.ticketNumber} </li>
                                                <li> <b> Define Your Issue</b> : {data.issue} </li>
                                                <li> <b> Order Number </b>: {data.orderNumber} </li>
                                                <li> <b> Subject </b> : {data.subject} </li>
                                                <li> <b> Message </b> : {data.message} </li>
                                                </ul>
                                                <Link href={`/reply/${data._id}`}><span className="btn cus_btn custom01"> Reply </span></Link>
                                            </div> 
                                        ))
                                    }
                                    </div>
                                    <div className="table_botm_paging">
                                        <div className="table_border">
                                            <PageModule
                                            totalItems={orderData.totalItemsCount}
                                            itemsPerPage={orderData.itemsCountPerPage}
                                            currentPage={orderData.activePage}
                                            range={3}
                                            pageChange={(page) => {
                                                pageHasChanged(page);
                                            }}
                                            />
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="tab2" title="Closed">
                                    <div className="orddeislWRp">
                                    {
                                        orderDataClose.list.map((data,key)=>(
                                            <div className="order_loop my-3 px-3 py-2 bg-light02" key={key}>
                                                <ul>
                                                <li> <b> Ticket No. </b>: {data.ticketNumber} </li>
                                                <li> <b> Define Your Issue</b> : {data.issue} </li>
                                                <li> <b> Order Number </b>: {data.orderNumber} </li>
                                                <li> <b> Subject </b> : {data.subject} </li>
                                                <li> <b> Message </b> : {data.message} </li>
                                                </ul>
                                                <Link href="/reply/13256"><span className="btn cus_btn custom01"> Reply </span></Link>
                                            </div> 
                                        ))
                                    }
                                    </div>
                                    <div className="table_botm_paging">
                                        <div className="table_border">
                                            <PageModule
                                            totalItems={orderDataClose.totalItemsCount}
                                            itemsPerPage={orderDataClose.itemsCountPerPage}
                                            currentPage={orderDataClose.activePage}
                                            range={3}
                                            pageChange={(page) => {
                                                pageHasChangedClose(page);
                                            }}
                                            />
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                            
                        </div> 
                    </div>
      </DashLayout>
      </>
    )
  }
  
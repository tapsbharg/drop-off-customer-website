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
    const [FilterData,setFilterData]=useState({
        "page": parseInt(page) || 1,
        "perPage": 10
    })
    function getHelpdesk(data){
        apiFunc.getHelpdeskClose(data).then((res)=>{
            setOrderData({ ...orderData, list: res.data.result });
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        getHelpdesk(FilterData);
    },[])

  //   pagehaschagned start
  function pageHasChanged(pageNumber) {
    if (pageNumber !== orderData.activePage) {
      setOrderData({
        ...orderData,
        activePage: pageNumber,
        list: [],
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
                                        <div className="order_loop my-3 px-3 py-2 bg-light02">
                                            <ul>
                                            <li> <b> Ticket No. </b>: 151515151 </li>
                                            <li> <b> Define Your Issue</b> : Order Issue </li>
                                            <li> <b> Order Number </b>: 51515151 </li>
                                            <li> <b> Subject </b> : Wrong Order Received </li>
                                            <li> <b> Message </b> : I want refund </li>
                                            </ul>
                                            <Link href="/reply/13256"><span className="btn cus_btn custom01"> Reply </span></Link>
                                        </div> 
                                        <div className="order_loop my-3 p-4 bg-light02">
                                            <ul>
                                            <li> <b> Ticket No. </b>: 151515151 </li>
                                            <li> <b> Define Your Issue</b> : Order Issue </li>
                                            <li> <b> Order Number </b>: 51515151 </li>
                                            <li> <b> Subject </b> : Wrong Order Received </li>
                                            <li> <b> Message </b> : I want refund </li>
                                            </ul>
                                            <Link href="/reply/13256"><span className="btn cus_btn custom01"> Reply </span></Link> 
                                        </div> 
                                    </div>

                                </Tab>
                                <Tab eventKey="tab2" title="Closed">
                                    <div className="order_loop my-3 p-4 bg-light02">
                                        <ul>
                                            <li> <b> Ticket No. </b>: 151515151 </li>
                                            <li> <b> Define Your Issue</b> : Order Issue </li>
                                            <li> <b> Order Number </b>: 51515151 </li>
                                            <li> <b> Subject </b> : Wrong Order Received </li>
                                            <li> <b> Message </b> : I want refund </li>
                                        </ul>
                                        <Link href="/reply/13256"><span className="btn cus_btn custom01"> Reply </span></Link>
                                    </div> 
                                </Tab>
                            </Tabs>
                            <div className="table_botm_paging">
                            <div className="table_border">
                                {/* <div className="release"> */}
                                <PageModule
                                totalItems={orderData.totalItemsCount}
                                itemsPerPage={orderData.itemsCountPerPage}
                                currentPage={orderData.activePage}
                                range={3}
                                pageChange={(page) => {
                                    pageHasChanged(page);
                                }}
                                />
                                {/* </div> */}
                            </div>
                        </div>
                        </div> 
                    </div>
      </DashLayout>
      </>
    )
  }
  
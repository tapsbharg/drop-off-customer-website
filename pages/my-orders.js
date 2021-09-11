import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import DashLayout from "../components/dashLayout";
import apiFunc from "../services/api";
import PageModule from "../components/Pagination";



export default function MyOrdersPage(props) {    
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
        "perPage": 10,
        "status": 'pending'
    })
    function getOrdersAll(data){
        apiFunc.getOrdersAll(data).then((res)=>{
            setOrderData({ ...orderData, list: res.data.result });
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        getOrdersAll(FilterData);
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
                        <div className="my_order_outer"> 
                            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                                <h6>My Orders </h6>
                            </div>
                            <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example" className="mb-3">
                                
                                <Tab eventKey="tab1" title="Pending Orders">
                                <div className="row">
                                    {orderData.list.map((data, index)=>(
                                        <div className="col-lg-6 col-md-12 " key={index}>
                                            <div className="my_order bg-white border rounded-3 p-3 mb-3">
                                                <div className="my_order01 d-flex flex-wrap justify-content-between align-items-center vendmrnadpr">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-center vendrodewrp">
                                                        <div className="my_order_img">
                                                            <img src={data.vendorId.image.path} alt=""/>
                                                        </div>
                                                        <div className="my_order_content px-2">
                                                            <p> <b> {data.vendorId.storeName} </b>  
                                                            <span>{data.vendorId.address}</span> </p> 
                                                        </div>
                                                    </div>
                                                    <div className={`vendrStats ${data.status}`} href="#"> {data.status} </div> 
                                                </div>

                                                <ul className="my_order02 d-flex flex-wrap justify-content-between align-items-center py-3 my-3">
                                                    <li> 
                                                        <span> Ordered On </span> 
                                                        {data.createdAt} 
                                                    </li>
                                                    <li>  
                                                        <span> Scheduled For </span>
                                                        N/A
                                                    </li>
                                                </ul>
                                                <ul className="my_order03 d-flex flex-wrap justify-content-between align-items-center ">
                                                    <li> <a href="#"> ${data.payableAmount} </a> </li>
                                                    <li> <Link href={`/order-detail?orderId=${data._id}`}>Track Details </Link> </li>
                                                </ul>
                                            </div>
                                        </div>

                                    ))}
                                        
                                    </div>
                                </Tab>
                                
                            </Tabs>                           

                        </div>
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
      </DashLayout>
      
      
      </>
    )
  }
  
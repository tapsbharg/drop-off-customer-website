import Link from "next/link";
import { Tab, Tabs } from "react-bootstrap";
import Sidebar from "../components/sidebar";

export default function MyOrdersPage(props) {
    return (
      <>
        <section className="your-order py-5">
            <div className="container">
                <div className="customer_profile_outer d-flex flex-wrap ">
                    <div className="opction_left">
                        <Sidebar props={props} />
                    </div>
                    <div className="description_right">
                        <div className="my_order_outer"> 
                            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                                <h6>My Orders </h6>
                            </div>
                            <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="tab1" title="Pending Orders">
                                <div className="row">
                                        <div className="col-lg-6 col-md-12 ">
                                            <div className="my_order bg-white border rounded-3 p-3 mb-3">
                                                <div className="my_order01 d-flex flex-wrap justify-content-between align-items-center">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-center ">
                                                        <div className="my_order_img">
                                                            <img src="assets/images/web/order.jpg" alt=""/>
                                                        </div>
                                                        <div className="my_order_content px-2">
                                                            <p> <b> The Austin Store </b>  <span>Texas, USA</span> </p> 
                                                        </div>
                                                    </div>
                                                    <a className="pending" href="#"> Pending </a> 
                                                </div>

                                                <ul className="my_order02 d-flex flex-wrap justify-content-between align-items-center py-3 my-3">
                                                    <li> 
                                                        <span> Ordered On </span> 
                                                        May 03, 2021 02:12 PM 
                                                    </li>
                                                    <li>  
                                                        <span> Scheduled For </span>
                                                        N/A
                                                    </li>
                                                </ul>
                                                <ul className="my_order03 d-flex flex-wrap justify-content-between align-items-center ">
                                                    <li> <a href="#"> $811.11 </a> </li>
                                                    <li> <Link href="/order-detail?orderId=123456">Track Details </Link> </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-12 ">
                                            <div className="my_order bg-white border rounded-3 p-3  mb-3">
                                                <div className="my_order01 d-flex flex-wrap justify-content-between align-items-center">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-center ">
                                                        <div className="my_order_img">
                                                            <img src="assets/images/web/order.jpg" alt=""/>
                                                        </div>
                                                        <div className="my_order_content px-2">
                                                            <p> <b> The Austin Store </b>  <span>Texas, USA</span> </p> 
                                                        </div>
                                                    </div>
                                                    <a className="accepted" href="#"> Accepted </a> 
                                                </div>

                                                <ul className="my_order02 d-flex flex-wrap justify-content-between align-items-center py-3 my-3">
                                                    <li> 
                                                        <span> Ordered On </span> 
                                                        May 03, 2021 02:12 PM 
                                                    </li>
                                                    <li>  
                                                        <span> Scheduled For </span>
                                                        N/A
                                                    </li>
                                                </ul>
                                                <ul className="my_order03 d-flex flex-wrap justify-content-between align-items-center ">
                                                    <li> <a href="#"> $811.11 </a> </li>
                                                    <li> <Link href="/order-detail?orderId=123456">Track Details </Link> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                
                                </Tab>
                                <Tab eventKey="tab2" title="Past Orders">
                                <div className="row"> 
                                    <div className="col-lg-6 col-md-12">
                                        <div className="my_order bg-white border rounded-3 p-3  mb-3">
                                            <div className="my_order01 d-flex flex-wrap justify-content-between align-items-center">
                                                <div className="d-flex flex-wrap justify-content-between align-items-center ">
                                                    <div className="my_order_img">
                                                        <img src="assets/images/web/order.jpg" alt=""/>
                                                    </div>
                                                    <div className="my_order_content px-2">
                                                        <p> <b> The Austin Store </b>  <span>Texas, USA</span> </p> 
                                                    </div>
                                                </div>
                                                <a className="preparing" href="#"> Preparing </a> 
                                            </div>

                                            <ul className="my_order02 d-flex flex-wrap justify-content-between align-items-center py-3 my-3">
                                                <li> 
                                                    <span> Ordered On </span> 
                                                    May 03, 2021 02:12 PM 
                                                </li>
                                                <li>  
                                                    <span> Scheduled For </span>
                                                    N/A
                                                </li>
                                            </ul>
                                            <ul className="my_order03 d-flex flex-wrap justify-content-between align-items-center ">
                                                <li> <a href="#"> $811.11 </a> </li>
                                                <li> <Link href="/order-detail?orderId=123456">Track Details </Link> </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <div className="my_order bg-white border rounded-3 p-3  mb-3">
                                            <div className="my_order01 d-flex flex-wrap justify-content-between align-items-center">
                                                <div className="d-flex flex-wrap justify-content-between align-items-center ">
                                                    <div className="my_order_img">
                                                        <img src="assets/images/web/order.jpg" alt=""/>
                                                    </div>
                                                    <div className="my_order_content px-2">
                                                        <p> <b> The Austin Store </b>  <span>Texas, USA</span> </p> 
                                                    </div>
                                                </div>
                                                <a className="preparing" href="#"> Delivered </a> 
                                            </div>

                                            <ul className="my_order02 d-flex flex-wrap justify-content-between align-items-center py-3 my-3">
                                                <li> 
                                                    <span> Ordered On </span> 
                                                    May 03, 2021 02:12 PM 
                                                </li>
                                                <li>  
                                                    <span> Scheduled For </span>
                                                    N/A
                                                </li>
                                            </ul>
                                            <ul className="my_order03 d-flex flex-wrap justify-content-between align-items-center ">
                                                <li> <a href="#"> $811.11 </a> </li>
                                                <li> <Link href="/order-detail?orderId=123456">Track Details </Link> </li>
                                            </ul>
                                        </div>
                                    </div> 
                                </div>
                                
                                </Tab>
                            </Tabs>                           

                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
    )
  }
  
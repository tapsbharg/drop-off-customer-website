import Link from "next/link";
import { Tab, Tabs } from "react-bootstrap";
import DashLayout from "../components/dashLayout";

export default function HelpPage(props) {
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
                            
                        </div> 
                    </div>
      </DashLayout>
      </>
    )
  }
  
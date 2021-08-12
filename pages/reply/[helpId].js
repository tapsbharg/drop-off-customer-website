import DashLayout from "../../components/dashLayout";

export default function HelpReplyPage(props) {
    return (
      <>
      <DashLayout props={props}>
      <div className="description_right">

        <div className="chat_message_outer p-3">
            <h5> Ticket Number #1215461   </h5>
            
            <div className="chat_order_detail bg-light p-3 mb-3">
                <ul>
                    <li> <b> Ticket No. </b> : 151515151 </li>
                    <li> <b> Define Your Issue </b>  : Order Issue </li>
                    <li> <b> Order Number  </b> : 4145151 </li>
                    <li> <b> Subject  </b> : Wrong Order Received </li>
                    <li> <b> Message  </b> : I want refund </li>
                </ul>
            </div>

            <div className="chat_message">
                <div className="chat_message_images">
                    <img src="/assets/images/fev.jpg"/>
                </div>
                <div className="chat_message_contant">
                    <p>Hello. How are you today?</p>
                    <span className="time-right">11:00</span>
                </div>
            </div>
            <div className="chat_message">
                <div className="chat_message_images">
                    <img src="/assets/images/fev.jpg"/>
                </div>
                <div className="chat_message_contant">
                    <p>Hello. How are you today?</p>
                    <span className="time-right">11:00</span>
                </div>
            </div>
            <div className="right_chat d-flex">
                <input type="text" placeholder="Message"/>
                <button className="btn cus_btn custom01"> Send </button>
            </div>
        </div>

        </div>

        </DashLayout>
      </>
    )
  }
  
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DashLayout from "../../components/dashLayout";
import apiFunc from "../../services/api";
import * as Yup from "yup";
import Moment from "react-moment";

export default function HelpReplyPage(props) {
    const [orderData, setOrderData] = useState([]);
    const [helpChatData, setHelpChatData] = useState([]);
    const chatInput = useRef(null);
    const messagesEndRef = useRef(null);
    const router = useRouter();
    const params = router.query || null;
    const pageId = params.helpId || null;
    function getHelpdeskByid(id){
        apiFunc.getHelpdeskByid(id).then((res)=>{
            setOrderData(res.data.data);
        }).catch((error)=>{
            console.log(error)
        })
    }
    function getHelpChat(id){
        apiFunc.getHelpChatData(id).then((res)=>{
            setHelpChatData(res.data.data);
        }).catch((error)=>{
            console.log(error)
        })
    }
    function helpChatReply(data){
        chatInput.current.value='';
        apiFunc.helpChatReply(data).then((res)=>{
            getHelpChat(pageId)
            formik.setFieldValue('response','')
            // setHelpChatData(res.data.data);
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        pageId != null?getHelpdeskByid(pageId):null;
        pageId != null?getHelpChat(pageId):null;
        pageId != null?formik.setFieldValue('helpdeskId',pageId):null;
    },[pageId]);


    const initialValues = {
        helpdeskId: "",
        response: "",
      };
    const validationSchema = Yup.object({
        helpdeskId: Yup.string().required("help id is missing..."),
        response: Yup.string().required("Please enter keyword..."),
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async(values) => {
          console.log("submit", values);
          await helpChatReply(values);
        },
    });
    const scrollToBottom = () => {
        // messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        if(messagesEndRef.current != null){
            const scroll = messagesEndRef.current.scrollHeight - messagesEndRef.current.clientHeight;
            messagesEndRef.current.scrollTo(0, scroll);
            console.log(scroll) 
        }
    }
    useEffect(()=>{
        scrollToBottom();
    })
      

    return (
      <>
      <DashLayout props={props}>
      <div className="description_right">
        <div className="chat_message_outer p-3">
            <h5> Ticket Number #1215461   </h5>
            
            <div className="chat_order_detail bg-light p-3 mb-3">
                <ul>
                    <li> <b> Ticket No. </b> : {orderData.ticketNumber} </li>
                    <li> <b> Define Your Issue </b>  : {orderData.issue} </li>
                    <li> <b> Order Number  </b> : {orderData.orderNumber} </li>
                    <li> <b> Subject  </b> : {orderData.subject} </li>
                    <li> <b> Message  </b> :{orderData.message} </li>
                </ul>
            </div>
            <div className="chatMainbody" ref={messagesEndRef}>
                {helpChatData && (
                helpChatData.map((data, index)=>(
                    <div className="chatGroup" key={index}>
                        <div className="chatInsier">
                            {data.customerId?(
                                <div className="chat_message receiverChat">
                                    <div className="chat_message_contant">
                                        <p>{data.response}</p>
                                        <span className="time-right">
                                            <Moment format="HH:MM A" withTitle>
                                                {data.createdAt}
                                            </Moment>
                                        </span>
                                    </div>
                                    <div className="chat_message_images">
                                        <img src="/assets/images/fev.jpg"/>
                                    </div>
                                </div>
                            ):(
                                <div className="chat_message senderChat">
                                    <div className="chat_message_images">
                                        <img src="/assets/images/fev.jpg"/>
                                    </div>
                                    <div className="chat_message_contant">
                                        <p>{data.response}</p>
                                        <span className="time-right">
                                            <Moment format="HH:MM A" withTitle>
                                                {data.createdAt}
                                            </Moment>
                                        </span>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                )))}
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="chatsubmitblwpr">
                    <div className="chatInput">
                        <input type="text"  ref={chatInput} {...formik.getFieldProps("response")} placeholder="Message"/>
                        {formik.touched.response && formik.errors.response ? (
                            <div className="errorMsg">{formik.errors.response}</div>
                        ) : null}
                    </div>
                    <div className="chatSubmit">
                        <button type="submit" className="btn cus_btn custom01"> Send </button>
                    </div>
                </div>
            </form>
            
        </div>

        </div>

        </DashLayout>
      </>
    )
  }
  
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
  const [imageId, setImageId] = useState();

  const chatInput = useRef(null);
  const messagesEndRef = useRef(null);
  const router = useRouter();
  const params = router.query || null;
  const pageId = params.helpId || null;
  function getHelpdeskByid(id) {
    apiFunc
      .getHelpdeskByid(id)
      .then((res) => {
        setOrderData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getHelpChat(id) {
    apiFunc
      .getHelpChatData(id)
      .then((res) => {
        setHelpChatData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function helpChatReply(data) {
    chatInput.current.value = "";
    apiFunc
      .helpChatReply(data)
      .then((res) => {
        getHelpChat(pageId);
        formik.setFieldValue("response", "");
        // setHelpChatData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    pageId != null ? getHelpdeskByid(pageId) : null;
    pageId != null ? getHelpChat(pageId) : null;
    pageId != null ? formik.setFieldValue("helpdeskId", pageId) : null;
  }, [pageId]);

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
    onSubmit: async (values) => {
      console.log("submit", values);
      await helpChatReply(values);
    },
  });
  const scrollToBottom = () => {
    // messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    if (messagesEndRef.current != null) {
      const scroll =
        messagesEndRef.current.scrollHeight -
        messagesEndRef.current.clientHeight;
      messagesEndRef.current.scrollTo(0, scroll);
      console.log(scroll);
    }
  };
  useEffect(() => {
    scrollToBottom();
  });

  function uploadLicense(postData) {
    console.log("postData", postData);
    setImageId(postData.license);
    const formData = new FormData();
    formData.append("coverImage", postData.license);
    apiFunc
      .postUpload(formData)
      .then((res) => {
        setImageId(res.data.data._id);
        let postData = {
          response: "img",
          helpdeskId: pageId,
          image: res.data.data._id,
        };

        helpChatReply(postData);
        getHelpChat(pageId);
        //   .then(() => {
        //     console.log("calling");
        //     setImageId("");
        //     // setState({ response: "" });
        //     return console.log("calling");
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     return err.message;
        //   });
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  }

  const handleFileChangeLicense = (e) => {
    var getfile = e.target.files[0];
    if (getfile != undefined || getfile != null) {
      uploadLicense({ license: e.target.files[0] });
    }
  };

  return (
    <>
      <DashLayout props={props}>
        <div className="description_right">
          <div className="chat_message_outer p-3">
            <h5> Ticket Number #{orderData.ticketNumber} </h5>

            <div className="chat_order_detail bg-light p-3 mb-3">
              <ul>
                <li>
                  {" "}
                  <b> Ticket No. </b> : {orderData.ticketNumber}{" "}
                </li>
                <li>
                  {" "}
                  <b> Define Your Issue </b> : {orderData.issue}{" "}
                </li>
                <li>
                  {" "}
                  <b> Order Number </b> : {orderData.orderNumber}{" "}
                </li>
                <li>
                  {" "}
                  <b> Subject </b> : {orderData.subject}{" "}
                </li>
                <li>
                  {" "}
                  <b> Message </b> :{orderData.message}{" "}
                </li>
              </ul>
            </div>
            <div className="chatMainbody" ref={messagesEndRef}>
              {helpChatData &&
                helpChatData.map((data, index) => (
                  <div className="chatGroup" key={index}>
                    <div className="chatInsier">
                      {data.customerId ? (
                        <div className="chat_message receiverChat">
                          <div className="chat_message_contant">
                            {data.image ? (
                              <>
                                <p
                                  className="chat_message_contant d-flex"
                                  style={{ padding: "0px" }}
                                >
                                  <img
                                    src={data.image.path}
                                    alt="image"
                                    style={{
                                      width: "90px",
                                      height: "90px",
                                      border: "2px solid grey",
                                      borderRadius: "5px",
                                      paddingLeft: "0px",
                                    }}
                                  />
                                </p>
                              </>
                            ) : (
                              <p>{data.response}</p>
                            )}
                            <span className="time-right">
                              <Moment format="HH:MM A" withTitle>
                                {data.createdAt}
                              </Moment>
                            </span>
                          </div>
                          <div className="chat_message_images">
                            <img src="/assets/images/fev.jpg" />
                          </div>
                        </div>
                      ) : (
                        <div className="chat_message senderChat">
                          <div className="chat_message_images">
                            <img src="/assets/images/fev.jpg" />
                          </div>
                          <div className="chat_message_contant">
                            {data.image ? (
                              <>
                                <p
                                  className="chat_message_contant d-flex"
                                  style={{ padding: "0px" }}
                                >
                                  <img
                                    src={data.image.path}
                                    alt="image"
                                    style={{
                                      width: "90px",
                                      height: "90px",
                                      border: "2px solid grey",
                                      borderRadius: "5px",
                                      paddingLeft: "0px",
                                    }}
                                  />
                                </p>
                              </>
                            ) : (
                              <p>{data.response}</p>
                            )}
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
                ))}
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="chatsubmitblwpr">
                {/* attachment part start */}
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    display: "flex",
                    margin: "5px",
                  }}
                >
                  <label htmlFor="prescription">
                    <img src="/assets/images/pin.png" alt="Attachement" />
                  </label>
                  <input
                    type="file"
                    name="license"
                    id="prescription"
                    className="inputImageFilehere"
                    style={{ display: "none" }}
                    onChange={handleFileChangeLicense}
                    accept="image/png, image/gif, image/jpeg"
                  />
                </div>
                {/* attachment part end */}

                <div className="chatInput">
                  {/* {imageId ? (
                    <input
                      type="text"
                      placeholder="Image Selected Please click on send to upload"
                      disabled
                      id="response"
  
                    />
                  ) : ( */}
                  <input
                    type="text"
                    ref={chatInput}
                    {...formik.getFieldProps("response")}
                    placeholder="Message"
                  />
                  {/* )} */}
                  {/* {formik.touched.response && formik.errors.response ? (
                            <div className="errorMsg">{formik.errors.response}</div>
                        ) : null} */}
                </div>
                <div className="chatSubmit">
                  {/* {imageId ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        uploadLicense({ license: imageId });
                      }}
                      className="btn cus_btn custom01"
                    >
                      Send
                    </button>
                  ) : ( */}
                  <button type="submit" className="btn cus_btn custom01">
                    Send
                  </button>
                  {/* )} */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </DashLayout>
    </>
  );
}

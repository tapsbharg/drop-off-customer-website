import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import ROOT_URL from "../services/api-url";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
export default function VerifyOtpPage(props) {
    const[email, setEmail]=useState(null)
    const[otp, setOtp]=useState(null);
    const[OTPData, setOTPData]=useState({
        otp1:'',
        otp2:'',
        otp3:'',
        otp4:'',
    });
    
    const baseURL=ROOT_URL;
    const history = useRouter();
    
    const initialValues = {
      email: "",
      otp: "",
    };
    useEffect(()=>{
        const userEmail=reactLocalStorage.get("RegisterEmail");
        console.log(userEmail)
        setEmail(userEmail);
        formik.setFieldValue('email', userEmail)
    },[email])
    useEffect(()=>{
        let otp1=OTPData.otp1
        let otp2=OTPData.otp2
        let otp3=OTPData.otp3
        let otp4=OTPData.otp4
        let otpvalue=otp1+otp2+otp3+otp4
        setOtp(otpvalue);
        formik.setFieldValue('otp', otpvalue)
    },[OTPData])
    const validationSchema = Yup.object({
        email:Yup.string()
          .email('Please enter valid email')
          .required('Please enter email'),
          otp: Yup.string().required("Please enter code"),
    });
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        reactLocalStorage.remove("RegisterEmail")
        console.log("submit", values);
        otpVerify(values);
      },
    });
    const otpVerify = (userData) => {
      axios
        .post(`${baseURL}/verifyPhone`, userData)
        .then((res) => {
          if(res.data.data != undefined){
            toast.success('success');
            history.push("/sign-in");
          }else{
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    };
    const inputfocus = (elmnt) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
          const next = elmnt.target.tabIndex - 2;
          if (next > -1) {
            elmnt.target.form.elements[next].focus()
          }
        }
        else {
            const next = elmnt.target.tabIndex;
            if (next < 5) {
              elmnt.target.form.elements[next].focus()
            }
        }
    }
    function handleChange(value1, event) {
        setOTPData({
            ...OTPData,
            [value1]:event.target.value
        });
    }
    return (
      <>
      <ToastContainer />
        <div className="sign_up_outer">
            <div className="container">
            <div className="sign_up_inner mt-5">
                <div className="row">
                    <div className="col-sm-6" data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                        <img src="assets/images/sign-up.svg" alt=""/>
                    </div>
                    <div className="col-sm-6" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                        <div className="sign_upform comman_from my-4">
                            <form className="verify_otp" onSubmit={formik.handleSubmit}>  
                                <h5> Verify OTP </h5>
                                <p className="text-center"> Please enter the OTP we have sent to you. </p>
                                <div className="enter_code" id="form">
                                <input
                                    name="otp1"
                                    type="text"
                                    autoComplete="off"
                                    className="otpInput"
                                    value={OTPData.otp1}
                                    onChange={e => handleChange("otp1", e)}
                                    tabIndex="1" maxLength="1" onKeyUp={e => inputfocus(e)}

                                />
                                <input
                                    name="otp2"
                                    type="text"
                                    autoComplete="off"
                                    className="otpInput"
                                    value={OTPData.otp2}
                                    onChange={e => handleChange("otp2", e)}
                                    tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e)}

                                />
                                <input
                                    name="otp3"
                                    type="text"
                                    autoComplete="off"
                                    className="otpInput"
                                    value={OTPData.otp3}
                                    onChange={e => handleChange("otp3", e)}
                                    tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e)}

                                />
                                <input
                                    name="otp4"
                                    type="text"
                                    autoComplete="off"
                                    className="otpInput"
                                    value={OTPData.otp4}
                                    onChange={e => handleChange("otp4", e)}
                                    tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e)}

                                />

                                </div>
                                <span className="resend"> Didn't receive ? <a href="#">  Resend </a> </span>
                                
                                {formik.touched.otp && formik.errors.otp ? (
                                    <div className="errorMsg text-center">{formik.errors.otp}</div>
                                    ) : null}
                                <div className="submitbtn text-center">
                                    <button type="submit" className="btn cus_btn custom01"> Verify </button>
                                </div>
                                <span> Already have an account ? <Link href="/sign-in"> Sign In </Link> </span>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </>
    )
  }
  
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import ROOT_URL from "../services/api-url";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import common from "../services/common";

export default function ResetPasswordPage(props) {
    const [successModal,setSuccessModal]=useState(false);
    const signInModal = (type) =>{
        setSuccessModal(type)
    }
    const baseURL=ROOT_URL;
    const history = useRouter();
    const initialValues = {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    };
    const validationSchema = Yup.object({
      email:Yup.string()
          .email('Please enter valid email')
          .required('Please enter email'),
      otp:Yup.string().required('Please enter email'),
      password:Yup.string().required('Please enter password'),
      confirmPassword:Yup.string().required('Please enter confirm password').test("match", "password isn't match", (values)=>{
          return values == formik.values.password;
      }),
    });
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
          console.log(values)
          resetPassword(values);
      },
    });
    const resetPassword = (values) =>{
        common.loader(true);
        axios.post(`${baseURL}/resetPassword`, values).then((res) => {
            toast.success(res.data.message);
            signInModal(true)
            common.loader(false);
            // history.push('sign-in');
        }).catch((error) => {
            common.loader(false);
            var message = JSON.parse(error.request.response).message;
            toast.error(message);
        });
    };
    useEffect(()=>{
        let email = reactLocalStorage.get('email');
        let otp = reactLocalStorage.get('otp');
        if(email){
            formik.setFieldValue('email', email)
        }        
        if(otp){
            formik.setFieldValue('otp', otp)
        }        
    },[])
    return (
      <>
        <section className="sign_up_outer">
            <div className="container">
                <div className="sign_up_inner mt-5">
                    <div className="row">
                        <div className="col-sm-6" data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                            <img src="assets/images/sign-up.svg" alt=""/>
                        </div>
                        <div className="col-sm-6" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                            <div className="sign_upform comman_from my-4">
                                <form onSubmit={formik.handleSubmit}>
                                    <h5> Reset Password </h5>
                                    <div className="mb-3">
                                        <label className="form-label">OTP</label>
                                        <input type="text" {...formik.getFieldProps("otp")} className="form-control"  placeholder="Enter OTP"/>
                                        {formik.touched.otp && formik.errors.otp ? (
                                            <div className="errorMsg">{formik.errors.otp}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Enter New Password</label>
                                        <input type="password" {...formik.getFieldProps("password")} className="form-control"  placeholder="Enter Your New Password"/>
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="errorMsg">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirm Your Password</label>
                                        <input type="password" {...formik.getFieldProps("confirmPassword")} className="form-control" placeholder="Enter Your Confirm Password"/>
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                            <div className="errorMsg">{formik.errors.confirmPassword}</div>
                                        ) : null}
                                    </div> 
                                    <div className="submitbtn text-center">
                                    <button type="submit" className="btn cus_btn custom01"> Reset Password </button>
                                </div>
                                    <span> Already have an account ? <Link href="/sign-in"> Sign In </Link> </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Modal
                show={successModal}
                onHide={()=>{signInModal(false)}}
                backdrop="static"
                keyboard={false}
                className="modal-gray"
                centered
            >
                <div className="pass_rest_success">
                    <div className="pass_rest_success_contant bg-white p-5"  data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="0">
                        {/* <i className="fal fa-times-circle" onClick={()=>{signInModal(false)}}></i> */}
                        <h5> Password Reset Successfully </h5>
                        <p>You have successfully reset your password. Please use your new password when signing in.</p>
                        <Link href="/sign-in"><span className="btn cus_btn custom01"> Sign In </span></Link>
                    </div>
                </div>
            </Modal>
      </>
    )
  }
  
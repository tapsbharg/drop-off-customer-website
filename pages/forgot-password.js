import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import ROOT_URL from "../services/api-url";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import common from "../services/common";

export default function ForgotPasswordPage(props) {
    const baseURL=ROOT_URL;
    const history = useRouter();
    const initialValues = {
      email: "",
    };
    const validationSchema = Yup.object({
      email:Yup.string()
          .email('Please enter valid email')
          .required('Please enter email'),
    });
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
          console.log(values)
        forgotPassword(values);
      },
    });
    const forgotPassword = (values) =>{
        common.loader(true);
        setTimeout(() => {
            common.loader(false);
        }, 3000);
        reactLocalStorage.set('email',values.email)
        axios.post(`${baseURL}/forgotPassword`, values).then((res) => {
            toast.success(res.data.message);  
            reactLocalStorage.set('otp',res.data.otp)          
            common.loader(false);
            history.push('reset-password');
        }).catch((error) => {
            var message = JSON.parse(error.request.response).message;
            toast.error(message);
        });
    };

    return (
      <>
        <section className="sign_up_outer">
            <div className="container">
            <div className="sign_up_inner mt-5">
                <div className="row">
                    <div className="col-sm-6"  data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                        <img src="assets/images/sign-up.svg" alt=""/>
                    </div>
                    <div className="col-sm-6"  data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                        <div className="sign_upform comman_from my-4">
                            <form  onSubmit={formik.handleSubmit}>
                                <h5> Forgot Password </h5>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" {...formik.getFieldProps("email")} className="form-control" id="" placeholder="Enter Your Email"/>
                                    {formik.touched.email && formik.errors.email ? (
                                    <div className="errorMsg">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="submitbtn text-center">
                                    <button type="submit" className="btn cus_btn custom01"> Send OTP </button>
                                </div>
                                <span> Already have an account ? <Link href="/sign-in"> Sign In </Link> </span>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
      </>
    )
  }
  
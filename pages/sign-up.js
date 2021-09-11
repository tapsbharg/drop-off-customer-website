import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import ROOT_URL from "../services/api-url";
import * as Yup from "yup";
export default function SignUpPage(props) {
    const baseURL=ROOT_URL;
    const history = useRouter();
    const initialValues = {
      name: "",
      email: "",
      code: "",
      phone: "",
      password: "",
      termscheck: "",
    };
    const validationSchema = Yup.object({
        name: Yup.string().required("Please enter name"),
        email:Yup.string()
          .email('Please enter valid email')
          .required('Please enter email'),
        code: Yup.string().required("Please enter code"),
        phone: Yup.string().required("Please enter phone"),
        password: Yup
        .string()
        .required("Please enter password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
        termscheck: Yup.string().required("Please check terms and privacy policy"),
    });
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        console.log("submit", values);
        signUp(values);
      },
    });
    const signUp = (userData) => {
      axios
        .post(`${baseURL}/signup`, userData)
        .then((res) => {
          if(res.data.data != undefined){
            reactLocalStorage.set("RegisterEmail", res.data.data.email);
            toast.success('success');
            // props.setlogin();
            history.push("/verify-otp");
          }else{
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    };
    return (
      <>
      <ToastContainer />
        <section className="sign_up_outer">
            <div className="container">
            <div className="sign_up_inner mt-1">
                <div className="row">
                    <div className="col-sm-6 d-flex justify-content-center align-items-center" data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                        <img src="/assets/images/sign-up.svg" alt=""/>
                    </div>
                    <div className="col-sm-6" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                        <div className="sign_upform comman_from my-4">
                            <form onSubmit={formik.handleSubmit}>
                                <h5> Create An Account </h5>
                                <div className="mb-3">
                                    <label className="form-label"> name</label>
                                    <input type="text" {...formik.getFieldProps("name")} className="form-control" placeholder="Enter Your Name"/>
                                    {formik.touched.name && formik.errors.name ? (
                                    <div className="errorMsg">{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">email</label>
                                    <input type="email" {...formik.getFieldProps("email")} className="form-control" id="" placeholder="Enter Your Email"/>
                                    {formik.touched.email && formik.errors.email ? (
                                    <div className="errorMsg">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Code</label>
                                    <input type="text" {...formik.getFieldProps("code")} className="form-control" id="" placeholder="Enter Your  code"/>
                                    {formik.touched.code && formik.errors.code ? (
                                    <div className="errorMsg">{formik.errors.code}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mobile Number</label>
                                    <input type="number" {...formik.getFieldProps("phone")} className="form-control" id="" placeholder="Enter Your Mobile Number"/>
                                    {formik.touched.phone && formik.errors.phone ? (
                                    <div className="errorMsg">{formik.errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" {...formik.getFieldProps("password")} className="form-control" id="" placeholder="Enter Your Password"/>
                                    {formik.touched.password && formik.errors.password ? (
                                    <div className="errorMsg">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Referral Code</label>
                                    <input type="text" {...formik.getFieldProps("referral")} className="form-control" id="" placeholder="Enter Referral Code"/>
                                </div>
                                
                                
                                
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input type="checkbox" {...formik.getFieldProps("termscheck")} className="form-check-input" id="exampleCheck1"/>
                                        <label className="checkbox form-check-label" for="exampleCheck1">
                                            By Creating an account, you agree to our <br/>
                                            <a href="">terms & condition </a>and <a href=""> Privacy policy </a>
                                        </label>
                                    </div>
                                    {formik.touched.termscheck && formik.errors.termscheck ? (
                                    <div className="errorMsg">{formik.errors.termscheck}</div>
                                    ) : null}
                                </div>
                                <div className="text-center">
                                    <label className="mb-2">
                                    "By continuing you will receive a one-time verification code to your phone number by SMS. Message and data rates may apply."
                                    </label>
                                    <button className="btn cus_btn custom01"> Sign Up </button>
                                </div>
                                <div className="continu_social_icons my-3">
                                    <label > Continue with : </label>
                                    <ul className="d-flex align-items-center  justify-content-center my-2">
                                        <li><a href="#"> <i className="fab fa-facebook"></i> </a></li>
                                        <li><a href="#"> <i className="fab fa-google"></i> </a></li>
                                    </ul>
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
  
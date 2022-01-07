import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import ROOT_URL from "../services/api-url";
import * as Yup from "yup";
import apiFunc from "../services/api";
export default function SignInPage(props) {
  const baseURL=ROOT_URL;
  const history = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email:Yup.string()
        .email('Please enter valid email')
        .required('Please enter email'),
    password: Yup.string().required("Please enter password"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // console.log("submit", values);
      login(values);
    },
  });
  function mergeCart(id){
    common.loader(true);
    apiFunc.userCartMerge(id).then((res)=>{
      // console.log(res)
      reactLocalStorage.remove("guestid");
      props.setlogin();
      common.loader(false);
      history.push("/profile");
    }).catch((error)=>{
      var message = JSON.parse(error.request.response).message;
      toast.error(message);
      common.loader(false);
    })
  }
  const login = (userData) => {
    axios
      .post(`${baseURL}/login`, userData)
      .then((res) => {
        // console.log(res);
        if(res.data.data != undefined){
          reactLocalStorage.set("token", res.data.data.token);
          reactLocalStorage.set("userId", res.data.data._id);
          toast.success(res.data.message);
          const getId=reactLocalStorage.get("guestid");
          if(getId && props.cartData.cart.length > 0){
            mergeCart(getId)
          }else{
            props.setlogin();
            history.push("/profile");
          }
          
          
        }else{
          toast.error(res.data.message);
        }
      }).catch((error) => {
        var message = JSON.parse(error.request.response).message;
        toast.error(message);
      });
      
  };
    return (
      <>
      <ToastContainer />
        <section className="sign_up_outer">
            <div className="container">
            <div className="sign_up_inner my-5">
                <div className="row">
                    <div className="col-sm-6"  data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                        <img src="assets/images/sign-up.svg" alt=""/>
                    </div>
                    <div className="col-sm-6"  data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                        <div className="sign_upform comman_from my-4">
                            <form onSubmit={formik.handleSubmit}>
                                <h5> Sign In To Your Account </h5>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" {...formik.getFieldProps("email")} className="form-control" placeholder="Enter Your Email"/>
                                    {formik.touched.email && formik.errors.email ? (
                                    <div className="errorMsg">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" {...formik.getFieldProps("password")} className="form-control" placeholder="Enter Your Password"/>
                                    {formik.touched.password && formik.errors.password ? (
                                    <div className="errorMsg">{formik.errors.password}</div>
                                    ) : null}
                                </div> 
                                <span className="forgot_pass"> <Link href="/forgot-password"> Forgot Password? </Link> </span>
                                <div className="submitbtn text-center">
                                    <button className="btn cus_btn custom01"> Sign In </button>
                                </div>
                                <div className="continu_social_icons my-3">
                                    <label> Continue with : </label>
                                    <ul className="d-flex align-items-center  justify-content-center my-2">
                                        <li><a href="#"> <i className="fab fa-facebook"></i> </a></li>
                                        <li><a href="#"> <i className="fab fa-google"></i> </a></li>
                                    </ul>
                                </div>
                                <span>Already have an account ? <Link href="/sign-up"> Sign Up Now </Link> </span>
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
  
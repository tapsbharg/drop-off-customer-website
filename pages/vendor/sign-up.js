import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import ROOT_URL from "../../services/api-url";
import * as Yup from "yup";
import common from "../../services/common";
import { useEffect, useState } from "react";
export default function SignUpPage(props) {
    const VendroBaseURL='https://doapi.alphonic.net.in/api/v1/v';
    const history = useRouter();
    const [category,setCategory]=useState(null);
    const initialValues = {
        storeName: "",
        location: {},
        storeType: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        appPassword: "",
    };
    const validationSchema = Yup.object({
        location: Yup.object().required("Please enter location"),
        storeName: Yup.string().required("Please enter store name"),
        storeType: Yup.string().required("Please enter store type"),
        email:Yup.string()
          .email('Please enter valid email')
          .required('Please enter email'),
        phone:Yup
        .mixed()
        .required("Please enter phone number")
        .test("number", "Please enter valid number", (value) => {
            if(value == undefined || value == null){
                return false;
            }
            return common.isMobile(value);
        }),
        appPassword: Yup
        .string()
        .required("Please enter app password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
        password: Yup
        .string()
        .required("Please enter password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
        confirmPassword: Yup.string().required('Please enter confirm password').test("match", "password isn't match", (values)=>{
            return values == formik.values.password;
        }),
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
        common.loader(true);
      axios
        .post(`${VendroBaseURL}/signup`, userData)
        .then((res) => {
          if(res.data.data != undefined){
            toast.success('success');
            // props.setlogin();
            common.loader(false);
            //http://staging.alphonic.net.in:6200
            // console.log(res.data.data)
            let urlOrigin = 'https://vendor.alphonic.net.in'
            history.push({
                    pathname: `${urlOrigin}/verifyEmail`,
                    query: { email: userData.email, otp: res.data.otp}
                });
          }else{
            common.loader(false);
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          var message = JSON.parse(error.request.response).message;
          toast.error(message);
          common.loader(false);
        });
    };
    function getCategory(){
        axios.get(`${VendroBaseURL}/vendorCategory/getAll`)
        .then((res) => {
            setCategory(res.data.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        getCategory();
        formik.setFieldValue('location',{
            type: "Point",
            coordinates: [letlong().lng, letlong().let]
        })
    },[])

    const letlong = () =>{
        
        let geoL = reactLocalStorage.get('geoLocal');
        let coords={
          lat: 0,
          lng: 0
        };
        if(geoL){
          coords = JSON.parse(geoL)
        }
        // return common.coordinate()
        return {
          let:coords.lat || 0,
          lng:coords.lng || 0
        }
      }



    return (
      <>
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
                                <h5> Vendor Signup </h5>
                                <div className="mb-3">
                                    <label className="form-label">Store Name</label>
                                    <input type="storeName" {...formik.getFieldProps("storeName")} className="form-control" placeholder="Enter Your Store Name"/>
                                    {formik.touched.storeName && formik.errors.storeName ? (
                                    <div className="errorMsg">{formik.errors.storeName}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"> Store Type</label>
                                    <select {...formik.getFieldProps("storeType")} className="form-control">
                                        <option value="">Select</option>
                                        {category && category.map((data,key)=>(
                                            <option value={data._id} key={key}>{data.name}</option>
                                        ))}
                                    </select>
                                    {formik.touched.storeType && formik.errors.storeType ? (
                                    <div className="errorMsg">{formik.errors.storeType}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" {...formik.getFieldProps("email")} className="form-control" placeholder="Enter Your Email"/>
                                    {formik.touched.email && formik.errors.email ? (
                                    <div className="errorMsg">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                {/* <div className="mb-3">
                                    <label className="form-label">Code</label>
                                    <input type="text" {...formik.getFieldProps("code")} className="form-control" id="" placeholder="Enter Your  code"/>
                                    {formik.touched.code && formik.errors.code ? (
                                    <div className="errorMsg">{formik.errors.code}</div>
                                    ) : null}
                                </div> */}
                                {/* <div className="mb-3">
                                    <label className="form-label">Country Code</label>
                                    <input type="number" {...formik.getFieldProps("code")} className="form-control" placeholder="Enter Country Code"/>
                                    {formik.touched.code && formik.errors.code ? (
                                    <div className="errorMsg">{formik.errors.code}</div>
                                    ) : null}
                                </div> */}
                                <div className="mb-3">
                                    <label className="form-label">Mobile Number</label>
                                    <input type="number" {...formik.getFieldProps("phone")} className="form-control" placeholder="Enter Your Mobile Number"/>
                                    {formik.touched.phone && formik.errors.phone ? (
                                    <div className="errorMsg">{formik.errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" {...formik.getFieldProps("password")} className="form-control" placeholder="Enter Your Password"/>
                                    {formik.touched.password && formik.errors.password ? (
                                    <div className="errorMsg">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="text" {...formik.getFieldProps("confirmPassword")} className="form-control" placeholder="Enter Your Confirm Password"/>
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="errorMsg">{formik.errors.confirmPassword}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">App Password</label>
                                    <input type="appPassword" {...formik.getFieldProps("appPassword")} className="form-control" placeholder="Enter Your appPassword"/>
                                    {formik.touched.appPassword && formik.errors.appPassword ? (
                                    <div className="errorMsg">{formik.errors.appPassword}</div>
                                    ) : null}
                                </div>
                                
                                
                                {/* <div className="mb-3">
                                    <div className="form-check">
                                        <input type="checkbox" {...formik.getFieldProps("termscheck")} className="form-check-input" id="exampleCheck1"/>
                                        <label className="checkbox form-check-label" htmlFor="exampleCheck1">
                                            By Creating an account, you agree to our <br/>
                                            <a href="">terms & condition </a>and <a href=""> Privacy policy </a>
                                        </label>
                                    </div>
                                    {formik.touched.termscheck && formik.errors.termscheck ? (
                                    <div className="errorMsg">{formik.errors.termscheck}</div>
                                    ) : null}
                                </div> */}
                                <div className="text-center">
                                    {/* <label className="mb-2">
                                    "By continuing you will receive a one-time verification code to your phone number by SMS. Message and data rates may apply."
                                    </label> */}
                                    <button type="submit" className="btn cus_btn custom01"> Sign Up </button>
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
  
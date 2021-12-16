import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup"
import apiFunc from "../services/api";
import common from "../services/common";



function CouponComp(props){
//couponIsvalid
    const [coupon, setCoupon] = useState({});
    const [couponError, setCouponError] = useState(null);
    const [couponSuccess, setCouponSuccess] = useState(null);
    const initialValues = {
        couponCode:'',
        orderAmount:''
    }
    const validationSchema = Yup.object({
        couponCode:Yup.string().required("Please enter coupon code"),
        orderAmount:Yup.string().required("Please enter order amount"),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:(values)=>{
            console.log("submit",values)
            couponIsvalid(values)
        }
    });
    function removeCoupon(){
        props.setDataCoupon({
            couponObj:{},
            couponDiscount:0
        })
        setCoupon({});
        formik.setFieldValue('couponCode','');
        setCouponSuccess(false);
    }
    function couponIsvalid(values){
        apiFunc.couponIsvalid(values).then((res) => {
            let couponObj = res.data.result;
            setCoupon(couponObj);
            couponObj.price = props.total
            let couponDiscount = common.coupanTypeDiscount(couponObj)
            props.setDataCoupon({
                couponObj:couponObj,
                couponDiscount:couponDiscount
            })
            setCouponSuccess(true)
        })
        .catch((err) => {
            let errMsg = err.response.data.message
            setCouponError(errMsg)
            removeCoupon();
            setTimeout(() => {
                setCouponError(null)
            }, 3000);
        });
    }
    useEffect(()=>{
        if(props.total){
            formik.setFieldValue('orderAmount',props.total);
        }
    },[props])
    return(
        <>
            <div className="summer_box01 mb-3">
            {couponSuccess ? (
                <>
                    <div className="aply_cpuoWrp">
                        <div className="coupicon">
                        <i className="fa fa-percent"></i>
                        </div>
                        <div className="coupicodebox">
                            {coupon.couponCode}
                        </div>
                        <div className="coupi_remove">
                            <a onClick={removeCoupon}><i className="fa fa-times"></i></a>
                        </div>
                    </div>
                </>
            ):(
                <>
                <form onSubmit={formik.handleSubmit}>
                    <div className={`couponWrapper d-flex ${couponSuccess?'coupActive':''}`}>
                        <div className="coupinpyt">
                            <input type="text" className="bg-light02 p-3 form-control" {...formik.getFieldProps("couponCode")} placeholder="Enter Coupon Code"></input>
                        </div>
                        <button type="submit" className="codeVeryfy">Apply</button>
                    </div>
                    {(formik.touched.couponCode && formik.errors.couponCode) && (!couponError) ? (
                        <div className="errorMsg">{formik.errors.couponCode}</div>
                    ) : null}
                    {couponError && (
                        <div className="errorMsg">{couponError}</div>
                    )}
                </form>
                </>
            )}
                
            </div>
        </>
    )
}

export default CouponComp;
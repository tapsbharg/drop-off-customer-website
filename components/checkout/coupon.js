import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup"
import apiFunc from "../../services/api";
import common from "../../services/common";
import { Modal } from "react-bootstrap"
import { UserContext } from "../context/locationContext";



function CouponComp(props){
    const context = useContext(UserContext);
//couponIsvalid
    const [coupon, setCoupon] = useState({});
    const [couponError, setCouponError] = useState(null);
    const [couponSuccess, setCouponSuccess] = useState(null);
    const [couponLS, setCouponList] = useState([]);
    const [couponModal,setCouponModal]=useState(false);
    const couponModalFunc = (type) =>{
        setCouponModal(type)
    }
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
        /* props.setDataCoupon({
            couponObj:{},
            couponDiscount:0
        }) */
        context.setCouponData({});
        context.setCouponId('');
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
            /* props.setDataCoupon({
                couponObj:couponObj,
                couponDiscount:couponDiscount
            }) */
            context.setCouponData(couponObj);
            context.setCouponId(couponObj._id);
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
    const searchCoupon = (strg) =>{
        couponList(strg)
    }
    const couponList = (strg)=>{
        let data = {
            "vendorId": props.vendorId,
            "searchString": strg
        }
        couponModalFunc(true);
        apiFunc.couponList(data).then((res)=>{
            setCouponList(res.data.result)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const applyCoupon = (data) =>{
        let cpData={
            couponCode:data.couponCode,
            orderAmount:props.total
        }
        couponIsvalid(cpData);
        couponModalFunc(false)
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
                    <div className="couponListwrp">
                        <a onClick={()=>couponList()}>View Coupons</a>
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
            <Modal
                show={couponModal}
                onHide={()=>{couponModalFunc(false)}}
                backdrop="static"
                keyboard={false}
                className="modal-gray"
                centered
            >
                <div className="apply_coupon">
                    <div className="apply_coupon_contant bg-white p-5 rounded-3">
                        <i className="fal fa-times-circle"  onClick={()=>{couponModalFunc(false)}}></i>
                        <h5> Apply Coupon </h5>
                        <form className="mb-3" action="">
                            <div>
                                <i className="far fa-search"></i>
                                <input type="search" className="form-control" placeholder="Search Item..." onChange={(e)=>searchCoupon(e.target.value)} aria-label="Search"/> 
                            </div>
                        </form>
                        {couponLS.map((data,key)=>(
                            <div className="coupon_code mb-3" key={key}>
                                <ul>
                                    <li className="off"><b> {data.discount}% OFF </b></li>
                                    <li className="content">Use code <b>{data.couponCode}</b> to avail this offer</li>
                                    <li className="edit">
                                        <a onClick={()=>applyCoupon(data)}> Apply </a> 
                                    </li>
                                </ul>
                            </div>
                        ))}
                        
                        {/* <div className="coupon_code mb-3">
                            <ul>
                                <li className="off"><b> 50% OFF </b></li>
                                <li className="content">Use code NEW50 to avail this offer</li>
                                <li className="edit">
                                    <a href="#"> Apply </a> 
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CouponComp;
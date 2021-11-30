import { useFormik } from "formik";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import DashLayout from "../components/dashLayout";
import apiFunc from "../services/api";
import * as Yup from "yup";
import 'react-confirm-alert/src/react-confirm-alert.css';
import common from '../services/common'



export default function IdCardPage(props) {
    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const addCardModal = (type) =>{
        setWithdrawalModal(type)
    }


    const initialValues = {
        photoId: "",
    };
     const validationSchema = Yup.object({
        photoId:Yup
        .mixed()
        .required("You need to attach image")
        .test("fileSize", "The image is too large", (value) => {
            if(value == undefined || value == null){
                return false;
            }
            console.log(common.readFile())
            return value &&  readFile() <= 2000000;
        }).test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .png", (value) => {
            if(value == undefined || value == null){
                return false;
            }
            let fileType=value.type;
            return value && (
                fileType === "image/jpeg" ||
                fileType === "image/bmp" ||
                fileType === "image/png"/* ||
                fileType === 'application/pdf' ||
                fileType === "application/msword" */
            );
        })
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
          console.log("submit", values);
        },
    });
    function updateProfile(postData){
        apiFunc.postProfileUpdate(postData).then(res => {
            toast.success(res.data.message)
        }).catch((error) => {
            toast.success(error)
            console.log(error)
        });
    }



    const handleChange = (name, value)=>{
        
    };




    return (
      <>
      <DashLayout props={props}>
      <div className="description_right">
                        <div className="id-outer"> 
                            <ul className="d-flex flex-wrap justify-content-between align-items-center">
                            <li><a href="#"> ID </a></li>
                            <li><a className="btn custom01" onClick={()=>addCardModal(true)}> Add New </a></li>
                            </ul>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="id_photo">
                                        <img src="assets/images/id.png" alt=""/>
                                        <a href="#"> Delete</a>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="id_photo">
                                        <img src="assets/images/id.png" alt=""/>
                                        <a href="#"> Delete</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                show={withdrawalModal}
                onHide={()=>{addCardModal(false)}}
                backdrop="static"
                keyboard={false}
                className="modal-gray"
                centered
            >
                <div className="add_new_card">
                    <div className="add_new_card_contant bg-white p-5 rounded-3">
                        <i className="fal fa-times-circle" onClick={()=>addCardModal(false)}></i>
                        <h5 className="mb-3"> ID Card </h5>

                        <div className="addIdcarWRp">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <div className="idrsibackWrp">
                                        <input type="file" {...formik.getFieldProps("photoId")} onChange={(e)=>handleChange('photoId',e.target.value)} className="form-control"/>
                                        <div className="idTextfild">Front Side</div>
                                    </div>
                                    {formik.touched.photoId && formik.errors.photoId ? (
                                        <div className="errorMsg">{formik.errors.photoId}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <div className="idrsibackWrp">
                                        <input type="file" {...formik.getFieldProps("photoId2")} className="form-control"/>
                                        <div className="idTextfild">Back Side</div>
                                    </div>
                                    {formik.touched.photoId2 && formik.errors.photoId2 ? (
                                        <div className="errorMsg">{formik.errors.photoId2}</div>
                                    ) : null}
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn cus_btn custom01"> Save </button>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </Modal>
      </DashLayout>
        
      </>
    )
  }
  
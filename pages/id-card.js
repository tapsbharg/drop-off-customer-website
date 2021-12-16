import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import DashLayout from "../components/dashLayout";
import apiFunc from "../services/api";
import * as Yup from "yup";
import 'react-confirm-alert/src/react-confirm-alert.css';
import common from '../services/common'
import { toast } from "react-toastify";



export default function IdCardPage(props) {
    const [withdrawalModal,setWithdrawalModal]=useState(false);
    const [image,setImage]=useState({});
    const [profileData, SetProfileData]=useState({});


    const addCardModal = (type) =>{
        setWithdrawalModal(type)
    }

    function getProfileData(){
        apiFunc.getProfileData().then((res) => {
            SetProfileData(res.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(()=>{
        getProfileData()
        
    },[])
    const initialValues = {
        photoId: '',
        photoId2:'',
    };
    const validationSchema = Yup.object({
        photoId:Yup.mixed().required("You need to attach image")
        .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .png", (value) => {
            return common.mineTypeValidate(value);
        })
        .test("fileSize", "The image is too large", (value) => {
            //fileSizeValidate(value,mb)
            return common.fileSizeValidate(value,2);
        }),
        photoId2:Yup.mixed().required("You need to attach image")
        .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .png", (value) => {
            return common.mineTypeValidate(value);
        })
        .test("fileSize2", "The image is too large", (value) => {
            //fileSizeValidate(value,mb)
            return common.fileSizeValidate(value,2);
        })
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async(values) => {
            common.loader(true);
            let photoIdRes1 = await uploadFile('photoId', values.photoId);
            let photoIdRes2 = await uploadFile('photoId2', values.photoId2);
            
            if(parseInt(photoIdRes1.status) == 200 && parseInt(photoIdRes2.status) == 200){
                setWithdrawalModal(false);
                formik.resetForm();
                setImage({})

            }else{
                toast.error('Please upload again, something wrong')
            }
            getProfileData();
            common.loader(false);
            console.log("submit", values);
        },
    });
    function uploadFile(name,file){
        const formData = new FormData();
        formData.append("coverImage", file);
        return apiFunc.postUpload(formData).then(response => {
            const resData={
                [name]:response.data.data._id
            }
            return apiFunc.updateUserDoc(name,resData).then(res => {
                return res
            }).catch((error) => {
                console.log(error)
            });
        }).catch((error) => {
            console.log(error)
        });
    }


    

    const handleChange = (name, e) => {
        formik.setFieldTouched(name, true);
        var getfile=e.target.files[0] || '';
        setImage({
            ...image,
            [name]:common.previewURL(getfile)
        })            
        formik.setFieldValue(name, getfile);
    };

    return (
      <>
      <DashLayout props={props}>
        <div className="description_right">
                        <div className="id-outer"> 
                            <ul className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                                <li><a href="#"> ID </a></li>
                                <li><a className="btn custom01" onClick={()=>addCardModal(true)}> Add New </a></li>
                            </ul>
                            
                            {profileData && (
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="id_photo">
                                            {profileData.photoId && (
                                                <img src={profileData.photoId.path} alt=""/>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="id_photo">
                                            {profileData.photoId2 && (
                                                <img src={profileData.photoId2.path} alt=""/>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                                
                                
                            
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
                                        <input type="file" name="photoId" onChange={(e)=>{ handleChange('photoId',e)}} className="form-control"/>
                                        {
                                            image.photoId ? (
                                                <div className="imgPreview">
                                                    <img src={image.photoId} className="img-fluid"/>
                                                </div>
                                            ) : (
                                                <div className="idTextfild">Front Side</div>
                                            )
                                        }
                                    </div>
                                    {formik.touched.photoId && formik.errors.photoId ? (
                                        <div className="errorMsg">{formik.errors.photoId}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <div className="idrsibackWrp">
                                        <input type="file" name="photoId2" onChange={(e)=>{ handleChange('photoId2',e)}} className="form-control"/>
                                        {
                                            image.photoId2 ? (
                                                <div className="imgPreview">
                                                    <img src={image.photoId2} className="img-fluid"/>
                                                </div>
                                            ) : (
                                                <div className="idTextfild">Back Side</div>
                                            )
                                        }
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
  
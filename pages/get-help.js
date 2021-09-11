import DashLayout from "../components/dashLayout";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import apiFunc from "../services/api";
import { useState } from "react";

export default function GetHelpsPage(props) {
    const [imageData,setImageData]=useState('')
    const initialValues = {
        issue: "",
        subject: "",
        orderNumber: "",
        message: "",
        image: "",
      };
    const validationSchema = Yup.object({
        issue: Yup.string().required("Please enter issue"),
        subject: Yup.string().required("Please enter subject"),
        orderNumber: Yup.string().required("Please enter order number"),
        message: Yup.string().required("Please enter message"),
        image: Yup.string().required("Please enter image")
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
          console.log("submit", values);
          helpdesk(values)
        },
    });
    const formik2 = useFormik({
        initialValues:{
            image: "",
        },
        validationSchema:Yup.object({
            image:Yup
            .mixed()
            .required("You need to attach image")
            .test("fileSize", "The image is too large", (value) => {
                if(value == undefined || value == null){
                    return false;
                }
                return value && value.size <= 2000000;
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
            }),
          }),
        onSubmit: (values) => {
          console.log("submit", values);
          uploadImage(values)
        },
    });
    function helpdesk(data){
        apiFunc.helpdesk(data).then(res => {
            toast.success(res.data.message)

        }).catch((error) => {
            toast.success(error)
            console.log(error)
        });
    }
    const handleFileImage = (e) => {
        var getfile=e.target.files[0];
        if(getfile != undefined || getfile != null){
            formik2.setFieldValue('image',e.target.files[0]);
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
                formik2.handleSubmit()
            };
        }
        
    };
    function uploadImage(postData){
        const formData = new FormData();
        formData.append("coverImage", postData.image);
        apiFunc.postUpload(formData).then(response => {
            setImageData(response.data.data._id)
            formik.setFieldValue('image',response.data.data._id);
        }).catch((error) => {
            toast.success(error)
            console.log(error)
        });
    }
    return (
      <>
      <ToastContainer />
      <DashLayout props={props}>
        <div className="description_right">
                <div className="">
                    <div className="form_middle">
                    <h5> Get Help  </h5>
                        <div className="comman_from">
                        
                            <form className="raise_ticket" onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Define Your Issue*</label>
                                    <input type="text" {...formik.getFieldProps("issue")} className="form-control" placeholder="Enter  Your Issue"/>
                                    {formik.touched.issue && formik.errors.issue ? (
                                        <div className="errorMsg">{formik.errors.issue}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Order Number</label>
                                    <select {...formik.getFieldProps("orderNumber")}>
                                        <option value="volvo">Enter Your Number</option>
                                        <option value="volvo">Issue 01</option>
                                        <option value="saab">Issue 02</option>
                                    </select>
                                    
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Subject*</label>
                                    <input type="text" {...formik.getFieldProps("subject")} className="form-control" placeholder="Enter  Subject"/>
                                    {formik.touched.subject && formik.errors.subject ? (
                                        <div className="errorMsg">{formik.errors.subject}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Message*</label>
                                    <textarea  {...formik.getFieldProps("message")} placeholder="Enter Message"></textarea>
                                    {formik.touched.message && formik.errors.message ? (
                                        <div className="errorMsg">{formik.errors.message}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Upload Attachments (*jpeg, *jpg, *png)</label>
                                    <input type="file" name="image" onChange={(e)=>handleFileImage(e)} className="form-control" placeholder="Enter Your Subject"/>
                                    {formik2.touched.image && formik2.errors.image ? (
                                        <div className="errorMsg">{formik2.errors.image}</div>
                                    ) : null}
                                </div>    
                                <button type="submit" className="btn cus_btn custom01">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
      </DashLayout>
      </>
    )
  }
  
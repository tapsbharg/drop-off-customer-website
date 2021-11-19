import { useFormik } from "formik";
import { useEffect, useState } from "react";
import DashLayout from "../components/dashLayout";
import apiFunc from "../services/api";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ProfilePage(props) {
    const [profileData, SetProfileData]=useState({});
    const[bannerImageBase64, setBannerImageBase64]=useState();
    const[imgStateBanner, setImgStateBanner]=useState('');
    
    function getProfileData(){
        apiFunc.getProfileData().then((res) => {
            SetProfileData(res.data.data);
            if(res.data.data){
                formik.setFieldValue('name',res.data.data.name);
                formik.setFieldValue('email',res.data.data.email);
                formik.setFieldValue('code',res.data.data.code);
                formik.setFieldValue('phone',res.data.data.phone);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(()=>{
        getProfileData()
        
    },[])
    
    const initialValues = {
        name: "",
        email: "",
        code: "",
        phone: "",
        photoId: "",
      };
      const validationSchema = Yup.object({
        name: Yup.string().required("Please enter name"),
        email:Yup.string()
            .email('Please enter valid email')
            .required('Please enter email'),
        code: Yup.string().required("Please enter code"),
        phone: Yup.string().required("Please enter phone"),
        photoId: Yup.string().required("Please attach photoId"),
      });
      const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
          console.log("submit", values);
          updateProfile(values);
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
      const profileFormik = useFormik({
         initialValues : {
            profileImage: {},
          },
          validationSchema : Yup.object({
            profileImage:Yup
                    .mixed()
                    .required("You need to attach banner image")
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
          
          confirmAlert({
            title: 'Are you sure to update profile image',
            // message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Confirm',
                onClick: () => {
                    uploadprofile(values);
                }
              },
              {
                label: 'Cancel',
                // onClick: () => alert('Click No')
              }
            ]
          });
        },
      });
      const handleFileChangeBanner = (e) => {
        var getfile=e.target.files[0];
        if(getfile != undefined || getfile != null){
            setImgStateBanner(e.target.files[0]);
            profileFormik.setFieldValue('profileImage',e.target.files[0]);
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
                setBannerImageBase64(reader.result);
                profileFormik.handleSubmit()
            };
        }
        
        
    };
    function uploadprofile(postData){
        const formData = new FormData();
        formData.append("coverImage", postData.profileImage);
        apiFunc.postUpload(formData).then(response => {
            const resData={
                profileImage:response.data.data._id
            }
            apiFunc.postProfileImage(resData).then(res => {
                formik.setFieldValue('photoId',res.data.data.photoId)
                getProfileData();
                toast.success(res.data.message)
    
            }).catch((error) => {
                toast.success(error)
                console.log(error)
            });

        }).catch((error) => {
            toast.success(error)
            console.log(error)
        });
    }
    return (
      <>
      <DashLayout props={props}>
          <ToastContainer/>
        <div className="description_right">
            <div className="profile_outer"> 
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <h6>Profile </h6>  
                </div>
                <form onSubmit={profileFormik.handleSubmit}>
                    <div className="profile_img d-flex flex-wrap align-items-center justify-content-center bg-light01 p-5 rounded-3">
                        <div className="profilIm">
                        {!profileData && (
                            <img src="assets/images/web/earning.png" alt=""/>
                        )}
                        {profileData && (
                            <img src={profileData.image ?profileData.image.path:'assets/images/web/earning.png' } alt=""/>
                        )}
                        <div className="proillUPload">
                            <label>
                                <input type="file" name="profileImage" onChange={(e)=>handleFileChangeBanner(e)}/>
                                <i className="far fa-camera"></i>
                            </label>
                        </div>
                    </div>
                    {formik.touched.photoId && formik.errors.photoId ? (
                        <div className="errorMsg text-center">{formik.errors.photoId}</div>
                    ) : null}
                    </div>
                </form>
                <div className="comman_from">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">  name</label>
                            <input type="text" {...formik.getFieldProps("name")} className="form-control" id="" placeholder="Enter  Name"/>
                            {formik.touched.name && formik.errors.name ? (
                                <div className="errorMsg">{formik.errors.name}</div>
                            ) : null}
                        </div> 
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" {...formik.getFieldProps("email")} className="form-control" id="" placeholder="Enter Your Email"/>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="errorMsg">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Code</label>
                            <input type="tel" {...formik.getFieldProps("code")} className="form-control" id="" placeholder="Enter Your Mobile Number"/>
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
                        <button type="submit" className="btn cus_btn custom01"> Save </button>
                    </form>
                </div>

            </div>

        </div>
        </DashLayout>
      </>
    )
  }
  
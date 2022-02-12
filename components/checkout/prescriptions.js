import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import apiFunc from '../../services/api';
import { UserContext } from '../context/locationContext';

const Prescriptions = ({props}) => {
    const context = useContext(UserContext);
    const [prescrpImage, setPrescrpImage]=useState(null);
    useEffect(()=>{
        prescpAndidcard();
    },[])
    function prescpAndidcard(){
        if(props.cartData){
            props.cartData.cart.map((data, index)=>{
                let idStatus = data.productId.isIdRequired;
                let PresStatus = data.productId.isIdRequired;
                idStatus ? context.setIdcardCheck(idStatus):context.setIdcardCheck(false);
                PresStatus ? context.setPrescripCheck(PresStatus):context.setPrescripCheck(false);
            })
        }
    }
    const prescHandleChange = (e)=>{
        var file = e.target.files[0]
        setPrescrpImage(file);
        const formData = new FormData();
        formData.append("coverImage", file);
        apiFunc.postUpload(formData).then(response => {
            context.setPrescription(response.data.data._id)
        }).catch((error) => {
            toast.error(error)
            console.log(error)
        });
    }
  return (
    <>
    {
                                        (context.idcardCheck || context.prescripCheck)?(
                                            <div className="summer_box02 bg-light02 rounded-3 p-3 mb-3">
                                                {context.idcardCheck && (
                                                    <>
                                                        {context.profile.photoId ? (
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="id_photo">
                                                                        {context.profile.photoId && (
                                                                            <img src={context.profile.photoId.path} alt=""/>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="id_photo">
                                                                        {context.profile.photoId2 && (
                                                                            <img src={context.profile.photoId2.path} alt=""/>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ):(
                                                            <ul className="d-flex justify-content-between">
                                                                <li> Upload Your ID Card </li>
                                                                <li> <Link href="/id-card">Upload</Link></li>
                                                            </ul>
                                                        )}
                                                        <hr/>
                                                    </>
                                                    
                                                )}
                                                
                                                {context.prescripCheck && (
                                                    <>
                                                        {
                                                            context.prescrpImage && (
                                                                <div>
                                                                    <img src={common.previewURL(prescrpImage)} className="img-fluid" />
                                                                    <hr/>
                                                                </div>
                                                            )
                                                        }
                                                        <ul className="d-flex justify-content-between">
                                                            <li> Upload Your Prescriptions </li>
                                                            <li> <input type="file" className="upload" onChange={(e)=>prescHandleChange(e)}></input> </li>
                                                        </ul>
                                                    </>
                                                )}
                                                
                                                
                                            </div>
                                        ):null
                                    }
    </>
  )
}

export default Prescriptions
import { useEffect, useState } from "react";
import apiFunc from "../services/api";
import AddEditAddress from "./addEditAddress";


export default function AddressComp(props){
    const [addressData,setAddressData]=useState([]);
    function getAllAddress(){
        apiFunc.getProfileData().then((res)=>{
            setAddressData(res.data.data.address)
            checkStatus(res.data.data.address)
        }).catch((error)=>{
            console.log(error);
        })
    }
    function checkStatus(datas){
        datas.map((data,i)=>{
            if(data.isDefault == true){
                props.addressSelct(true);
            }
        })
    }
    useEffect(()=>{
        getAllAddress();
        
    },[props])

    function addressEdit(id){
        console.log(id, 'edit');
    }
    function addressDefault(id){
        apiFunc.defaultAddress(id).then((res)=>{
            toast.success(res.data.message);
            getAllAddress();
        }).catch((error)=>{
            console.log(error);
        })
    }
    return(
        <>
        <div className={`delivery-address bg-white rounded-3 p-3 mb-3 ${props.selectClass?props.selectClass:''}`}>
            <h6> Choose A Delivery Address </h6> 
            <hr/>
            {addressData && (
                addressData.map((data,index)=>(
                    <div  key={index}>
                    <div className={`address_group d-flex my-3 ${data.isDefault?' selectDefault':''}`}>
                        
                        <div className="location_img">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="location_content_address">
                            <h6> <b>Home</b></h6>
                            <span>{data.address}</span>
                            <ul className="d-flex flex-wrap justify-content-between align-items-center">
                                <li><a onClick={()=>addressEdit(data._id)} className="setEdit"> Edit </a> </li>
                                <li>
                                    {data.isDefault && (
                                        <i className="setDefault"> Selected </i> 
                                    )}
                                    {!data.isDefault && (
                                        <a onClick={()=>addressDefault(data._id)} className="setDefault"> Set As Default </a> 
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr/>
                    </div>
                ))
            )}
            <AddEditAddress className="but03" type="add"/>
        </div>
        </>
    )
}
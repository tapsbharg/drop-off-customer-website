import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiFunc from "../services/api";
import AddEditAddress from "./addEditAddress";


export default function AddressComp(props){
    const [addressData,setAddressData]=useState([]);
    function getAllAddress(){
        apiFunc.getProfileData().then((res)=>{
            let resArr=res.data.data.address.map((data)=>{
                let resObj = data.isDefault == true
                resObj == true ? props.getLatLong(data.location.coordinates) : null
            })
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
        
    },[])

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
            <div className="delivAddrScrll scroller">
            {addressData && (
                addressData.map((data,index)=>(
                    <div  key={index}>
                    <div className={`address_group d-flex my-3 ${data.isDefault?' selectDefault':''}`}>
                        
                        <div className="location_img">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="location_content_address">
                            <h6> <b>{data.addressType || 'Other'}</b></h6>
                            <span>{data.address}</span>
                            <ul className="d-flex flex-wrap justify-content-between align-items-center">
                                <li>
                                        <AddEditAddress 
                                            type="edit" 
                                            coordinates={data.location.coordinates} 
                                            address={data.address} 
                                            id={data._id}
                                            action={()=>getAllAddress()}
                                        >Edit</AddEditAddress>
                                </li>
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
            </div>
            <AddEditAddress action={()=>getAllAddress()} className="but03" type="add"/>
        </div>
        </>
    )
}
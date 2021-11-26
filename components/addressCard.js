import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import apiFunc from "../services/api";
import AddEditAddress from "./addEditAddress";


export default function AddressCards(props){
    const [addressData,setAddressData]=useState([]);
    function getAllAddress(){
        apiFunc.getProfileData().then((res)=>{
            setAddressData(res.data.data.address)
        }).catch((error)=>{
            console.log(error);
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
            var message = JSON.parse(error.request.response).message;
            toast.error(message);
        })
    }
    return(
        <>
        <ToastContainer />
        <div className="row">
        {addressData && (
            addressData.map((data,index)=>(
                <div className="col-sm-6" key={index}>
                    <div className="my_address border rounded-3 p-3">
                        <h6>Home</h6>
                        <p> {data.address} </p>
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
            ))
        )}
        </div>
        
        </>
    )
}
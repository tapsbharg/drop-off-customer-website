import { useEffect, useState } from "react";
import apiFunc from "../services/api";


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
    },[props])

    function addressEdit(id){
        console.log(id, 'edit');
    }
    function addressDelete(id){
        console.log(id, 'Delete');
    }
    return(
        <>
        <div className="row">
        {addressData && (
            addressData.map((data,index)=>(
                <div className="col-sm-6" key={index}>
                    <div className="my_address border rounded-3 p-3">
                        <h6>Home</h6>
                        <p> {data.address} </p>
                        <ul className="d-flex flex-wrap justify-content-between align-items-center ">
                            <li> <a onClick={()=>addressEdit(data._id)}> Edit </a> </li>
                            <li> <a onClick={()=>addressDelete(data._id)}> Delete </a> </li>
                        </ul>
                    </div>
                </div>
            ))
        )}
        </div>
        
        </>
    )
}
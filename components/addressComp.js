import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiFunc from "../services/api";
import AddEditAddress from "./addEditAddress";
import { UserContext } from "./context/locationContext";


export default function AddressComp({props}){
    const context = useContext(UserContext);
    const [addressData,setAddressData]=useState([]);
    function getAllAddress(){
        apiFunc.getProfileData().then((res)=>{
            /* let resArr=res.data.data.address.map((data)=>{
                let resObj = data.isDefault == true
                resObj == true ? props.getLatLong(data.location.coordinates) : null
            }) */
            
            setAddressData(res.data.data.address)
            checkStatus(res.data.data.address)
        }).catch((error)=>{
            console.log(error);
        })
    }
    function checkStatus(datas){
        datas.map((data,i)=>{
            if(data.isDefault == true){
                context.setLatLong(data.location.coordinates)
                context.setAddressId(data._id)
                getDistance(data.location.coordinates)
                // props.addressSelct(data);
            }
        })
    }
    function getMiles(i) {
        return (i*0.000621371192).toFixed(1);
    }
    async function getDistance(defaultLatlong){
        if(defaultLatlong != null){
            let venderDetail=props?.cartData?.vendor
            if(venderDetail?.location && defaultLatlong[1]){
                let postData={
                    originLat: defaultLatlong[1],
                    originLong: defaultLatlong[0],
                    destinationLat: venderDetail.location.coordinates[1],
                    destinationLong: venderDetail.location.coordinates[0],
                    units: "imperial"
                }
                await apiFunc.distanceCalculate(postData).then((res)=>{
                    let resData = res.data.data.rows[0].elements[0].distance;
                    let miles = getMiles(resData?resData.value:0);
                    context.setTotalMiles(parseFloat(miles));
                }).catch((error)=>{
                    console.log(error);
                }) 
                
            }
        }
        
        
        
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
        <div className={`delivery-address bg-white rounded-3 p-3 mb-3`}>
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
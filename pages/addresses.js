import DashLayout from "../components/dashLayout";
import AddEditAddress from "../components/addEditAddress";
import {  useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiFunc from "../services/api";
import { reactLocalStorage } from "reactjs-localstorage";
import { UserContext } from "../components/context/locationContext";


export default function AddressesPage(props) {
  const [addressData,setAddressData]=useState([]);
  
  const context = useContext(UserContext);

  function getAllAddress(){
      apiFunc.getProfileData().then((res)=>{
          setAddressData(res.data.data.address)
          let addrss = res.data.data.address.filter((a) => a.isDefault == true).map((b)=>{
            let coords = {
              lat : b.location.coordinates[1],
              lng : b.location.coordinates[0]
            }
            coords = JSON.stringify(coords);
            reactLocalStorage.set('geoServer',coords)
            context.setAddress(b.address)
            context.setLocation(coords)
          })
          
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
    return (
      <>
      <DashLayout props={props}>
      <div className="description_right">

        <div className="my_address_outer">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h6>My Addresses </h6>
                <AddEditAddress action={()=>getAllAddress()} className="btn custom01" type="add"/>
            </div>
            <div className="row">
        {addressData && (
            addressData.map((data,index)=>(
                <div className="col-sm-6" key={index}>
                    <div className="my_address border rounded-3 p-3">
                        <h6>{data.addressType || 'Other'}</h6>
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
            
        </div>
        </div>
        
      </DashLayout>
      </>
    )
  }

  
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import apiFunc from "../services/api";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from "formik";
import GoogleMapReact from "google-map-react";
import AutoComplete from "./autocomplete";


const AnyReactComponent = ({ text }) => <div className="markerGoogle">
    <img src="/assets/images/marker.png" alt="" />
</div>;


export default function AddEditAddress(props){
    const [addressModal,setAddressModal]=useState(false);
    const [mapData,setMapData]=useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        places: [],
        zoom: 11,
        address: "",
        draggable: true,
        lat: 52,
        lng: 30,
        center: {
            lat: 52,
            lng: 30,
        }
      });
      function setDefaultAddress(){
        setMapData({
            ...mapData,
            lat: 52,
            lng: 30,
            center: {
              lat: 52,
              lng: 30,
            }
        });
      }
      const  _onChange = ({ center, zoom }) => {
        setMapData({
            ...mapData,
          center: center,
          zoom: zoom,
        });
      };
    
      async function _onClick(data) {
        setMapData({
            ...mapData,
          center: {
            lat: data.lat,
            lng: data.lng,
          },
          lat: data.lat,
          lng: data.lng,
        });
        await generateAddress(data);
      };
      const apiHasLoaded = (map, maps) => {
        setMapData({
            ...mapData,
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });
        generateAddress();
      };
    
      const addPlace = (place) => {
          var coordinate={
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }
        setMapData({
            ...mapData,
            places: [place],
            center: coordinate,
            lat: coordinate.lat,
            lng: coordinate.lng,
        });
        generateAddress(coordinate);
      };
    
      function generateAddress(latlng) {
        const mapApi = mapData.mapApi;
        let coordinate=latlng?{ lat: latlng.lat, lng: latlng.lng }:{ lat: mapData.lat, lng: mapData.lng };
        if(mapApi){
            const geocoder = new mapApi.Geocoder();
            geocoder.geocode(
                { 
                    location: coordinate
                },
                (results, status) => {
                    if (status === "OK") {
                        if (results[0]) {
                            // this.zoom = 12;
                            var addressLenth=results[0].address_components.length;
                            var addressLenth=results[0].address_components[addressLenth-1];
                            var postal_code=addressLenth.types[0];
                            var zipcode=postal_code=="postal_code"?addressLenth.long_name:'null';
                            setMapData({
                                ...mapData,
                                lat:coordinate.lat,
                                lng:coordinate.lng,
                                center:coordinate,
                                zipcode: zipcode,
                                address: results[0].formatted_address
                            });
                            formik.setFieldValue('lat', coordinate.lat);
                            formik.setFieldValue('lng', coordinate.lng);
                            formik.setFieldValue('address', results[0].formatted_address);
                            formik.setFieldValue('zipcode', zipcode);
                        } else {
                            window.alert("No results found");
                        }
                    } else {
                    window.alert("Geocoder failed due to: " + status);
                    }
                }
            );
        }
      }
      
    const addCardModal = (type) =>{
        setAddressModal(type)
    }
    const initialValues = {
        lng: "",
        lat: "",
        address: "",
        zipcode: "",
      };
    const validationSchema = Yup.object({
        lng: Yup.string().required("Please enter lang"),
        lat:Yup.string().required('Please enter lat'),
        address: Yup.string().required("Please enter address"),
        zipcode: Yup.string().required("Please enter zipcode"),
      });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
          console.log("submit", values);
          addNewAddress(values);
        },
      });
    function addNewAddress(postData){
        apiFunc.addNewAddress(postData).then(res => {
            toast.success(res.data.message)
            addCardModal(false);
        }).catch((error) => {
            toast.success(error)
            console.log(error)
        });
    }

    useEffect(()=>{
        setDefaultAddress();
    },[])
    
    // console.log( mapData)
    return(
        <>
        <a href="#" className={props.className} onClick={()=>addCardModal(true)}> Add New </a> 
        <Modal
    show={addressModal}
    onHide={()=>{addCardModal(false)}}
    backdrop="static"
    keyboard={false}
    className="modal-gray"
    centered
        >
            <div className="add_new_card">
                <div className="add_new_card_contant bg-white p-5 rounded-3">
                    <i className="fal fa-times-circle" onClick={()=>addCardModal(false)}></i>
                    <h5> Add New Location </h5>
                    <form className=" " onSubmit={formik.handleSubmit}>
                        {mapData.mapApiLoaded && (
                            <div className="mapSearchinpt">
                                <AutoComplete
                                map={mapData.mapInstance}
                                mapApi={mapData.mapApi}
                                addplace={(e)=>addPlace(e)}
                                />
                            </div>
                            )}
                        {mapData.address}
                    <div className="mapviewWrapper">
                        <GoogleMapReact
                            center={mapData.center}
                            zoom={mapData.zoom}
                            draggable={mapData.draggable}
                            onChange={(e)=>_onChange(e)}
                            /* onChildMouseDown={(e)=>onMarkerInteraction(e)}
                            onChildMouseUp={(e)=>onMarkerInteractionMouseUp(e)} 
                            onChildMouseMove={(e)=>onMarkerInteraction(e)}*/
                            onChildClick={() => console.log("child click")}
                            onClick={(e)=>_onClick(e)}
                            bootstrapURLKeys={{
                            key: "AIzaSyAh0d-fC-utW0ysuP8hQ13cMCwrEq5RFKw",
                            libraries: ["places", "geometry"],
                            }}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) =>
                                apiHasLoaded(map, maps)
                            }
                        >
                            {/* <Marker
                            text={this.state.address}
                            lat={this.state.lat}
                            lng={this.state.lng}
                            /> */}
                            <AnyReactComponent
                                lat={mapData.lat}
                                lng={mapData.lng}
                                text="My Marker"
                                addplace={(e)=>addPlace(e)}
                            />
                        </GoogleMapReact>
                        </div>
                        <button type="submit" className="btn cus_btn custom01"> Continue </button>
                    </form>
                    
                </div>
            </div>
        </Modal>
        </>
    )
}
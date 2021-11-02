import { useRouter } from "next/dist/client/router"
import Link from "next/link";
import { useEffect, useState } from "react"
import apiFunc from "../services/api";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast, ToastContainer } from "react-toastify";
import Head from "next/head";

export default function SearchPage(props) {
    const [dashdata, setDashData]=useState([]);
    const [prodData, setProdData]=useState([]);
    const [productList, setProductList]=useState([]);
    const [cartStatusList, setCartStatusList]=useState([]);
    const [tokenStatus, setTokenStatus]=useState(false);
    const [guestId, setGuestId] = useState(null);
    // const [cartData,SetCartData]=useState();
    const router = useRouter()
    const params = router.query || '';
    const search = params.search || '';
    const category = params.category || '';

    function getCategory(){
        apiFunc.getDashboardData().then((res)=>{
            setDashData(res.data.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    function searchProduct(data){
        apiFunc.searchProductData(data).then((res)=>{
            setProdData(res.data.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    function addToCart(prodId,vendId){
        if(!guestId){
            const cartData={
                "vendorId": vendId,
                "quantity": 1
            }
            apiFunc.addTocart(cartData,prodId).then((res)=>{
                props.getCart()
            }).catch((error)=>{
                toast.error(error.message);
                console.log(error);
            })
        }
        else{
            const cartData={
                "guestId":guestId,
                "vendorId": vendId,
                "quantity": 1
            }
            apiFunc.addTocartGuest(cartData,prodId).then((res)=>{
                // setProductList(res.data.data)
                props.getCart()
                // toast.success(res.data.message);
            }).catch((error)=>{
                toast.error(error.message);
                console.log(error.message);
            })
        }

    }
    function removeToCart(prodId,vendId){
        if(!guestId){
            const cartDataDelete={
                "vendorId": vendId,
                "quantity": -1
            }
            apiFunc.addTocart(cartDataDelete,prodId).then((res)=>{
                // setProductList(res.data.data)
                props.getCart()
            }).catch((error)=>{
                console.log(error);
            })
        }
        else{
            const cartDataDelete={
                "guestId":guestId,
                "vendorId": vendId,
                "quantity": -1
            }
            apiFunc.addTocartGuest(cartDataDelete,prodId).then((res)=>{
                // setProductList(res.data.data)
                props.getCart()
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    function EmptyCartAll(id){
        console.log(id)
        apiFunc.deleteCartData(id).then((res)=>{
            // setProductList(res.data.data)
            // toast.error(error.message);
            console.log(res)
            props.getCart()
        }).catch((error)=>{
            toast.error(error.message);
            console.log(error);
        })
    }
    
    // EmptyCartAll("6136e9b1da28413d28bd7759")
    function checkCartValue(propsData) {
        if(propsData.cartData ){
            var cartDataList=[]
            for (var i=0; i < propsData.cartData.cart.length; i++) {
                if(propsData.cartData.cart[i].productId){
                    var dataByList = {};
                    let listId =propsData.cartData.cart[i].productId._id
                    let qty=propsData.cartData.cart[i].quantity;
                    dataByList =  {"id": listId,"qty": qty};
                }
                
                // datas.push(dataByList);
                cartDataList.push(dataByList)
            } 
            setCartStatusList(cartDataList);
        }
        
    }
    function checkCartIs(datas, cartlist){
        var prodlIddata={};
        for (var i=0; i < cartlist.length; i++) {
            if(datas._id == cartlist[i].id){
                prodlIddata={
                    ...datas,
                    cartStatus:cartlist[i].qty > 0?true:false,
                    cartQty:cartlist[i].qty
                }
            }
        }
        if(!prodlIddata.cartStatus){
            prodlIddata={
                ...datas,
                cartStatus:false,
            }
        }
        return prodlIddata;
    }
    function setAfterData(datas, list){
        var cartlist= cartStatusList;
        var updatPRdList=[]
        if(datas){
            for (var i=0; i < datas.length; i++) {
                updatPRdList.push(checkCartIs(datas[i], cartlist));
            }
        }
        setProductList(updatPRdList)
    }
    function setToken(token){
        setTokenStatus(token)
    }

    useEffect(()=>{
        var token = reactLocalStorage.get("token");
        setToken(token)
        checkCartValue(props);
        getCategory()
        const searchData={
            searchString:search,
            sortingBy:1
        }
        if(searchData.searchString){
            searchProduct(searchData)
        }
        
        formik.setFieldValue('search',search);
        formik.setFieldValue('category',category);

        // SetCartData(props)
    },[search, props]) 
    function getGuestId(){
        var guestid = reactLocalStorage.get("guestid");
        setGuestid(guestid);
        /* apiFunc.guestid().then((res)=>{
            reactLocalStorage.set("guestid",res.data.guestId);
            setGuestId(res.data.guestId);
        }).catch((error)=>{
            console.log(error);
        }) */
    }
    useEffect(()=>{
        setAfterData(prodData, cartStatusList, props);
        var  token= reactLocalStorage.get("token");
        var guestid = reactLocalStorage.get("guestid");
        if(!token && !guestid){
            getGuestId();
        }else{
            setGuestId(guestid);
        }

    },[props, cartStatusList, prodData]) 

    function categoryChange(cate){
        formik.setFieldValue('category', cate);
        formik.handleSubmit()
    }
    const initialValues={
        search:'',
        category:'',
    }
    const validationSchema = Yup.object({
        search:Yup.string().required('Please enter keyword'),
        category:Yup.string(),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit : values => {
            console.log('submit',values)
            router.push({
                pathname: '/search',
               query: values,
            }) 
        },
        
    })
   /* const cartSTatus=(datas,id)=>{
        let statusData={};
        for (var i=0; i < datas.length; i++) {
            if(datas[i].id == id){
                statusData= {
                    status:datas[i].id == id,
                    qty:datas[i].qty
                };
            }
        }
        return statusData;
    }
    */
    return (
      <>
      <ToastContainer />
        <div className="search_outer ">
            <div className="container">
                <div className="search_inner my-5">
                    <form  onSubmit={formik.handleSubmit} className="mb-4">
                        <div>
                            <i className="far fa-search"></i>
                            <input type="search" className="form-control" {... formik.getFieldProps('search')} placeholder="Search Item..." aria-label="Search"/> 
                            <i className="far fa-exchange"></i>
                            <ul className="low_high_price bg-white p-3 rounded-3">
                                <li> <a href="#"> Price Low to High </a> </li>
                                <li> <a href="#"> Price High to Low </a> </li>
                            </ul>
                            {formik.touched.search && formik.errors.search ? (
                                <div className="errorMsg">{formik.errors.search}</div>
                            ):null}
                        </div>
                    </form>
                    <nav className="mb-4">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        {dashdata.map((data, index)=>(
                            <button key={index} className={`nav-link ${category==data.name?'active':''}`} onClick={()=>categoryChange(data.name)}> {data.name}</button>
                        ))}
                        </div>
                    </nav>
                    <div className="searcCosngpp">
                        {productList.map((data, index)=>(
                            <div  key={index}>
                                {data.category.description == category && (
                            <div className="product_grpup">
                                <div className="product_informaction d-flex flex-wrap align-items-center bg-white mb-3">
                                    <div className="product_img">
                                        {data.defaultImage && (
                                            <img src={data.defaultImage.path} alt=""/>
                                        )}
                                        
                                    </div>
                                    <div className="product_content px-3">
                                        <div className="producliscont">
                                            <h6><b>{data.name}</b></h6>
                                            <div className="price"><h6> ${data.price} </h6></div>
                                            <Link href={`/store-view?id=${data.vendorId._id}`}><span> {data.vendorId.storeName} </span></Link>
                                        </div>
                                       <div className={`prolislbtn ${data.cartStatus?'active':'deactive'}`}>
                                            {data.cartStatus && (
                                                <div className={`quntityPls`}>
                                                    <button type="button" onClick={()=>removeToCart(data._id,data.vendorId._id)} className="qty-minus">-</button>
                                                    <input type="number" readOnly className="qty" value={data.cartQty} />
                                                    <button type="button" onClick={()=>addToCart(data._id,data.vendorId._id)} className="qty-plus">+</button>
                                                </div>
                                            )}
                                            {!data.cartStatus && (
                                                <a className="add_product" onClick={()=>addToCart(data._id,data.vendorId._id)}> add  <i className="far fa-plus"> </i> </a>
                                                    
                                            )}
                                        </div> 
                                        
                                    </div>
                                </div>
                            </div>
                            )}
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }

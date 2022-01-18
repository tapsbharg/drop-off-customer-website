import { useRouter } from "next/dist/client/router"
import Link from "next/link";
import { useEffect, useState } from "react"
import apiFunc from "../services/api";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast, ToastContainer } from "react-toastify";
import Head from "next/head";
import cartService from "../services/cartSrvice";

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
        apiFunc.preference().then((res)=>{
            setDashData(res.data.data.vendorCategory)
        }).catch((error)=>{
            console.log(error);
        })
    }
    function searchProduct(data){
        let cart = props.cartData.cart
        apiFunc.searchProductData(data).then((res)=>{
            // setProdData(res.data.data)
            let  prods =res.data.data
            prods.map(m=>{
                let found=  cart.find(q=>{
                    return q.productId._id == m._id
                })
                m.quantity= found? found.quantity: 0 
            })
            setProductList(prods)
        }).catch((error)=>{
            console.log(error);
        })
    }
    
    async function addToCart(data){
        var stockchk = data.stock
        var quantity = data.quantity
        if(stockchk > quantity){
            await cartService.addToCart(data._id, data.vendorId._id, props);
        }else{
            toast.error('Out of Stock;')
        }
        
    }
    async function removeToCart(data){
        await cartService.removeToCart(data._id, data.vendorId._id, props);
    }
    

    
    
    function setToken(token){
        setTokenStatus(token)
    }

    useEffect(()=>{
        var token = reactLocalStorage.get("token");
        var guestid = reactLocalStorage.get("guestid");
        setToken(token)
        getCategory()
        setGuestId(guestid);
    },[]) 

    useEffect(()=>{
        const searchData={
            searchString:search,
            sortingBy:1
        }
        if(searchData.searchString){
            searchProduct(searchData)
        }
        formik.setFieldValue('search',search);
        formik.setFieldValue('category',category);
    },[search, props]) 

 
    /* function getGuestId(){
        var guestid = reactLocalStorage.get("guestid");
        setGuestid(guestid);
        /* apiFunc.guestid().then((res)=>{
            reactLocalStorage.set("guestid",res.data.guestId);
            setGuestId(res.data.guestId);
        }).catch((error)=>{
            console.log(error);
        }) *
    } */
   

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
                            <button key={index} className={`nav-link ${category==data._id?'active':''}`} onClick={()=>categoryChange(data._id)}> {data.name}</button>
                        ))}
                        </div>
                    </nav>
                    <div className="searcCosngpp">
                        {productList.map((data, index)=>(
                            <div  key={index}>
                                {/* { data.category.name.replaceAll(' ','') == category.replaceAll(' ','')} */}
                                {data.vendorId.storeType == category  && (
                            <div className={`product_grpup ${!data.vendorId.isAvailable? 'notAvail':'avail'}`}>
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
                                            <Link href={`/store-view?id=${data.vendorId._id}`}>
                                                <span> 
                                                    {data.vendorId.storeName}
                                                    {!data.vendorId.isAvailable && (
                                                        <span className="vendorAvlv">
                                                            (Not Available)
                                                        </span>
                                                    )}
                                                </span>
                                            </Link>
                                            
                                        </div>
                                       <div className={`prolislbtn ${data.quantity>0?'active':'deactive'}`}>
                                       {data.quantity>0?(
                                           <div className={`${data.stock < data.quantity?'stockOut':'stockIn'}`}> 
                                            <div className={`quntityPls`}>
                                                <button type="button" onClick={()=>removeToCart(data)} className="qty-minus">-</button>
                                                <input type="text" readOnly className="qty" value={data.quantity} />
                                                <button type="button" onClick={()=>addToCart(data)} className="qty-plus">+</button>
                                            </div>
                                            {data.stock < data.quantity && (
                                                <div className="text-danger text-center">Out of stock</div>
                                            )}
                                            </div>
                                        ):(
                                            <div className={`${data.stock <= 0?'stockOut':'stockIn'}`}> 
                                                {(data.stock <= 0) ? (
                                                    <div className="text-danger text-center">Out of stock</div>
                                                ):(
                                                    <a className="add_product" onClick={()=>addToCart(data)}> add  <i className="far fa-plus"> </i> </a>
                                                )}
                                            </div>
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

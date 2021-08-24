import { useRouter } from "next/dist/client/router"
import Link from "next/link";
import { useEffect, useState } from "react"
import apiFunc from "../services/api";
import * as Yup from 'yup';
import { useFormik } from "formik";

export default function SearchPage(props) {
    const [dashdata, setDashData]=useState([]);
    const [productList, setProductList]=useState([]);
    const [cartData,SetCartData]=useState();
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
            setProductList(res.data.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    function addToCart(_id){
        const cartData={
            "vendorId": _id,
            "quantity": 1
        }
        apiFunc.addTocart(cartData).then((res)=>{
            // setProductList(res.data.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    
    useEffect(()=>{
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

        SetCartData(props)
        
    },[search]) 
    
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
    console.log(cartData)
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
                            <div className="product_grpup" key={index}>
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
                                        <div className={`prolislbtn `}>
                                            <div className="quntityPls">
                                                <input type="button" className="qty-minus"/>
                                                <input type="number" className="qty" defaultValue="1"/>
                                                <input type="button" className="qty-plus"/>
                                            </div>
                                            <a className="add_product" onClick={()=>addToCart(data._id)}> add  <i className="far fa-plus"> </i> </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }
  
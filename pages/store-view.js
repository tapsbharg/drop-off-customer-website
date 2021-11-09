import { Tab, Tabs } from "react-bootstrap";
import { useRouter } from "next/dist/client/router"
import Link from "next/link";
import { useEffect, useState } from "react"
import apiFunc from "../services/api";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast, ToastContainer } from "react-toastify";
import Head from "next/head";
import StarRating from '../components/starComp'
function StoreViewPage(props) {
    const [prodData, setProdData]=useState([]);
    const [venderInfo, setVenderInfo]=useState([]);
    const router = useRouter()
    const params = router.query || '';
    const vendorId = params.id || ''
    const search = params.search || ''
    const subcategory = params.subcategory || ''

    function SubCategoryChange(subcat){
        var values = {
          id:vendorId,
          subcategory:subcat
        }
        router.push({
            pathname: '/store-view',
            query: values,
        }) 
    }
    function vendorProductData(vendorId){
        console.log(props)
        let cart = props.cartData.cart
        apiFunc.vendorProductData(vendorId).then((res)=>{
            let  prods =res.data.data
            prods.menu.map(m=>{
                m.products.map(p=>{
                   let found=  cart.find(q=>{
                        return q.productId._id == p._id
                    })
                    console.log(found)
                    p.quantity= found? found.quantity: 0
                })  
            })
            setProdData(prods)
        }).catch((error)=>{
            console.log(error);
        })
    }
    function getVendor(vendorId){
        apiFunc.getVendor(vendorId).then((res)=>{
            setVenderInfo(res.data.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        if(vendorId){
            getVendor(vendorId)
            vendorProductData(vendorId)
        }
        
    },[vendorId]);
    
    useEffect(()=>{
        
        formik.setFieldValue('vendorId',vendorId);
        formik.setFieldValue('search',search);
        formik.setFieldValue('subcategory',subcategory);

    },[search, props]) 

    function categoryChange(cate){
        formik.setFieldValue('subcategory', cate);
        formik.handleSubmit()
    }
    const initialValues={
        vendorId:'',
        search:'',
        subcategory:'',
    }
    const validationSchema = Yup.object({
        vendorId:Yup.string(),
        search:Yup.string().required('Please enter keyword'),
        subcategory:Yup.string(),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit : values => {
            console.log('submit',values)
            router.push({
                pathname: '/store-view',
               query: values,
            }) 
        },
        
    })
    // console.log(prodData)
    return (
      <>
        <div className="liquor_store">
          <div className="container">
              <div className="liquor_store_inner mt-3 mb-5"> 
                  <div className="liquor_store_01" 
                  style={{
                        backgroundImage: venderInfo.coverImage?'url(' + venderInfo.coverImage.path + ')':''
                    }}>
                      <a href="#"> open </a>
                  </div>
                  <div className="liquor_store_02 d-flex flex-wrap  align-items-center justify-content-between py-3">
                      <h3>{venderInfo.storeName} <span> <i className="fas fa-map-marker-alt"></i> {venderInfo.address} </span> </h3>
                      <div className="stars">
                          <StarRating rate={venderInfo.rating} />
                          <sup>{venderInfo.rating}</sup>
                      </div>
                  </div>
                  <div className="liquor_store_03">
                      <div className="searchRlighshwo">
                      <div className="browse_our_menu">
                          <div className="nav nav-tabs" id="nav-tab" role="tablist">
                              <form>
                                  <div>
                                      <i className="far fa-search"></i>
                                      <input type="search" className="form-control" placeholder="Search Item..." aria-label="Search"/> 
                                  </div>
                              </form>
                          </div>
                      </div>
                      </div>
                      <Tabs defaultActiveKey="tab1" id="nav-tab" className="browse_our_menu nav nav-tabs">
                          <Tab eventKey="tab1" title="Browse Our Menu">
                            <div className="recommended_outer d-flex flex-wrap justify-content-between ">
                                  <nav className="recommended_menu ">
                                      <div className="nav nav-tabs bg-white" id="nav-tab" role="tablist">
                                        {prodData.menu && (prodData.menu.map((subCat, index) => ( 
                                            <button key={index} className={`nav-link ${
                                                subcategory==subCat._id?'active':(!subcategory && index == 0?'active':'')}
                                            `} onClick={()=>SubCategoryChange(subCat._id)}>{subCat.name} ({subCat.products.length})</button>
                                        )))}
                                      </div>
                                  </nav>
                                  <div className="tab-content02 recomDedBWrp" >
                                        {prodData.menu && (prodData.menu.map((subCat, index) => ( 
                                            <div key={index} className={`recommended_content ${
                                                subcategory==subCat._id?'active':(!subcategory && index == 0?'active':'')}
                                            `}>
                                                <h6>{subCat.name} ({subCat.products.length})</h6>
                                                {subCat.products && (subCat.products.map((product, key) => ( 
                                                <div key={key} className="recommended_item d-flex flex-wrap align-items-center mb-3">
                                                {/* {console.log(product)} */}
                                                    <div className="recommended_item_img">
                                                        <img src={product.defaultImage.path} alt=""/>
                                                    </div>
                                                    <div className="recommended_item_content px-3">
                                                        <h6>{product.name}</h6>
                                                        <a className="price" href="#">${product.price}</a>
                                                        <p>{product.description}</p>
                                                    </div>
                                                    <div className="recommended_item_add">
                                                        {product.quantity>0?(<>other</>):( <a href="#" className="btn02"> Add <i className="far fa-plus"></i> </a>)}
                                                       
                                                    </div>
                                                </div>
                                                )))}
                                            </div>
                                        )))}


                                          {/* <div className="recommended_content">
                                              <h6>wiskey (2)</h6>
                                              <div className="recommended_item d-flex flex-wrap align-items-center mb-3">
                                                  <div className="recommended_item_img">
                                                      <img src="assets/images/web/store01.jpg" alt=""/>
                                                  </div>
                                                  <div className="recommended_item_content px-3">
                                                      <h6>Multigrain Chips</h6>
                                                      <a className="price" href="#">$29</a>
                                                      <p>Steak with potato salad with tomatoes and tangerine sauce</p>
                                                  </div>
                                                  <div className="recommended_item_add">
                                                      <a href="#" className="btn02"> Add <i className="far fa-plus"></i> </a>
                                                  </div>
                                              </div>
                                          </div> */}
                                      
                                  </div>
                              </div>

                          </Tab>
                          <Tab eventKey="tab2" title="Top Reviews">
                          <div className="all_reviews">
                                  <h6>All Reviews</h6>
                                  <div className="all_reviews_box d-flex flex-wrap justify-content-between mb-3"> 
                                      <div className="all_reviews_img ">
                                          <img src="assets/images/web/earning.png" alt=""/>
                                      </div>
                                      <div className="all_reviews_content d-flex justify-content-between align-items-center bg-light01 p-3 rounded-3">
                                          <div className="all_reviews_cont">
                                              <h6>Janny</h6>
                                              <p>"Very good, this first time we will we how essay will come"</p>
                                          </div>
                                          <div className="stars">
                                              <i className="active fas fa-star"> </i>
                                              <i className="active fas fa-star"> </i>
                                              <i className="active fas fa-star"> </i>
                                              <i className="active fas fa-star"> </i>
                                              <i className="  fas fa-star"> </i>
                                              <span> 4.88 </span>
                                          </div>
                                      </div>
                                      <div className="message_date">
                                          <span> 2 days ago </span> 
                                      </div>
                                  </div>
                                  <div className="all_reviews_box d-flex flex-wrap justify-content-between mb-3"> 
                                      <div className="all_reviews_img ">
                                          <img src="assets/images/web/earning.png" alt=""/>
                                      </div>
                                      <div className="all_reviews_content d-flex justify-content-between align-items-center bg-light01 p-3 rounded-3">
                                          <div className="all_reviews_cont">
                                              <h6>Janny</h6>
                                              <p>"Very good, this first time we will we how essay will come"</p>
                                          </div>
                                          <div className="stars">
                                              <i className="active fas fa-star"> </i>
                                              <i className="active fas fa-star"> </i>
                                              <i className="active fas fa-star"> </i>
                                              <i className=" fas fa-star"> </i>
                                              <i className=" fas fa-star"> </i>
                                              <span> 3.88 </span>
                                          </div>
                                      </div>
                                      <div className="message_date">
                                          <span> 2 days ago </span> 
                                      </div>
                                  </div>

                              </div>
                          
                          </Tab>
                      </Tabs>
                  </div>
              </div>
          </div>
      </div>
      </>
    )
  }

  export default StoreViewPage;
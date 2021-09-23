import { Tab, Tabs } from "react-bootstrap";
import { useRouter } from "next/dist/client/router"
import Link from "next/link";
import { useEffect, useState } from "react"
import apiFunc from "../services/api";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast, ToastContainer } from "react-toastify";

export default function StoreViewPage(props) {
    const [dashdata, setDashData]=useState([]);
    const [prodData, setProdData]=useState([]);
    const [productList, setProductList]=useState([]);
    const [cartStatusList, setCartStatusList]=useState([]);
    const [tokenStatus, setTokenStatus]=useState(false);


    const router = useRouter()
    const params = router.query || '';
    const vendorId = params.id || ''
    const search = params.search || ''
    const subcategory = params.subcategory || ''

    /* function SubCategoryChange(subcat){
        var values = {
          id:storeId,
          subcategory:subcat
        }
        router.push({
            pathname: '/store-view',
            query: values,
        }) 
    } */
    function vendorProductData(vendorId){
        apiFunc.vendorProductData(vendorId).then((res)=>{
            setProdData(res.data.data)
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        if(vendorId){
            vendorProductData(vendorId)
        }
        
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
                  <div className="liquor_store_01">
                      <a href="#"> open </a>
                  </div>
                  <div className="liquor_store_02 d-flex flex-wrap  align-items-center justify-content-between py-3">
                      <h3>The Austin Store <span> <i className="fas fa-map-marker-alt"></i> Austin, Texas </span> </h3>
                      <div className="stars">
                          <i className="active fas fa-star"> </i>
                          <i className="active fas fa-star"> </i>
                          <i className="active fas fa-star"> </i>
                          <i className="fas fa-star"> </i>
                          <i className="fas fa-star"> </i>
                          <sup>4.0</sup>
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
                                          <button className="nav-link"> Recommended (2) </button>
                                        <button className={`nav-link ${subcategory=='Wiskey'?'active':''}`} onClick={()=>SubCategoryChange('Wiskey')}> Wiskey (2)</button>
                                        <button className={`nav-link ${subcategory=='Wine'?'active':''}`} onClick={()=>SubCategoryChange('Wine')}> Wine (2)</button>
                                      </div>
                                  </nav>
                                  <div className="tab-content02 recomDedBWrp" >
                                      
                                          <div className="recommended_content ">
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
                                          </div>
                                       
                                      
                                          <div className="recommended_content ">
                                              <h6>wine (2)</h6>
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
                                          </div>
                                      
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
  
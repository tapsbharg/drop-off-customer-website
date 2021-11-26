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
import moment from 'moment';
import NoFound from "../components/notFound";
import cartService from "../services/cartSrvice";


function StoreViewPage(props) {
    const [prodData, setProdData]=useState([]);
    const [venderInfo, setVenderInfo]=useState([]);
    const [guestId, setGuestId] = useState(null);
    const [storeOpenData, setStoreOpenData] = useState(false);
    const router = useRouter()
    const params = router.query || '';
    const vendorId = params.id || ''
    const search = params.search || ''
    const subcategory = params.subcategory || ''


    function SubCategoryChange(subcat){
        var values = {
          id:vendorId,
          search:search,
          subcategory:subcat
        }
        router.push({
            pathname: '/store-view',
            query: values,
        }) 
    }
    function vendorProductData(vendorId){
        let cart = props.cartData.cart
        apiFunc.vendorProductData(vendorId).then((res)=>{
            let  prods =res.data.data
            prods.menu.map(m=>{
                m.products.map(p=>{
                   let found=  cart.find(q=>{
                        return q.productId._id == p._id
                    })
                    p.quantity= found? found.quantity: 0;
                    p.isVisible = search?JSON.stringify(p).toLowerCase().includes(search.toLowerCase()):true;
                })  
            })
            // console.log(prods)
            setProdData(prods)
        }).catch((error)=>{
            console.log(error);
        })
    }
        /* function categoryChange(cate){
        let  prevData =prodData;
        prevData.menu.map(m=>{
            let res = m.products.map((obj) =>{
                obj.isVisible = JSON.stringify(obj).toLowerCase().includes(cate.toLowerCase());
                return obj;
              }
            );
            return res;
        })
        setProdData(prevData);
    } */
    function getVendor(vendorId){
        apiFunc.getVendor(vendorId).then((res)=>{
            let timeData=res.data.data
            const date = new Date();
            const dayNumber = moment(date).day(); 
            const day = moment(date).format('dddd'); 
            const hour = moment(date).format('HH')*100; 
            const minute = moment(date).format('mm'); 
            const time = Math.floor(hour)+Math.floor(minute); 
            let findOpenData = timeData.timings.find((p)=>{
                return p.dayNumber == dayNumber
            })
            let vendorOpenData = findOpenData.openAt <= time && findOpenData.closeAt >= time ? true : false;
            timeData.isOpen=vendorOpenData;
            setVenderInfo(timeData)
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        if(vendorId){
            getVendor(vendorId)
            vendorProductData(vendorId)
        }
        
    },[vendorId,props]);

  
    useEffect(()=>{
        formik.setFieldValue('id',vendorId);
        formik.setFieldValue('search',search);
        formik.setFieldValue('subcategory',subcategory);

    },[search, props]) 

   
    const initialValues={
        id:'',
        search:'',
        subcategory:'',
    }
    const validationSchema = Yup.object({
        id:Yup.string(),
        search:Yup.string(),
        subcategory:Yup.string(),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit : values => {
            console.log('submit',values)
            console.log(values)
            router.push({
                pathname: '/store-view',
               query: values,
            }) 
        },
        
    })
    async function addToCart(prodId,vendId){
        await cartService.addToCart(prodId, vendId, props);
    }
    async function removeToCart(prodId,vendId){
        await cartService.removeToCart(prodId, vendId, props);
    }

    useEffect(()=>{
        var  token= reactLocalStorage.get("token");
        var guestid = reactLocalStorage.get("guestid");
        setGuestId(guestid);

    },[])  
    // console.log(prodData)
    return (
      <>
      {vendorId =='' || vendorId == undefined ? (
          <NoFound />
      ):(
        <div className="liquor_store">
          <div className="container">
              <div className="liquor_store_inner mt-3 mb-5"> 
                  <div className="liquor_store_01" 
                  style={{
                        backgroundImage: venderInfo.coverImage?'url(' + venderInfo.coverImage.path + ')':''
                    }}>
                        {venderInfo.isOpen?(
                            <a href="#"> open </a>
                        ):(
                            <a href="#" className="btn-danger"> close </a>
                        )}
                      
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
                              <form  onSubmit={formik.handleSubmit}>
                                  <div>
                                      <i className="far fa-search"></i>
                                      <input type="search" className="form-control" placeholder="Search Item..."  {... formik.getFieldProps('search')} aria-label="Search"/> 
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
                                                    product.isVisible && (
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
                                                            <div className={`recommended_item_add prolislbtn ${product.quantity>0?'active':'deactive'}`}>
                                                                {product.quantity>0?(
                                                                <div className={`quntityPls`}>
                                                                    <button type="button" onClick={()=>removeToCart(product._id,product.vendorId)} className="qty-minus">-</button>
                                                                    <input type="number" readOnly className="qty" value={product.quantity} />
                                                                    <button type="button" onClick={()=>addToCart(product._id,product.vendorId)} className="qty-plus">+</button>
                                                                </div>
                                                                ):( 
                                                                    <a className="add_product" onClick={()=>addToCart(product._id,product.vendorId)}> add  <i className="far fa-plus"> </i> </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
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
                          <Tab eventKey="tab2" title="Top Reviews *">
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
      )}
      </>
    )
  }

  export default StoreViewPage;
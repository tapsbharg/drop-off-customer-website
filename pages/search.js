import { useRouter } from "next/dist/client/router"
import Link from "next/link";
import { useEffect, useState } from "react"

export default function SearchPage(props) {
    const router = useRouter()
    const params = router.query || '';
    const search = params.search || ''
    const category = params.category || ''
/*     useEffect(()=>{
        console.log(params)
        setSearchData(search)
        console.log(search)
    },[])
     */
    function categoryChange(cate){
        var values = {
            category:cate,
            search:search
        }
        router.push({
            pathname: '/search',
            query: values,
        }) 
    }
    return (
      <>
        <div className="search_outer ">
            <div className="container">
                <div className="search_inner my-5">
                    <form action="" className="mb-4">
                        <div>
                            <i className="far fa-search"></i>
                            <input type="search" className="form-control" defaultValue={search} placeholder="Search Item..." aria-label="Search"/> 
                            <i className="far fa-exchange"></i>
                            <ul className="low_high_price bg-white p-3 rounded-3">
                                <li> <a href="#"> Price Low to High </a> </li>
                                <li> <a href="#"> Price High to Low </a> </li>
                            </ul>
                        </div>
                    </form>
                    <nav className="mb-4">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className={`nav-link ${category=='Liquor Stores'?'active':''}`} onClick={()=>categoryChange('Liquor Stores')}> Liquor Stores</button>
                            <button className={`nav-link ${category=='Mom & Pop Stores'?'active':''}`} onClick={()=>categoryChange('Mom & Pop Stores')}> Mom & Pop Stores</button>
                            <button className={`nav-link ${category=='Dispensaries'?'active':''}`} onClick={()=>categoryChange('Dispensaries')}> Dispensaries</button>
                            <button className={`nav-link ${category=='Pharmacies'?'active':''}`} onClick={()=>categoryChange('Liquor Stores')}> Pharmacies</button>
                        </div>
                    </nav>
                    <div className="searcCosngpp">
                        <div className="product_grpup">
                            <Link href="/store-view?id=123">
                                <div className="product_informaction d-flex flex-wrap align-items-center bg-white mb-3">
                                    <div className="product_img">
                                        <img src="assets/images/product_img.jpg" alt=""/>
                                    </div>
                                    <div className="product_content px-3">
                                        <h6><b>Lindt & Sprungli</b></h6>
                                        <div className="price"><h6> $29 </h6></div>
                                        <span> Baby Monk Store </span>
                                        <a className="add_product" href="#"> add  <i className="far fa-plus"> </i> </a>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="product_grpup">
                            <Link href="/store-view?id=123">
                                <div className="product_informaction d-flex flex-wrap align-items-center bg-white mb-3">
                                    <div className="product_img">
                                        <img src="assets/images/product_img.jpg" alt=""/>
                                    </div>
                                    <div className="product_content px-3">
                                        <h6><b>Lindt & Sprungli</b></h6>
                                        <div className="price"><h6> $29 </h6></div>
                                        <span> Baby Monk Store </span>
                                        <a className="add_product" href="#"> add  <i className="far fa-plus"> </i> </a>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="product_grpup">
                            <Link href="/store-view?id=123">
                                <div className="product_informaction d-flex flex-wrap align-items-center bg-white mb-3">
                                    <div className="product_img">
                                        <img src="assets/images/product_img.jpg" alt=""/>
                                    </div>
                                    <div className="product_content px-3">
                                        <h6><b>Lindt & Sprungli</b></h6>
                                        <div className="price"><h6> $29 </h6></div>
                                        <span> Baby Monk Store </span>
                                        <a className="add_product" href="#"> add  <i className="far fa-plus"> </i> </a>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }
  
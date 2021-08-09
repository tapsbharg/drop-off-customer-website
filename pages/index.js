import Link from "next/link";
import {useFormik } from "formik";
import * as Yup from 'yup';
import { useRouter } from 'next/router'

export default function HomePage(props) {
    const router = useRouter()
    const initialValues={
        search:'',
    }
    const validationSchema = Yup.object({
        search:Yup.string().required('Please enter keyword'),
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
  return (
    <>
      <div className="pageInsieWRp">
      <div className="slider d-flex align-items-center justify-content-center">
          <div className="container">
              <ul className="d-flex flex-wra align-items-center justify-content-center" >
                  <li data-aos="fade-up" data-aos-duration="1000">
                      <Link href="/search?category=Liquor Stores">
                            <a>
                                <img src="/assets/images/liquor (2).svg" alt=""/>    
                                <span>Liquor Stores</span>
                            </a>
                        </Link>
                  </li>
                  <li  data-aos="fade-up" data-aos-duration="1500">
                      <Link href="/search?category=Mom & Pop Stores">
                            <a>
                                <img src="/assets/images/shops (1).svg" alt=""/>
                                <span>Mom & Pop Stores</span>
                            </a>
                        </Link>
                  </li>
                  <li  data-aos="fade-up" data-aos-duration="2000">
                      <Link href="/search?category=Dispensaries">
                            <a>
                                <img src="/assets/images/pharmacy (2).svg" alt=""/>
                                <span>Dispensaries</span>
                            </a>
                        </Link>
                  </li>
                  <li  data-aos="fade-up" data-aos-duration="3000">
                        <Link href="/search?category=Pharmacies">
                            <a>
                                <img src="/assets/images/drugs (2).svg" alt=""/>
                                <span>Pharmacies</span>
                            </a>
                        </Link>
                  </li>
              </ul>
              <div className="search text-center mt-3 pt-5"  data-aos="zoom-in" data-aos-duration="3500" data-aos-delay="1500">
                  <h1>Da DropOff</h1>
                  <form  onSubmit={formik.handleSubmit}>
                      <div>
                          <i className="far fa-search"></i>
                          <input type="search" {... formik.getFieldProps('search')} className="form-control" placeholder="Search Item..."  /> 
                      </div>
                      {formik.touched.search && formik.errors.search ? (
                        <div className="errorMsg">{formik.errors.search}</div>
                    ):null}
                      
                  </form>
              </div>
          </div>
      </div>


      <section className="stores_outer my-5 py-sm-5">
          <div className="container">
              <div className="stores_inner comman_h2 text-center">
                  <h2>Stores</h2>
                  <p className="para">Lorem ipsum dolor sit amet, consetetur</p>
                  <nav className="mt-4" >
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Liquor Stores</button>
                          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Mom & Pop Stores</button>
                          <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Dispensaries</button>
                          <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Pharmacies</button>
                      </div>
                  </nav>

                  <div className="tab-content my-5" id="nav-tabContent">
                      <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                          <div className="d-flex flex-wrap align-items-center justify-content-between">
                              
                              <div className="store_box bg-light02 d-flex flex-wrap" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                                  <div className="store_box_img">
                                      <img src="assets/images/store.png" alt=""/>    
                                  </div>
                                  <div className="store_content">
                                      <h5>Mom & Pop Stores</h5>
                                      <div className="start">
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className=" fas fa-star"></i>
                                          <sup>4.0</sup>
                                      </div>
                                      <div className="store_country">
                                          Texas, USA
                                      </div>
                                      <div className="store_discount">
                                          30% Off | Average Price $10 
                                      </div>
                                  </div>
                              </div>

                              <div className="store_box bg-light02 d-flex"  data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="600">
                                  <div className="store_box_img">
                                      <img src="assets/images/store.png" alt=""/>    
                                  </div>
                                  <div className="store_content">
                                      <h5>Mom & Pop Stores</h5>
                                      <div className="start">
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className=" fas fa-star"></i>
                                          <sup>4.0</sup>
                                      </div>
                                      <div className="store_country">
                                          Texas, USA
                                      </div>
                                      <div className="store_discount">
                                          30% Off | Average Price $10 
                                      </div>
                                  </div>
                              </div>

                              <div className="store_box bg-light02 d-flex"  data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="700">
                                  <div className="store_box_img">
                                      <img src="assets/images/store.png" alt=""/>    
                                  </div>
                                  <div className="store_content">
                                      <h5>Mom & Pop Stores</h5>
                                      <div className="start">
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className=" fas fa-star"></i>
                                          <sup>4.0</sup>
                                      </div>
                                      <div className="store_country">
                                          Texas, USA
                                      </div>
                                      <div className="store_discount">
                                          30% Off | Average Price $10 
                                      </div>
                                  </div>
                              </div>

                              <div className="store_box bg-light02 d-flex"  data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                                  <div className="store_box_img">
                                      <img src="assets/images/store.png" alt=""/>    
                                  </div>
                                  <div className="store_content">
                                      <h5>Mom & Pop Stores</h5>
                                      <div className="start">
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className=" fas fa-star"></i>
                                          <sup>4.0</sup>
                                      </div>
                                      <div className="store_country">
                                          Texas, USA
                                      </div>
                                      <div className="store_discount">
                                          30% Off | Average Price $10 
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>


                      <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                          <div className="d-flex flex-wrap align-items-center justify-content-between">
                              <div className="store_box bg-light02 d-flex flex-wrap" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                                  <div className="store_box_img">
                                      <img src="assets/images/store.png" alt=""/>    
                                  </div>
                                  <div className="store_content">
                                      <h5>Mom & Pop Stores</h5>
                                      <div className="start">
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className=" fas fa-star"></i>
                                          <sup>4.0</sup>
                                      </div>
                                      <div className="store_country">
                                          Texas, USA
                                      </div>
                                      <div className="store_discount">
                                          30% Off | Average Price $10 
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                          <div className="d-flex flex-wrap align-items-center justify-content-between">
                              <div className="store_box bg-light02 d-flex flex-wrap " data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                                  <div className="store_box_img">
                                      <img src="assets/images/store.png" alt=""/>    
                                  </div>
                                  <div className="store_content">
                                      <h5>Mom & Pop Stores</h5>
                                      <div className="start">
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className=" fas fa-star"></i>
                                          <sup>4.0</sup>
                                      </div>
                                      <div className="store_country">
                                          Texas, USA
                                      </div>
                                      <div className="store_discount">
                                          30% Off | Average Price $10 
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                          <div className="d-flex flex-wrap align-items-center justify-content-between">
                              <div className="store_box bg-light02 d-flex flex-wrap " data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                                  <div className="store_box_img">
                                      <img src="assets/images/store.png" alt=""/>    
                                  </div>
                                  <div className="store_content">
                                      <h5>Mom & Pop Stores</h5>
                                      <div className="start">
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className="active fas fa-star"></i>
                                          <i className=" fas fa-star"></i>
                                          <sup>4.0</sup>
                                      </div>
                                      <div className="store_country">
                                          Texas, USA
                                      </div>
                                      <div className="store_discount">
                                          30% Off | Average Price $10 
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <a className="btn cus_btn custom01 "> View All </a>
              </div>
          </div>
      </section>


      <section className="works_outer comman_h2 bg-dark01 text-center">
          <div className="container">
              <h2 >How It Works</h2>
              <p className="para">Lorem ipsum dolor sit amet, consetetur</p>
              
              <div className="works_inner d-flex align-items-center justify-content-between mt-5">
                  <div className="works"  data-aos="fade-left"  data-aos-duration="1500" data-aos-delay="500">
                      <img src="assets/images/work1.svg" alt=""/>
                      <h5>Select Products of Your Choice</h5>
                      <p>Choose your desired products from nearby located different stores</p>
                  </div>
                  <div className="works" data-aos="zoom-in"  data-aos-duration="1500" data-aos-delay="100">
                      <img src="assets/images/work2.svg" alt=""/>
                      <h5>Easy Checkout</h5>
                      <p>Order from the best local liquor stores, grocery stores, dispensaries and pharmacies with easy, on-demand delivery.</p>
                  </div>
                  <div className="works" data-aos="fade-right"  data-aos-duration="1500" data-aos-delay="500">
                      <img src="assets/images/work3.svg" alt=""/>
                      <h5>Get delivered at Your Doorstep</h5>
                      <p>Get quick or scheduled delivery for your desired products from driver.</p>
                  </div>
              </div>
          </div>
      </section>


      <section className="about_outer">
          <div className="container">
              <div className="row">
                  <div className="col-sm-5" data-aos="fade-right"  data-aos-duration="1500" data-aos-delay="500">
                      <img src="assets/images/about.svg" alt=""/>
                  </div>
                  <div className="col-sm-7">
                  <h2>About</h2>
                  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut 
                      labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
                      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                      consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                      no sea takimata sanctus est Lorem ipsum dolor sit ametLorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. </p>        
                  </div>
              </div>
          </div>
      </section>


      <section  className="signup_outer comman_h2 bg-dark01 text-center">
          <div className="container">
              <h2>Sign up</h2>
              <p className="para">Lorem ipsum dolor sit amet, consetetur</p>

              <div className="d-flex flex-wrap align-items-center justify-content-between pt-5">
                  <div className="signup_box" data-aos="zoom-in"  data-aos-duration="1500" data-aos-delay="100">
                      <img src="assets/images/sig.svg" alt=""/>
                      <a className="btn cus_btn custom01 "> Sign up as a store </a>
                  </div>
                  <div className="signup_box" data-aos="zoom-in"  data-aos-duration="1500" data-aos-delay="100">
                      <img src="assets/images/sig01.svg" alt=""/>
                      <a className="btn cus_btn custom01 ">  Sign up as a driver </a>
                  </div>
              </div>
          </div>
      </section>
      </div>
    </>
  )
}

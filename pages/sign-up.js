import Link from "next/link";

export default function SignUpPage(props) {
    return (
      <>
        <section className="sign_up_outer">
            <div className="container">
            <div className="sign_up_inner mt-1">
                <div className="row">
                    <div className="col-sm-6 d-flex justify-content-center align-items-center" data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                        <img src="/assets/images/sign-up.svg" alt=""/>
                    </div>
                    <div className="col-sm-6" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                        <div className="sign_upform comman_from my-4">
                            <form>
                                <h5> Create An Account </h5>
                                <div className="mb-3">
                                    <label className="form-label"> name</label>
                                    <input type="text" className="form-control" id="" placeholder="Enter Your Name"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">email</label>
                                    <input type="email" className="form-control" id="" placeholder="Enter Your Email"/>
                                </div>
                                <div className="mb-3">;
                                    <label className="form-label">Mobile Number</label>
                                    <input type="number" className="form-control" id="" placeholder="Enter Your Mobile Number"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" id="" placeholder="Enter Your Password"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Referral Code</label>
                                    <input type="text" className="form-control" id="" placeholder="Enter Referral Code"/>
                                </div>
                                
                                
                                
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="checkbox form-check-label" for="exampleCheck1">
                                        By Creating an account, you agree to our <br/>
                                        <a href="">terms & condition </a>and <a href=""> Privacy policy </a>
                                    </label>
                                </div>
                                <div className="text-center">
                                    <label className="mb-2">
                                    "By continuing you will receive a one-time verification code to your phone number by SMS. Message and data rates may apply."
                                    </label>
                                    <button className="btn cus_btn custom01"> Sign Up </button>
                                </div>
                                <div className="continu_social_icons my-3">
                                    <label > Continue with : </label>
                                    <ul className="d-flex align-items-center  justify-content-center my-2">
                                        <li><a href="#"> <i className="fab fa-facebook"></i> </a></li>
                                        <li><a href="#"> <i className="fab fa-google"></i> </a></li>
                                    </ul>
                                </div>

                                <span> Already have an account ? <Link href="/sign-in"> Sign In </Link> </span>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
      </>
    )
  }
  
import Link from "next/link";

export default function SignInPage(props) {
    return (
      <>
        <section className="sign_up_outer">
            <div className="container">
            <div className="sign_up_inner my-5">
                <div className="row">
                    <div className="col-sm-6"  data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                        <img src="assets/images/sign-up.svg" alt=""/>
                    </div>
                    <div className="col-sm-6"  data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                        <div className="sign_upform comman_from my-4">
                            <form>
                                <h5> Sign In To Your Account </h5>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" id="" placeholder="Enter Your Email"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" id="" placeholder="Enter Your Password"/>
                                </div> 
                                <span className="forgot_pass"> <Link href="/forgot-password"> Forgot Password? </Link> </span>
                                <div className="submitbtn text-center">
                                    <button className="btn cus_btn custom01"> Sign In </button>
                                </div>
                                <div className="continu_social_icons my-3">
                                    <label for=""> Continue with : </label>
                                    <ul className="d-flex align-items-center  justify-content-center my-2">
                                        <li><a href="#"> <i className="fab fa-facebook"></i> </a></li>
                                        <li><a href="#"> <i className="fab fa-google"></i> </a></li>
                                    </ul>
                                </div>
                                <span> Already have an account ? <Link href="/sign-up"> Sign Up Now </Link> </span>
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
  
import Link from "next/link";

export default function VerifyOtpPage(props) {
    return (
      <>
        <div className="sign_up_outer">
            <div className="container">
            <div className="sign_up_inner mt-5">
                <div className="row">
                    <div className="col-sm-6" data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                        <img src="assets/images/sign-up.svg" alt=""/>
                    </div>
                    <div className="col-sm-6" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                        <div className="sign_upform comman_from my-4">
                            <form className="verify_otp">  
                                <h5> Verify OTP </h5>
                                <p className="text-center"> Please enter the OTP we have sent to you. </p>
                                <div className="enter_code" id="form">
                                    <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                    <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                    <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                    <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                </div>
                                <span className="resend"> Didn't receive ? <a href="#">  Resend </a> </span>
                                <div className="submitbtn text-center">
                                    <button className="btn cus_btn custom01"> Verify </button>
                                </div>
                                <span> Already have an account ? <Link href="/sign-in"> Sign In </Link> </span>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </>
    )
  }
  
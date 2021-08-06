import Link from "next/link";
import { useState } from "react";
import { Modal } from "react-bootstrap";
export default function ResetPasswordPage(props) {
    const [successModal,setSuccessModal]=useState(true);
    const signInModal = (type) =>{
        setSuccessModal(type)
    }
    return (
      <>
        <section className="sign_up_outer">
            <div className="container">
                <div className="sign_up_inner mt-5">
                    <div className="row">
                        <div className="col-sm-6" data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                            <img src="assets/images/sign-up.svg" alt=""/>
                        </div>
                        <div className="col-sm-6" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                            <div className="sign_upform comman_from my-4">
                                <form>
                                    <h5> Reset Password </h5>
                                    <div className="mb-3">
                                        <label className="form-label">Enter New Password</label>
                                        <input type="password" className="form-control" id="" placeholder="Enter Your New Password"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirm Your Password</label>
                                        <input type="password" className="form-control" id="" placeholder="Enter Your Confirm Password"/>
                                    </div> 
                                    <div className="submitbtn text-center">
                                    <button className="btn cus_btn custom01"> Reset Password </button>
                                </div>
                                    <span> Already have an account ? <Link href="/sign-in"> Sign In </Link> </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Modal
                show={successModal}
                onHide={()=>{signInModal(false)}}
                backdrop="static"
                keyboard={false}
                className="modal-gray"
                centered
            >
                <div class="pass_rest_success">
                    <div class="pass_rest_success_contant bg-white p-5"  data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                        <i class="fal fa-times-circle" onClick={()=>{signInModal(false)}}></i>
                        <h5> Password Reset Successfully </h5>
                        <p>You have successfully reset your password. Please use your new password when signing in.</p>
                        <Link href="/sign-in"><span class="btn cus_btn custom01"> Sign Up </span></Link>
                    </div>
                </div>
            </Modal>
      </>
    )
  }
  
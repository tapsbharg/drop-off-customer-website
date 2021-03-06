import Link from "next/link";

export default function AddMobilePage(props) {
    return (
      <>
        <section className="sign_up_outer">
            <div className="container">
            <div className="sign_up_inner mt-5">
                <div className="row">
                    <div className="col-sm-6"  data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                        <img src="assets/images/sign-up.svg" alt=""/>
                    </div>
                    <div className="col-sm-6"  data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="500">
                        <div className="sign_upform comman_from my-4">
                            <form>
                                <h5> Add Mobile </h5>
                                <div className="mb-3">
                                    <label for="" className="form-label">Mobile Number</label>
                                    <input type="number" className="form-control" id="" placeholder="Enter Your Mobile Number"/>
                                </div>
                                <div className="submitbtn text-center">
                                    <button className="btn cus_btn custom01"> Send OTP </button>
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
  
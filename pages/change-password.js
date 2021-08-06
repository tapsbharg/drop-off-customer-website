import Sidebar from "../components/sidebar";

export default function ChangePasswordPage(props) {
    return (
      <>
        <section className=" your-order py-3 mb-5">
            <div className="container">
                <div className="customer_profile_outer d-flex flex-wrap ">
                    <div className="opction_left">
                        <Sidebar props={props} />
                    </div>

                    <div className="description_right">
                        <div className=" change_password_web">
                            <div className="form_middle">
                                <div className="comman_from">
                                    <h5> Change Password  </h5>        
                                    <form className="change_pass">
                                        <div className="mb-3">
                                            <label className="form-label"> Current Password </label>
                                            <input type="password" className="form-control" id="" placeholder="Enter Current Password"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"> Enter New Password </label>
                                            <input type="password" className="form-control" id="" placeholder="Enter New Password"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"> Confirm New Password </label>
                                            <input type="password" className="form-control" id="" placeholder=" Confirm New Password"/>
                                        </div>
                                        <a className="btn cus_btn custom01"> Save </a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
      </>
    )
  }
  
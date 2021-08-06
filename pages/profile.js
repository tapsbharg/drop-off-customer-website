import Sidebar from "../components/sidebar";

export default function ProfilePage(props) {
    return (
      <>
        
        <div className="cus_dashbord_outer py-5">
            <div className="container">
                <div className="cus_dashbord_inner">
                    <div className="customer_profile_outer d-flex flex-wrap ">
                        <div className="opction_left">
                            <Sidebar props={props} />
                        </div>
                        <div className="description_right">
                            <div className="profile_outer"> 
                                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                                    <h6>Profile </h6>  
                                </div>
                                <div className="profile_img d-flex flex-wrap align-items-center justify-content-center bg-light01 p-5 rounded-3">
                                    <img src="assets/images/web/earning.png" alt=""/>
                                    <i className="far fa-camera"></i>
                                </div>
                                <div className="comman_from">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">  name</label>
                                            <input type="text" className="form-control" id="" placeholder="Enter  Name"/>
                                        </div> 
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" id="" placeholder="Enter Your Email"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Mobile Number</label>
                                            <input type="number" className="form-control" id="" placeholder="Enter Your Mobile Number"/>
                                        </div>
                                        <button className="btn cus_btn custom01"> Save </button>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }
  
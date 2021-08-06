import Sidebar from "../components/sidebar";

export default function GetHelpsPage(props) {
    return (
      <>
        <section className="your-order py-3 mb-5">
            <div className="container">
                <div className="customer_profile_outer d-flex flex-wrap ">
                    <div className="opction_left">
                        <Sidebar props={props} />
                    </div>
                    <div className="description_right">
                    <div className="">
                        <div className="form_middle">
                        <h5> Get Help  </h5>
                            <div className="comman_from">
                            
                                <form className="raise_ticket">
                                    <div className="mb-3">
                                        <label for="" className="form-label">Define Your Issue*</label>
                                        <input type="text" className="form-control" id="" placeholder="Enter  Your Issue"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="" className="form-label">Order Number</label>
                                        <select name="cars" id="cars">
                                            <option value="volvo">Enter Your Number</option>
                                            <option value="volvo">Issue 01</option>
                                            <option value="saab">Issue 02</option>
                                        </select>
                                        
                                    </div>
                                    <div className="mb-3">
                                        <label for="" className="form-label">Subject*</label>
                                        <input type="text" className="form-control" id="" placeholder="Enter  Subject"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="" className="form-label">Message*</label>
                                        <textarea id="w3review" name="w3review" placeholder="Enter Message"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label for="" className="form-label">Upload Attachments (*jpeg, *jpg, *png)</label>
                                        <input type="file" className="form-control" id="" placeholder="Enter Your Subject"/>
                                    </div>    
                                    <button className="btn cus_btn custom01"> Submit   </button>
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
  
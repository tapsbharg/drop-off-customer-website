export default function CouponsPage(props) {
    return (
      <>
        <div className="apply_coupon d-flex justify-content-center align-items-center bg-light02">
            <div className="apply_coupon_contant bg-white p-5 rounded-3"  data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" data-aos-delay="800">
                <i className="fal fa-times-circle"></i>
                <h5> Apply Coupon </h5>
                <form className="mb-3" action="">
                    <div>
                        <i className="far fa-search"></i>
                        <input type="search" className="form-control" placeholder="Search Item..." aria-label="Search"/> 
                    </div>
                </form>
                <div className="coupon_code mb-3">
                    <ul>
                        <li className="off"><b> 50% OFF </b></li>
                        <li className="content">Use code NEW50 to avail this offer</li>
                        <li className="edit">
                            <a href="#"> Apply </a> 
                        </li>
                    </ul>
                </div>
                <div className="coupon_code mb-3">
                    <ul>
                        <li className="off"><b> 50% OFF </b></li>
                        <li className="content">Use code NEW50 to avail this offer</li>
                        <li className="edit">
                            <a href="#"> Apply </a> 
                        </li>
                    </ul>
                </div>
                <div className="coupon_code mb-3">
                    <ul>
                        <li className="off"><b> 50% OFF </b></li>
                        <li className="content">Use code NEW50 to avail this offer</li>
                        <li className="edit">
                            <a href="#"> Apply </a> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </>
    )
  }
  
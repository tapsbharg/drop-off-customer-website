import AuthLayout from "../components/authLayout";

export default function OrderDetailPage(props) {
    return (
      <>
      <AuthLayout props={props}>
        <div className="checkout py-4">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="summer_outer">
                            <h3> Order Detail </h3>   
                            <div className="summer_box00 bg-light02 rounded-3 p-3 mb-3">
                                <table className="order_from">
                                    <thead>
                                        <tr>
                                            <th colSpan="4"> Order From </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="address" colSpan="2"> The Austin Store <span><i className="fas fa-map-marker-alt"></i> Austin, Texas</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="on-off"> 
                                                <div className="  form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked=""/>
                                                </div>
                                            </td>
                                            <td className="content">Glenfiddich Excellence</td>
                                            <td className="quntity">  
                                                        x1
                                            </td>
                                            <td className="price" > $50 </td>
                                        </tr>

                                        <tr>
                                            <td className="on-off"> 
                                                <div className="  form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked=""/>
                                                </div>
                                            </td>
                                            <td className="content">Glenfiddich Excellence</td>
                                            <td  className="quntity">  
                                                        x1
                                            </td>
                                            <td className="price"> $50 </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                                
                            
                            <div className="summer_box04 bg-light02 rounded-3 p-3 mb-3">
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan="2">Billing Summary</th>
                                        </tr>
                                    </thead>
                                    <tbody>   
                                        <tr>   
                                            <td> Payable Amount </td>
                                            <td>$100</td>
                                        </tr>
                                        <tr>
                                            <td> Referral </td>
                                            <td>-$5</td>
                                        </tr>
                                        <tr>
                                            <td>Coupon (Store) </td>
                                            <td>-$10</td>
                                        </tr>
                                        <tr>
                                            <td>Service Fee </td>
                                            <td>$17</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>

                    <div className="col-sm-6">
                    <h3> Review </h3> 
                        <div className="delivery-address bg-white rounded-3 p-3 mb-3">
                            <h6> Given Review </h6> 
                            <hr/>
                            <div className="address_group d-flex justify-content-between my-3">
                                <div className="location_img">
                                    <p> <b> Store </b> <span> Good Quality, Good Wine </span> </p>
                                </div>
                                <div className="location_content">
                                    <div className="stars">
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <sup>4.5</sup>
                                    </div> 
                                </div>
                            </div>
                            <hr/>
                            <p> <b> Driver </b>   <a className="but03" href="#">   Add Review </a></p>
                        </div>
                        <div className="delivery-address bg-white rounded-3 p-3 mb-3">
                            <h6> Received Review </h6> 
                            <hr/>
                            <div className="address_group d-flex justify-content-between my-3">
                                <div className="location_img">
                                    <p> <b> By Driver </b> <span> Good Communication </span> </p>
                                </div>
                                <div className="location_content">
                                    <div className="stars">
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="active fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <sup>4.5</sup>
                                    </div> 
                                </div>
                            </div>
                            
                        </div>
                    
                    </div>
                </div> 
            </div>
        </div>

        </AuthLayout>
      </>
    )
  }
  
import Sidebar from "../components/sidebar";

export default function AddressesPage(props) {
    return (
      <>
        <section className="my-5">
            <div className="container">
                <div className="customer_profile_outer d-flex flex-wrap ">
                    <div className="opction_left">
                        <Sidebar props={props} />
                    </div>
                    <div className="description_right">

                        <div className="my_address_outer"> 
                            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                                <h6>My Addresses </h6>  
                                <a className="btn custom01" href="#"> Add New </a> 
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="my_address border rounded-3 p-3">
                                        <h6>Home</h6>
                                        <p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor </p>
                                        <ul className="d-flex flex-wrap justify-content-between align-items-center ">
                                            <li> <a href="#"> Edit </a> </li>
                                            <li> <a href="#"> Delete </a> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="my_address border rounded-3 p-3">
                                        <h6>Home</h6>
                                        <p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor </p>
                                        <ul className="d-flex flex-wrap justify-content-between align-items-center ">
                                            <li> <a href="#"> Edit </a> </li>
                                            <li> <a href="#"> Delete </a> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="my_address border rounded-3 p-3">
                                        <h6>Home</h6>
                                        <p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor </p>
                                        <ul className="d-flex flex-wrap justify-content-between align-items-center ">
                                            <li> <a href="#"> Edit </a> </li>
                                            <li> <a href="#"> Delete </a> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="my_address border rounded-3 p-3">
                                        <h6>Home</h6>
                                        <p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor </p>
                                        <ul className="d-flex flex-wrap justify-content-between align-items-center ">
                                            <li> <a href="#"> Edit </a> </li>
                                            <li> <a href="#"> Delete </a> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="my_address border rounded-3 p-3">
                                        <h6>Home</h6>
                                        <p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor </p>
                                        <ul className="d-flex flex-wrap justify-content-between align-items-center ">
                                            <li> <a href="#"> Edit </a> </li>
                                            <li> <a href="#"> Delete </a> </li>
                                        </ul>
                                    </div>
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
  
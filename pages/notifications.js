import Link from 'next/link';

export default function Notifiactions() {

    return (
      <>
         <section className="notification_outer py-5">
            <div className="container"> 
                <h5> Notification </h5>  

                <div className="notification_box  bg-light02 p-4 mb-3" data-aos="fade-up"  data-aos-duration="1500" data-aos-delay="100">
                    <ul>
                        <li className="active">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                            </div>
                        </li>
                        <li className="title"> <b> Free Delivery </b></li>
                        <li className="date">02:32AM</li>
                        <li className="content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</li>
                    </ul>
                </div>
                <div className="notification_box  bg-white p-4 mb-3"  data-aos="fade-up"  data-aos-duration="1500" data-aos-delay="150">
                    <ul>
                        <li className="active">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                            </div>
                        </li>
                        <li className="title"> <b> Free Delivery </b></li>
                        <li className="date">02:32AM</li>
                        <li className="content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</li>
                    </ul>
                </div>
                <div className="notification_box  bg-light02 p-4 mb-3"  data-aos="fade-up"  data-aos-duration="1500" data-aos-delay="200">
                    <ul>
                        <li className="active">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                            </div>
                        </li>
                        <li className="title"> <b> Free Delivery </b></li>
                        <li className="date">02:32AM</li>
                        <li className="content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</li>
                    </ul>
                </div>
                <div className="notification_box  bg-light02 p-4 mb-3"  data-aos="fade-up"  data-aos-duration="1500" data-aos-delay="250">
                    <ul>
                        <li className="active">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                            </div>
                        </li>
                        <li className="title"> <b> Free Delivery </b></li>
                        <li className="date">02:32AM</li>
                        <li className="content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</li>
                    </ul>
                </div>
            </div>
        </section>

      </>
    )
  }
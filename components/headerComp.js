import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import api from "../services/api";

export default function Header(appProps) {
  const [profile, setProfile] = useState({});
  const history = useRouter();
  useEffect(() => {
    if (appProps.props.auth) {
      api.getProfileData().then((res) => {
        // console.log("in api ", res.data);
        let data = res.data.data;
        setProfile(data);
      }).catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
    }
  }, [appProps.props.auth]);
  function logOut(){
    console.log(appProps.props)
    appProps.props.logout();
    history.push("/sign-in");
  }
    return (
      <>
        <header className="header">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-between py-3">
            <div className="logo d-flex">
                <Link className="d-flex align-items-center" href="/">
                  <img src="/assets/images/logo.svg" alt="" />
                  </Link>
                  {appProps.props.auth && (
                    <ul>
                      <li><a href="#"><i className="fas fa-map-marker-alt"></i> Scott Rd Keuka Park, New York(NY) </a></li>
                    </ul>
                 )}
            </div>
            {!appProps.props.auth && (
                <nav className="d-flex flex-wrap">
                    <ul className="d-flex text-end ">
                        <li className="active"><Link href="/">Home</Link></li>
                        <li><Link href="/sign-in">Sign in</Link></li>
                    </ul>
                </nav>
            )}
            {appProps.props.auth && (
            <div className="after_login">
              <ul className="d-flex text-end ">
                <li className="notice notification_popup_outer">
                  <Dropdown>
                    <Dropdown.Toggle variant="thm" id="dropdown-basic">
                      <i className={"far fa-bell"}></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="notification_popup_inner">
                        <div className="notification_box  p-3">
                          <ul>
                            <li className="active">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexSwitchCheckChecked"
                                  checked=""
                                />
                              </div>
                            </li>
                            <li className="title">
                              {" "}
                              <b> Free Delivery </b>
                            </li>
                            <li className="date">02:32AM</li>
                            <li className="content">
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et dolore magna{" "}
                            </li>
                          </ul>
                        </div>
                        <div className="notification_box  p-3">
                          <ul>
                            <li className="active">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexSwitchCheckChecked"
                                  checked=""
                                />
                              </div>
                            </li>
                            <li className="title">
                              {" "}
                              <b> Free Delivery </b>
                            </li>
                            <li className="date">02:32AM</li>
                            <li className="content">
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et dolore magna{" "}
                            </li>
                          </ul>
                        </div>
                        <div className="notification_box  p-3">
                          <ul>
                            <li className="active">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexSwitchCheckChecked"
                                  checked=""
                                />
                              </div>
                            </li>
                            <li className="title">
                              {" "}
                              <b> Free Delivery </b>
                            </li>
                            <li className="date">02:32AM</li>
                            <li className="content">
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et dolore magna{" "}
                            </li>
                          </ul>
                        </div>
                        <Link href="/notifications">
                          <span className="btn cus_btn custom01 d-block"> View All </span>
                        </Link>
                      </div>
                    
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="admin_login">
                  <span>
                    <Dropdown>
                      <Dropdown.Toggle variant="thm" id="dropdown-basic">
                        <i className={"fa fa-user"}></i>
                        {profile.name ? (
                        <span>{profile.name} </span>
                          ) : (
                            <span>Loading </span>
                          )}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              logOut();
                            }}
                          >
                            Logout
                          </button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                  {/* </Link> */}
                </li>

                
              </ul>
            </div>
          )}
  
            


        </div>
      </div>
    </header>
  
      </>
    )
  }
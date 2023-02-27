import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Moment from "react-moment";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import apiFunc from "../services/api";
import api from "../services/api";
import common from "../services/common";
import { UserContext } from "./context/locationContext";

export default function Header(appProps) {
  const [profile, setProfile] = useState({});
  const [address, setAddress] = useState({});
  const [notificationList, setNotification] = useState(new Array());
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const history = useRouter();
  const[homecolor, setHomeColor] =useState(true);
  // const[signincolor, setSignInColor] = useState(false);
  const context = useContext(UserContext);
  const calendarStrings = {
    lastDay: "[Yesterday at] LT",
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "[last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "L",
  };
  useEffect(() => {
    if (appProps.props.auth) {
      api
        .getProfileData()
        .then((res) => {
          // console.log("in api ", res.data);
          let data = res.data.data;
          context.setProfile(res.data.data);
          let addrss = data.address
            .filter((a) => a.isDefault == true)
            .map((b) => {
              let coords = {
                lat: b.location.coordinates[1],
                lng: b.location.coordinates[0],
              };
              coords = JSON.stringify(coords);
              reactLocalStorage.set("geoServer", coords);
              setAddress(b);
              context.setAddress(b.address);
              context.setLocation(coords);
            });
          setProfile(data);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
      getNotification();
    }
  }, [appProps.props.auth]);
  function logOut() {
    appProps.props.logout();
    // history.push("/sign-in");
  }
  /*   const things = useContext(ThingsContext)
   const renderThings = things => {
     console.log(things);
    //  return things;
     return things.map( thing => {
         return thing
     })
   } */

  //  const AddressContext = AddressContext(address);
  //  console.log(AddressContext)

  const getNotification = () => {
    let notiData = {
      page: 1,
      perPage: 20,
    };
    apiFunc
      .notification(notiData)
      .then((res) => {
        setNotification(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const toggleDropdown = () => setDropdownIsOpen(!dropdownIsOpen);
  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-between py-3">
            <div className="logo d-flex">
              <Link className="d-flex align-items-center" href="/">
                <img src="/assets/images/logo.svg" alt="" />
              </Link>

              {/* <AddressContext.Provider value={{address:'kunwar'}}>
                    {console.log(Children.map((data,index)=> {return data}))}
                </AddressContext.Provider>
                <AddressContext.Consumer>
                {context => {
                  if (context === undefined) {
                    throw new Error('CountConsumer must be used within a CountProvider')
                  }
                  console.log(context)
                  // return children(context)
                }}
                </AddressContext.Consumer> */}
            </div>
            <div className="heaDerAdress">
              {appProps.props.auth && (
                <ul>
                  <li>
                    <Link href="/addresses">
                      <a href="#">
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {context.address}{" "}
                      </a>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            {!appProps.props.auth && (
              <nav className="d-flex flex-wrap">
                <ul className="d-flex text-end ">
                  <li className={ homecolor?"active": ""}>
                    <Link href="/"  onClick={()=>setHomeColor(true)}>Home</Link>
                  </li>
                  <li className={ homecolor?"": "active"}>
                    <Link href="/sign-in" onClick={()=>setHomeColor(false)} >Sign in</Link>
                  </li>
                </ul>
              </nav>
            )}
            {appProps.props.auth && (
              <div className="after_login">
                <ul className="d-flex text-end ">
                  <li className="notice notification_popup_outer">
                    <Dropdown show={dropdownIsOpen} onToggle={toggleDropdown}>
                      <Dropdown.Toggle variant="thm" id="dropdown-basic">
                        <i className={"far fa-bell"}></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <div className="notification_popup_inner">
                          <div className="notifyInside scroller">
                            {notificationList.map((data, key) => (
                              <div className="notifyWrappr  p-3" key={key}>
                                <div className="d-flex flex-wrap justify-content-between notifyHead">
                                  <div className="notifyHeadinNamge">
                                    <h4>{data.title}</h4>
                                  </div>
                                  <div className="notifyTimer">
                                    <Moment calendar={calendarStrings}>
                                      {data.createdAt}
                                    </Moment>
                                  </div>
                                </div>
                                <div className="notifyDescrp">
                                  <p>{data.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Link href="/notifications">
                            <span
                              onClick={() => toggleDropdown()}
                              className="btn cus_btn custom01 d-block"
                            >
                              View All
                            </span>
                          </Link>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  <li className="admin_login">
                    <span>
                      <Dropdown>
                        <span>
                          <Link href="/profile">
                            <span>
                              {profile?.image?.path ? (
                                <img
                                  src={profile?.image?.path}
                                  alt="profile image"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "50%",
                                  }}
                                />
                              ) : (
                                <i className={"fa fa-user"}></i>
                              )}
                              {profile.name ? (
                                <span> {profile.name} </span>
                              ) : (
                                <span> Loading </span>
                              )}
                            </span>
                          </Link>
                          <Dropdown.Toggle
                            variant="thm"
                            id="dropdown-basic"
                          ></Dropdown.Toggle>
                        </span>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                logOut();
                              }}
                            >
                              Sign Out
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
  );
}

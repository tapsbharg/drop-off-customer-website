
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
function DashLayout (props) {
    const [loginCheck, setLoginCheck]=useState();
    const history = useRouter();
    function redirectLogin(){
        let urlParams = new URLSearchParams(window.location.search);
        let ssr = urlParams.get("ssr");
        if (ssr != 1) {
            history.push("/sign-in");
        }
    }
    useEffect(() => {
        setLoginCheck(props.props.auth)
        if(loginCheck == false){
            redirectLogin()
        }
    }, [loginCheck]);
    
    return (
      <>
      
      
      <div className="cus_dashbord_outer py-5">
            <div className="container">
                <div className="cus_dashbord_inner">
                    <div className="customer_profile_outer d-flex flex-wrap ">
                        <div className="opction_left">
                            <Sidebar props={props} />
                        </div>
                        {!loginCheck && (<div className="loadingSren">Loading</div>)}
                        {loginCheck && (props.children)}
                    </div>
                </div>
            </div>
        </div>

        
      </>
    )
}
export default DashLayout;
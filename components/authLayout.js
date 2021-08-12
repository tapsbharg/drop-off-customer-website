
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function AuthLayout (props) {
    const [loginCheck, setLoginCheck]=useState();
    const history = useRouter();
    function redirectLogin(){
        history.push("/sign-in");
    }
    useEffect(() => {
        setLoginCheck(props.props.auth)
        if(loginCheck == false){
            redirectLogin()
        }
    }, [loginCheck]);
    
    return (
      <>
      {!loginCheck && (<div className="loadingSren">Loading</div>)}
    {loginCheck && (props.children)}
      </>
    )
}
export default AuthLayout;
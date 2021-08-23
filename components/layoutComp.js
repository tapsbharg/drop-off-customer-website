import Head from "next/head";
import Footer from "./footerComp";
import Header from "./headerComp";
import { useRouter } from "next/router";
import apiFunc from "../services/api";
import { reactLocalStorage } from "reactjs-localstorage";
import { useEffect } from "react";
export default function Layout(props) {
function refreshtoken(){
  apiFunc.refreshToken().then((res) => {
    reactLocalStorage.set("token", res.data.token);
  })
  .catch((error) => {
    // reactLocalStorage.remove("token");
  });
}
useEffect(() => {
  var token=reactLocalStorage.get("token");
  const intrVal = setInterval(() => {
    refreshtoken()
  }, 2000);
  if(!token){
    clearInterval(intrVal);
  }
},[])


    return (
      <>
        <Head>
            <title>Drop Off Customer</title>
        </Head>
        <div className="loaderWRapper">
          <div className="loader loaderCircle"></div>
        </div>
        <div className="pageMainWrap">
        <Header  props={props} />
            <div className="pagContentWRp">
                {props.children}
            </div>
        <Footer />
        </div>
      </>
    )
  }
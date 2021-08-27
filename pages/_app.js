import { useEffect, useState } from "react";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "../public/assets/css/all.css";
import "../public/favicon.ico";
import "../public/sass/comman.css";
import "../public/assets/css/dev.css";
import { reactLocalStorage } from "reactjs-localstorage";
import Layout from "../components/layoutComp";
import Head from "next/head";
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import apiFunc from "../services/api";

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());


function App({ Component, pageProps }) {
  let history=useRouter();
  useEffect(() => {
    AOS.init();
  }, []);
  const [isAuth, authDone] = useState(null);
  const [cartData, setCartData] = useState(null);
  
  useEffect(() => {
    var tokenAccess = reactLocalStorage.get("token");
    var authType = tokenAccess !== undefined ? true : false;
    authDone(authType);
  }, []);
  const logOut = () => {
    reactLocalStorage.clear();
    authDone(false);
  };
  const setLogin = () => {
    authDone(true);
  };
  const loginCheck = () => {
    authDone(true);
  };
  const cartListShow = () => {
    apiFunc.cartListData().then((res)=>{
      setCartData(res.data.data)
    }).catch((error)=>{
        console.log(error);
    })
  };

Router.events.on('routeChangeStart', () => {
    document.body.className = 'loading_page';
});
Router.events.on('routeChangeComplete', () => {
    document.body.className = document.body.className.replace("loading_page","");
});
  return (
        <Layout 
        logout={()=>logOut()} 
        auth={isAuth} 
        getCart={()=>cartListShow()} 
        cartData={cartData}>
            <Head>
                <link rel="stylesheet" href="/favicon.ico"/>
                <link rel="stylesheet" href="/assets/css/all.css"/>
                <link rel="stylesheet" href="/sass/comman.css"/>
                <link rel="stylesheet" href="/assets/css/custom.css"/>
                <link rel="stylesheet" href="/assets/css/dev.css"/>
            </Head>
            <Component 
            setlogin={()=>setLogin()} 
            auth={isAuth} 
            getCart={()=>cartListShow()} 
            cartData={cartData} {...pageProps} />
        </Layout>
      );
}

export default App;

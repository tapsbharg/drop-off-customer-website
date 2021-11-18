import { useEffect, useState } from "react";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "../public/assets/css/all.css";
import "../public/favicon.ico";
import "react-toastify/dist/ReactToastify.css";
import "../public/sass/comman.css";
import "../public/assets/css/custom.css";
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
  const [guestid, setGuestid] = useState(null);

  
  async function setTokenGuestid(){
    var token = reactLocalStorage.get("token");
    var guest = reactLocalStorage.get("guestid");
    let ifstate=()=>{
      if(!token && !guest){
        apiFunc.guestid().then((res)=>{
            reactLocalStorage.set("guestid",res.data.guestId);
            setGuestid(res.data.guestId);
        }).catch((error)=>{
            console.log(error);
        })
      }else if(token){
        reactLocalStorage.remove("guestid");
        setGuestid(null);
      }else{
        setGuestid(guest);
      }
    }
    var authType = token !== undefined ? true : false;
    authDone(authType);
    await ifstate();
  }
  useEffect(() => {
    setTokenGuestid();
    cartListShow();
    
    
    /* var token = reactLocalStorage.get("token");
    var guestid = reactLocalStorage.get("guestid");
    if(token != undefined && guestid != undefined){
      console.log(token, guestid)
      mergeCart(guestid);
    } */
    
  }, [isAuth, guestid]);
  const logOut = () => {
    reactLocalStorage.clear();
    authDone(false);
    history.push({
      pathname: '/sign-in',
  }) 
  };
  const setLogin = () => {
    authDone(true);
  };
  const loginCheck = () => {
    authDone(true);
  };
  const cartListShow = () => {
    if(isAuth || guestid){
      if(!guestid && isAuth){
        apiFunc.cartListData().then((res)=>{
          const resData=res.data.data != undefined ?res.data.data:{
            cart:[],
            vendor:[]
          };
          setCartData(resData)
        }).catch((error)=>{
            console.log(error);
        })
      }else{
        apiFunc.cartListGuest(guestid).then((res)=>{
          const resData=res.data.data != undefined ?res.data.data:{
            cart:[],
            vendor:[]
          };
          setCartData(resData)
        }).catch((error)=>{
            console.log(error);
        })
      }
    }else{
      const resData={
        cart:[],
        vendor:[]
      }
      setCartData(resData)
    }
  };

Router.events.on('routeChangeStart', () => {
    document.body.className = 'loading_page';
});
/* Router.events.on('routeChangeComplete', () => {
    document.body.className = document.body.className.replace("loading_page","");
    
}); */
  return (
        <Layout 
        logout={()=>logOut()} 
        auth={isAuth} 
        getCart={()=>cartListShow()} 
        cartData={cartData}>
            <Head>
                <link rel="stylesheet" href="/favicon.ico"/>
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

import Link from 'next/link';
// import { useRouter } from "next/dist/client/router"
// import { useEffect, useState } from "react"

export default function NoFound(props){
    /* const [count, setCount]=useState(5);
    const router = useRouter()
    useEffect(()=>{
        let counter = 5;
       let setIntr = setInterval(()=>{
           counter = counter - 1;
           if(counter == 0){
            clearInterval(setIntr);
            router.push({
                pathname: '/',
            }) 
           }
           setCount(counter);
       },1000);
       if(props.hideId){
        clearInterval(setIntr);
       }
    },[props]) */
    return(
        <>
            <div className="notFoundWrapper">
                <div className="container">
                    <div className="nothinfounxo">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="notifmagebox">
                                <img src="/assets/images/some-thing-wrong.png" className="img-fluid" alt=""/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="nosthingContnet">
                                <h2>Oops...!</h2>
                                <h4>Something Went Wrong. <Link href="/">Click Here...</Link></h4>
                                {/* <div className="counterRedict">{count}</div> */}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
        </>
    )
}
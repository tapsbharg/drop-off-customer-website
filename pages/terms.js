import { useEffect, useState } from "react";
import apiFunc from "../services/api";

export default function PolicyTermsPage(props) {
const[privacyData,setPrivacyData]=useState([]);
function getTerms(){
    apiFunc.getTerms().then((res)=>{
      setPrivacyData(res.data.data);
    }).catch((error)=>{
        console.log(error);
    })
}
useEffect(()=>{
  getTerms();
},[])
console.log(privacyData)
    return (
      <>
      <div className="pageInsieWRp">
        <section className="term_cond_outer">
            <div className="container">
                <div className="term_cond py-5  ">
                {privacyData.map((data,index)=>(
                    <div key={index}>
                      <h5>{(data.heading).toUpperCase()} </h5>
                      <div dangerouslySetInnerHTML={{__html: data.section}} />
                    </div>
                  ))}
                </div>
            </div>
        </section>
        </div>
      </>
    )
  }
  
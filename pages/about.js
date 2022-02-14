import { useEffect, useState } from "react";
import apiFunc from "../services/api";

export default function AboutPage(props) {
    const [aboutData, setAboutData] = useState([]);
    const getFaqslist = () => {
        apiFunc.getAbout().then((res)=>{
            setAboutData(res.data.data);
        })
    }
    useEffect(()=>{
        getFaqslist();
    },[])
    return (
        <>
        <div className="pageInsieWRp">
        <section className="about_outer_page">
           <div className="container"> 
                   
                       {
                            aboutData.map((data,key)=>(
                                <div key={key}>
                                    <h5 className="text-capitalize"> {data.heading} </h5>
                                    <div className="about_img   mb-4" data-aos="zoom-in"  data-aos-duration="1500" data-aos-delay="100">
                                        <img src="assets/images/about01.jpg" alt=""/>
                                    </div>
                                    <div className="aboutconstet" dangerouslySetInnerHTML={{__html: data.section}} ></div>
                                </div>
                            ))
                        }
                       
                   
               
           </div>
       </section>
       </div>
     </>
    )
  }
  
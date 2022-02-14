import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import apiFunc from "../services/api";

export default function FaqsPage(props) {
    const [faqsData, setFaqsData] = useState([]);
    const getFaqslist = () => {
        apiFunc.getFaqs().then((res)=>{
            setFaqsData(res.data.data);
        })
    }
    useEffect(()=>{
        getFaqslist();
    },[])
    return (
      <>
      <div className="pageInsieWRp">
      <section className="faqs_outer py-5">
     <div className="container"> 
            <h5> FAQ's </h5>
            <Accordion defaultActiveKey={0}>
                
                {
                    faqsData.map((data,key)=>(
                        <Accordion.Item eventKey={key} key={key}>
                            <Accordion.Header>
                                {data.question} {key}
                            </Accordion.Header>
                            <Accordion.Body>
                                <div dangerouslySetInnerHTML={{__html: data.answer}} />
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
                </Accordion>
        
            </div>
        </section>
      </div>
      </>
    )
  }
  
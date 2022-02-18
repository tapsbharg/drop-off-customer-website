import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import Cookies from "universal-cookie";
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
    /* let faqData = apiFunc.getFaqs();
    async function laodsdata(){
        const [data] = await Promise.all([
            faqData
        ]);
        let faqssss = JSON.stringify(data.data);
        console.log(faqssss)
    }
    laodsdata() */
    // let faqData = axios({
    //     method: 'GET',
    //     url: 'https://jsonplaceholder.typicode.com/posts'
    // });
    // async function loadata(){
    //     const [data] = await Promise.all([
    //         faqData
    //     ]);
    //     let faqssss = JSON.stringify(data);
    //     console.log(faqssss)
    // }
    // loadata()
   /*  useEffect(()=>{
        setFaqsData(props.faqs)
    },[props.faqs]); */
    return (
      <>
      {/* {props.faqs.map((data,key)=>(
          <div key={key}>
            <div className="row">
                <div className="col-6">sr</div>
                <div className="col-6">{data.id}</div>
            </div>
            <div className="row">
                <div className="col-6">Title</div>
                <div className="col-6">{data.title}</div>
            </div>
            <div className="row">
                <div className="col-6">Description</div>
                <div className="col-6">{data.body}</div>
            </div>
          </div>
      ))} */}
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
/*   export async function getServerSideProps(ctx) {
    const cookies = new Cookies(ctx.req?.headers?.cookie);
    const token = cookies.get('token');
    let faqData = apiFunc.getFaqs(token)
    const [res] = await Promise.all([
        faqData
    ]);
    return { props: { faqs:res.data.data } }
  } */
/*   export async function getServerSideProps(ctx) {
    let faqData = axios({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts'
    });
    const [res] = await Promise.all([
        faqData
    ]);
    return { props: { faqs:res.data } }
  } */
/*   export async function getServerSideProps(ctx) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await res.json()
    // Pass data to the page via props
    return { props: { faqs:data } }
  }
   */
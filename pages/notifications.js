import Link from 'next/link';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import AuthLayout from '../components/authLayout';
import apiFunc from '../services/api';

export default function Notifiactions(props) {
    const [notificationList, setNotification] = useState(new Array());
    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
      };
      useEffect(() => {
        if (props.auth) {
          getNotification();
        }
      }, [props.auth]);
    const getNotification = () => {
        let notiData = {
           page : 1,
           perPage : 20
       }
        apiFunc.notification(notiData).then((res)=>{
         setNotification(res.data.result)
        }).catch((error) => {
         console.log(error);
       });
      }
    return (
      <>
      <AuthLayout props={props}>
         <section className="notification_outer py-5">
            <div className="container"> 
                <h5> Notification </h5>  
                {notificationList.map((data,key)=>(
                <div className="notification_box  bg-light02 p-4 mb-3" key={key}>
                    <div className="d-flex flex-wrap justify-content-between notifyHead">
                        <div className="notifyHeadinNamge">
                            <h4>{data.title}</h4>
                        </div>
                        <div className="notifyTimer">
                            <Moment calendar={calendarStrings}>
                                {data.createdAt}
                            </Moment>
                        </div>
                    </div>
                    <div className="notifyDescrp"><p>{data.description}</p></div>
                </div>
                ))}
            </div>
        </section>
        </AuthLayout>
      </>
    )
  }
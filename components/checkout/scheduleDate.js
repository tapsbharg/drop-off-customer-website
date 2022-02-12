import React, { useContext, useState } from 'react'
import DatePicker from "react-datepicker";
import { UserContext } from '../context/locationContext';

const ScheduleDate = () => {
    const context = useContext(UserContext);
  return (
    <>
        <div className="summer_box03 bg-light02 rounded-3 p-3 mb-3">
                                    
                                    <ul className="d-flex justify-content-between">
                                        <li> Schedule Order </li>
                                        <li> 
                                            <DatePicker 
                                            dateFormat="dd-MMM-yyyy"
                                            placeholder="Select Date & Time"
                                            selected={context.orderDate} 
                                            minDate={new Date().setDate(new Date().getDate() + 1)}
                                            maxDate={new Date().setDate(new Date().getDate() + 3)}
                                            onChange={date => {
                                                context.setOrderDate(date);
                                            }} className="form-control" />
                                        </li>
                                    </ul>
                                </div>
    </>
  )
}

export default ScheduleDate
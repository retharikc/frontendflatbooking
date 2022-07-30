import React , {useContext, useEffect, useState} from 'react'

export default function EditFlatBookingForm(props){
     const [flatbooking,setFlatBooking] =useState(props.currentFlatBooking)

     
console.log(JSON.stringify(flatbooking)+"from edit form")
    const handleInputChange = (event)=>{
        const {name,value} =event.target;
       
        setFlatBooking({...flatbooking,[name]:value});
     }
console.log(JSON.stringify(flatbooking)+"from handle form")
     


     const submitHandler=(event)=>{event.preventDefault();
       props.updateFlatBooking(flatbooking.bookingNo,flatbooking);
       
    }
    console.log(JSON.stringify(flatbooking)+"from submit form")

   return (
        <form onSubmit={submitHandler}>
         
            <label>BookingNo</label>
            <h1>{props.currentFlatBooking.bookingNo}</h1>
            
            <label>BookingToDate</label>
                 <input 
                  type='date'
                  name='bookingToDate'
                  value={flatbooking.bookingToDate}
                  onChange={handleInputChange}/>

               
                  <br/>

                   <label>BookingFromDate</label>
                    <input 
                    type='date'
                    name='bookingFromDate'
                    value={flatbooking.bookingFromDate}
                    onChange={handleInputChange}/>
                    <br></br> 
 


        <button>Update FlatBooking</button>
        <button onClick={()=>props.setEditing(false)} 
        className="button muted-button">Cancel</button></form>
     )
}
import React,{useEffect, useState} from 'react'

import { addFlatBooking } from '../actions/flatbookings';
export default function AddFlatBookingForm(props){

   
const initialFormState = {
   
   
      bookingFromDate: "2022-07-28",
     
      bookingToDate: "2022-07-28",
      flat: {
        flatId: 0
      },
      tenant: {
        
        tenant_id: 0
        
      }
    }

const initialFlatFormState={
   flatId: 0,
   flataddress_id: 0
}

const[flat,setFlat]=useState(initialFlatFormState);
const handleFlatIdInputChange=(event)=>{
   const {name,value}=event.target;
   setFlat({...flat,[name]:value});
  setFlatBooking({...flatbooking,...flat});
}

const initialTenantFormState={
   tenant_id: 0
}

const[tenant,setTenant]=useState(initialTenantFormState);
const handleTenantIdInputChange=(event)=>{
   const {name,value}=event.target;
   setTenant({...tenant,[name]:value});
  setFlatBooking({...flatbooking,...tenant});
}

const [flatbooking,setFlatBooking]=useState(initialFormState);

const handleInputChange = (event)=>{
   const {name,value} =event.target;
   console.log("check");
  console.log(event.target.name+"   "+event.target.value);
   setFlatBooking({...flatbooking,[name]:value});
   setFlatBooking({...flatbooking,...flatbooking});
   console.log(JSON.stringify(flatbooking))
}

useEffect(()=>{
   setFlatBooking({...flatbooking,flat})},[flat])

useEffect(()=>{
   setFlatBooking({...flatbooking,tenant})},[tenant])

const submitHandler=(event)=>{event.preventDefault();

   var today = new Date();
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0'); 
   var yyyy = today.getFullYear();
   today = yyyy + '-' + mm + '-' + dd;
   flatbooking.bookingFromDate=today
   flatbooking.bookingToDate=today
   console.log(today)

 //console.log(flatbooking+'from addflatbookingform')
   console.log(JSON.stringify(flatbooking))
   props.addFlatBooking(flatbooking);
   
   setFlatBooking(initialFormState);
}
return (
   <form onSubmit={submitHandler}>

<label>BookingNo</label>
<input 
type='number'
name='BookingNo'
value={flatbooking.bookingNo}
onChange={handleInputChange}/>
<br/>

 {/* <label>BookingFromDate</label>
<input 
type='date-local'
name='bookingfromdate'
value={flatbooking.bookingFromDate}
onChange={handleInputChange}/>
<br/> 


<label>BookingToDate</label>
<input 
type='date-local'
name='bookingtodate'
value={flatbooking.bookingToDate}
onChange={handleInputChange}/>
<br></br> */}  
 
<label>FlatId</label>
<input 
type='number'
name='flatId'
value={flat.flatId}
onChange={handleFlatIdInputChange}/>
<br></br>

{/* <label>FlatAddress_Id</label>
<input 
type='number'
name='flataddress_id'
value={flat.flataddress_id}
onChange={handleFlatIdInputChange}/>
<br></br> */}

<label>Tenant_Id</label>
<input 
type='number'
name='tenant_id'
value={tenant.tenant_id}
onChange={handleTenantIdInputChange}/>
<br></br>

<button>Add FlatBooking</button>

</form>
)


}
import React ,{useState,useEffect}from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'

import {retrieveFlatBookings,}from '../actions/flatbookings'
 

export default function FlatBookingList(props){
  //we have dispatched the actioncreator retrieveProducts
  //in the component loading time once only
    const dispatch=useDispatch();
    
    
    const [currentFlatBooking,setCurrentFlatBooking]=useState({});
    const [currentIndex,setCurrentIndex]=useState(-1);
    //this products array will hold the state of products 
    const flatbookings = useSelector((state)=>state.flatbookings);
     

    useEffect(()=>{
        dispatch(retrieveFlatBookings());
      },[]);

    
    const refreshData=()=>{
        setCurrentFlatBooking(null);
        setCurrentIndex(-1);
    }
 

    const setActiveFlatBooking = (flatbooking,index)=>{
        setCurrentFlatBooking(flatbooking);
        setCurrentIndex(index);

    }

return(
<table>
    <thead>
        <tr>
        <th>BookingNo</th>
        <th>BookingFromDate</th>
        <th>BookingToDate</th>
        
        </tr>
    </thead>
    <tbody>


  {flatbookings?.length > 0 ? (
    flatbookings.map((flatbooking)=>(
    <tr key={flatbooking.bookingNo}>
    <td>{flatbooking.bookingNo}</td>
    <td>{flatbooking.bookingFromDate}</td>
    <td>{flatbooking.bookingToDate}</td>
    

               
            <td><button 
         onClick={()=>{props.editFlatBooking(flatbooking)}}
        className="button muted-button">Edit</button></td>
        <td><button 
        onClick={()=>props.deleteFlatBooking(flatbooking.bookingNo)}
        className="button muted-button">Delete</button></td>
        
     </tr>))):(
        <tr>
            <td colSpan={6}>No FlatBookings</td>
        </tr>
     )}

    </tbody>
</table>

)

     }



import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import FlatBookingList from './Components/FlatBookingList';
import { useState,useEffect } from 'react';
import apiClient from './http-common'
import {BrowserRouter, Routes ,Route ,  Link ,useNavigate } from 'react-router-dom'
import EditFlatBookingForm from './Components/EditFlatBookingForm';
import AddFlatBookingForm from './Components/AddFlatBookingForm';

function App() {
  
const [flatbookings,setFlatBookings]=useState([]);

    //when App component gets loaded , a call to api will render the products list as a response
    //which we are setting to the products
    useEffect(()=>{apiClient.get('/admin_user/getAllFlatBooking').then((response)=>{
      setFlatBookings(response.data);
    })},[])

    
const [editing,setEditing]=useState(false);

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
  



const [currentFlatBooking,setCurrentFlatBooking] 
     =useState(initialFormState);

   //child component --AddProductForm child -App is parent ,product object in the form of input fields form 
   //brand price name on submission  
async function addFlatBooking(flatbooking){
  try{
  const response=await apiClient.post('/admin/addFlatBooking',flatbooking);
    setFlatBookings([...flatbookings,response.data]);
    console.log(flatbookings);
    
  }catch(err){
    //console.log(err)
  }
  
}



async function deleteFlatBooking(bookingNo){
  await apiClient.delete(`/admin_user/deleteFlatBooking/${bookingNo}`);
    setFlatBookings(flatbookings.filter((flatbooking)=>flatbooking.bookingNo !== bookingNo));
  }
  
  const editFlatBooking=(flatbooking)=>{

    setEditing(true);
      setCurrentFlatBooking
      ({bookingNo:flatbooking.bookingNo,bookingFromDate:flatbooking.bookingFromDate,
        bookingToDate:flatbooking.bookingToDate})
     
  }
  
  const updateFlatBooking = (bookingNo,updatedFlatBooking)=>{
  
    setEditing(false);
    apiClient.put(`/admin/updateFlatBooking/${bookingNo}`,updatedFlatBooking).then((response)=>
    {
  
      console.log('flatbooking updated');
      setFlatBookings(flatbookings.map((flatbooking)=>
    (flatbooking.bookingNo === bookingNo ? updatedFlatBooking : flatbooking)));

    })
    
  }
  
  
  
  
  return (<div>
    <div className='container'>
    <h1>FlatBooking Crud app with hooks</h1>
    <div className='flex-row'>
      <div className='flex-large'>
        {editing ? (
        <div>
          <h2>Edit FlatBooking Form </h2>
          <EditFlatBookingForm
           setEditing={setEditing}
           currentFlatBooking={currentFlatBooking}
           updateFlatBooking={updateFlatBooking}
           />
           </div>):(

    <BrowserRouter>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/flatbookings" className="navbar-brand">
          React App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/flatbookings"} className="nav-link">
              FlatBookings
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addFlatBooking"} className="nav-link">
              Add FlatBooking
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
        <Route path='/' element={<FlatBookingList 
    flatbookingData={flatbookings} 
         editFlatBooking={editFlatBooking}
         deleteFlatBooking={deleteFlatBooking} />} ></Route>
          <Route exact path="addFlatBooking" element={<AddFlatBookingForm addFlatBooking={addFlatBooking}/>} />
         
         <Route path='/flatbookings' element={<FlatBookingList 
    flatbookingData={flatbookings} 
         editFlatBooking={editFlatBooking}
         deleteFlatBooking={deleteFlatBooking} />}>

         </Route>
         <Route path="/flatBookings/:bookingNo" element={<EditFlatBookingForm /> }></Route>
        </Routes>
      </div>
    
    </BrowserRouter>
    )}</div></div></div></div>
)}

export default App;


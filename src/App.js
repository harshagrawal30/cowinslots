//import  {ChatEngine} from 'react-chat-engine';


import './App.css';
import {useState,useEffect} from 'react'
//import Fetchdata from './fetchdata';
import Searchbypin from './components/searchbypin';
import Searchbydistrict from './components/searchbydistrict';
import Register from './components/register';
//import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {useCookies} from 'react-cookie'
const App = ()=> {
    const[method,setMethod]=useState('')
    const[date,setDate]=useState(null)
    const[registerr,setRegisterr]=useState(null)
    const [token,setToken,removetoken]=useCookies(['mytoken'])
    
   const logout=()=>
   {
 
   
     removetoken(['mytoken'])
   }
    useEffect(()=>{
      
      var today=new Date(),
       dat=  today.getDate()+ '-' + ((today.getMonth() + 1)<10?('0'+(today.getMonth() + 1)):(today.getMonth() + 1)) + '-' +today.getFullYear();
        setDate(dat);
       //  console.log(date);
        },[] )
    return(
       <div  style={{background:"",height:"100vh"}}>
         <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
        
       <br/>
       <div className="container">
         <div className="container">
       {token.mytoken?null: <div className="col"> <button onClick={()=>setRegisterr(1)} className="btn btn-success" style={{float:"right"}}>  Register/Login </button></div>}
    {token.mytoken ?  < div className="col"> <button onClick={()=>logout()} className="btn btn-danger" style={{float:"right"}}> Logout </button></div>:null}
      <br/> <h3  className="col" style={{color:"darkred"}}>Get Slot details using</h3>
         <div className="row">

        <div className="col">  <button onClick={()=>(setMethod("district"), setRegisterr(null))}className="btn btn-primary" style={{}}>District</button></div>
       <div className="col " style={{marginLeft:"-40%"}}><button onClick={()=>(setMethod("pin"),setRegisterr(null))}       className="btn btn-info"  style={{}}>Pin</button></div>
        
          </div>
      
          </div>
       </div>
  
      
      
          
          {registerr?<Register registerr={registerr}/>:null}
       { registerr?null:method==="pin"? <Searchbypin date={date}/>:null}
       {registerr?null:method==="district"? <Searchbydistrict date={date}/>:null}
       </div>
        
    );

}

export default App;
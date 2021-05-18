//import  {ChatEngine} from 'react-chat-engine';
import './App.css';
import {useState,useEffect} from 'react'
import Fetchdata from './fetchdata';
import Searchbypin from './components/searchbypin';
import Searchbydistrict from './components/searchbydistrict';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const App = ()=> {
    const[method,setMethod]=useState('')
    const[date,setDate]=useState(null)

    
   
    useEffect(()=>{
      
      var today=new Date(),
       dat=  today.getDate()+ '-' + ((today.getMonth() + 1)<10?('0'+(today.getMonth() + 1)):(today.getMonth() + 1)) + '-' +today.getFullYear();
        setDate(dat);
         console.log(date);
        },[] )
    return(
       <div>
        <h3>Get Slot details using</h3>
       <div className="row">
         <div className="col-1" >  <h3 onClick={()=>setMethod("district")}>District</h3></div>
          <div className="col-1"> <h3 onClick={()=>setMethod("pin")}>Pin</h3></div>
       </div>
  
 
      
     
       {method==="pin"? <Searchbypin date={date}/>:null}
       {method==="district"? <Searchbydistrict date={date}/>:null}
       </div>
        
    );

}

export default App;
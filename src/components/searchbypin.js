
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'
function Searchbypin(props) {

    const[pin,setPin]=useState('')
    const[pindata,setPindata]=useState([])
    const[date]=useState(props.date)

    
    useEffect(()=>{
      if(pin.length===6)
       { axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
        .then(resp=>{
         //   console.log(resp.data)
            
            setPindata(resp.data.centers)
          })
       // .catch(error=> console.log(error))
     } },[pin] )
         
    
         const showempty=()=>{return (<table >
            <tr>
              <th>Center</th>
              
              <th>Age+</th>
              <th>Availability</th>
            </tr>
            <tr>
                <td>NA</td>
                <td>NA</td>
                <td>NA</td>
             </tr></table>)}
          
    return (
        
        
        <div>
               <br/>
            <input className="input-group" type='text' value={pin} onChange={e=>setPin(e.target.value)} style={{width:"30%",marginLeft:"25%"}} placeholder="Enter Your PIN here"></input>
        <br/>
        {pin.length===6? <h3 style={{color:"grey"}}> Below are details of available slots at {pin} within 7 days</h3>:null}
    
            <br/>
                
          {pin.length===6?pindata.length!==0?pindata.map(pindatas =>{
               return (
                   
               <div key={pindatas.center_id}><b style={{}}>{pindatas.name }<t/>{pindatas.fee_type==="Free"? 
               <b style={{color:"blue"}}>{pindatas.fee_type}</b>:<b style={{color:"red"}}>{pindatas.fee_type}</b>}</b>
               
                {pindatas.sessions.map(pinsession=>{
                    return(
                     <div key={pinsession.session_id}> <b>{ pinsession.date}</b> {" "+pinsession.vaccine+" Available Doses "}{pinsession.available_capacity===0?<b style={{background:"lightyellow",color:"red",borderRadius:"10%",border:"10%"}}>
                          Booked</b>:<b style={{background:"lightyellow",color:"green",borderRadius:"10%",border:"10%"}}>{pinsession.available_capacity}</b>}
                          <b>{"   age-limit: "}</b><b style={{color:"brown"}}>{pinsession.min_age_limit}</b>{" (dose1= "+pinsession.available_capacity_dose1+" dose2= "+pinsession.available_capacity_dose2+")"} <br/> </div>
                    )
                  
                })}
               <br/>  <br/></div>)}
           ):"NO Slots are available ":null}
          
         
            
          
         
        </div>
    )
}

export default Searchbypin

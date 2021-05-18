
import React,{useEffect,useState} from 'react'
import axios from 'axios'

function Searchbypin(props) {

    const[pin,setPin]=useState('')
    const[pindata,setPindata]=useState([])
    const[date]=useState(props.date)

    
    useEffect(()=>{
      if(pin.length===6)
       { axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`)
        .then(resp=>{
            console.log(resp.data)
            
            setPindata(resp.data.sessions)
          })
         .catch(error=> console.log(error))
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
            <input type='text' value={pin} onChange={e=>setPin(e.target.value)}></input>
        
           
            
             
                  Center
          
                  Age+
                  Availability
                
          {pindata?pindata.map(pindatas =>{
               return (
               <div key={pindatas.center_id}> {pindatas.name } {pindatas.min_age_limit}
                {pindatas.available_capacity}</div>)}
           ):null}
          
         
            
          
         
        </div>
    )
}

export default Searchbypin

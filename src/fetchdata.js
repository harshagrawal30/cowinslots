

import React,{useEffect,useState} from 'react'
import axios from 'axios'

function Fetchdata(props) {
    const[indiastates,setArticle]=useState([])
    const[id,setId]=useState(null)
    const[districts,setDistricts]=useState([])
    const[pin,setPin]=useState(null)
    useEffect(()=>{
  axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
  .then(resp=>{
      console.log(resp.data)
      console.log(resp.data.states)
      setArticle(resp.data.states)
    })
   .catch(error=> console.log(error))
    },[] )

   
    useEffect(()=>{
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`)
        .then(resp=>{
            console.log(resp.data)
          //  console.log(resp.data)
            setDistricts(resp.data.districts)
          })
         .catch(error=> console.log(error))
          },[id] )


          useEffect(()=>{
            axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=18-05-2021`)
            .then(resp=>{
                console.log(resp.data)
                console.log(resp.data)
                setPin(resp.data)
              })
             .catch(error=> console.log(error))
              },[] )
          if(props.method==="district")    
    {return (
        <div>
           <input type='text' value={id} onChange={e=>setId(e.target.value)}></input>
        
           
          {districts.map(district =>{
               return (<div key={district.district_id}>{district.district_name}</div>)}
           )}
        </div>
    )
    }
    if(props.method==="pin")
    {
      return (
        <div>
            <input type='text' value={id} onChange={e=>setPin(e.target.value)}></input>
        
           
           {indiastates.map(state =>{
               return (<div key={state.state_id}>{state.state_name}</div>)}
           )}
          
         
        </div>
    )
    }
              
}

export default Fetchdata
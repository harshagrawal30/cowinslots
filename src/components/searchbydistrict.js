import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React,{useEffect,useState} from 'react'
import axios from 'axios'
function Searchbydistrict() {
    const[indiastates,setArticle]=useState([])
    const[id,setId]=useState(null)
    const[statename,setStatename]=useState([])
    const[districts,setDistricts]=useState([])
     useEffect(async ()=>{
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
        .then(resp=>{
            console.log(resp.data)
            console.log(resp.data.states)
            setArticle(resp.data.states)
          
          })
          .catch(error=> console.log(error))
          },[] )
      
        

         
        const defaultOption =  statename[0];
     
    useEffect(()=>{
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`)
        .then(resp=>{
            console.log(resp.data)
          //  console.log(resp.data)
            setDistricts(resp.data.districts)
          })
         .catch(error=> console.log(error))
          },[id] )
    return (
        
        <div>
      
      <Dropdown options={statename}  value={defaultOption} placeholder="Select an option" />;
           <input type='text' value={id} onChange={e=>setId(e.target.value)}></input>
        
           
           
          
          {districts.map(district =>{
               return (<div key={district.district_id}>{district.district_name}</div>)}
           )}
        </div>
    )
}

export default Searchbydistrict

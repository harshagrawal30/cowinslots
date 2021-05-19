import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function Searchbydistrict(props) {
  const [indiastates, setArticle] = useState([]);
  //const [id, setId] = useState(null);
  const [statename, setStatename] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [districtinfo,setDistrictinfo]=useState(null)
  useEffect(async () => {
    axios
      .get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
      .then((resp) => {
        console.log(resp.data);
        console.log(resp.data.states);
        setArticle(resp.data.states);
      })
      .catch((error) => console.log(error));
  }, []);

   var id=null;
   var districtid=null;
   var districtnme="";
   const  fetchdistrict = (statename) => {
    
      indiastates.map((state) => {
        if (state.state_name === statename) {
           id=state.state_id;
        }
      });
      console.log(id+statename);
       axios
      .get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`)
      .then((resp) => {
        console.log(resp.data);
        console.log(id+"djgldkjg");
        setDistricts(resp.data.districts);
      })
      .catch((error) => console.log(error));
  }

  const districtdetail=(districtname)=>{
    districtnme=districtname;
    districts.map((district)=>{
      if(district.district_name===districtname)
      {districtid=district.district_id}
      
      
    })
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtid}&date=${props.date}`)
      .then((resp)=>{
        console.log(resp.data);
        setDistrictinfo(resp.data.centers)
      })
  }

  return (
    <div>
      <Dropdown
        options={ indiastates.map((state) => {
          
          return <div key={state.state_id}>{state.state_name}</div>;
        })}
        onChange={(e) => fetchdistrict(e.value.props.children)}
        value={null}
        placeholder="Select State"
      />
      <br/><br/>
     <Dropdown
        options={ districts.map((district) => {
          
          return <div key={district.district_id}>{district.district_name}</div>;
        })}
        onChange={(e) => districtdetail(e.value.props.children)}
        value={null}
        placeholder="Select District"
      />
      
     
      {districtinfo? <h3 style={{color:"grey"}}> Below are details of available slots at {districtinfo[0].district_name} within 7 days</h3>:null}
    
    <br/>
        
  {districtinfo?districtinfo.map(pindatas =>{
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
   ):null}
  
    </div>
  );
}

export default Searchbydistrict;
//<input
  //      type="text"
  //      value={id}
  //     // onChange={(e) => setId(e.target.value)}
  //    ></input>
  //    {districts.map((district) => {
  //      return <div key={district.district_id}>{district.district_name}</div>;
  //    })}
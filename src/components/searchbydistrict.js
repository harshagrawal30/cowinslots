import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function Searchbydistrict() {
  const [indiastates, setArticle] = useState([]);
  const [id, setId] = useState(null);
  const [statename, setStatename] = useState(null);
  const [districts, setDistricts] = useState([]);
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

  const defaultOption = statename;
  var stateid = null;
   const fetchdistrict = async(statename) => {
    
      indiastates.map((state) => {
        if (state.state_name === statename) {
           setId(state.state_id);
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

  return (
    <div>
      <Dropdown
        options={indiastates.map((state) => {
          stateid = state.state_id;
          return <div key={state.state_id}>{state.state_name}</div>;
        })}
        onChange={(e) => fetchdistrict(e.value.props.children)}
        value={defaultOption}
        placeholder="Select an option"
      />
      ;
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
      ></input>
      {districts.map((district) => {
        return <div key={district.district_id}>{district.district_name}</div>;
      })}
    </div>
  );
}

export default Searchbydistrict;

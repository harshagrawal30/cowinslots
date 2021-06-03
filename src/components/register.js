import { sha256 } from "js-sha256";
import React, { useState } from "react";
import APIservice from "../APIservice";
import { useCookies } from "react-cookie";
function Register(props) {
  const [mobile, setMobile] = useState([]);
  const [txnId, setTransid] = useState([]);
  const [eror, setError] = useState(props.eror);
  const [eror2, setError2] = useState(props.eror2);
  const [otp, setOtp] = useState("");
  const [token, setToken, removetoken] = useCookies(["mytoken"]);
  // const [sha,setSha]=useState([])
  const recieveotp = () => {
    APIservice.RegisterUser({ mobile })
      .then((resp) => {
        setTransid(resp.txnId);
      }, setError(null))
      .catch((error) => {
        setError("Can't get Otp now. Try after some time");
      });
  };
  var sha;
  const submitotp = () => {
    sha = sha256(`${otp}`);
    // console.log(sha)
    APIservice.VerifyUser({ otp: sha, txnId: txnId }).then((resp) => {
      resp.token === "undefined" || resp.error
        ? setError2("Can't Login.Invalid Credentials.")
        : setToken("mytoken", resp.token);
    });
  };

  return (
    <div>
      {token.mytoken
        ? `You are successfully logged in. We are sorry as no functionality is allowed forward to it.Go check out slots availability using pin or district wise.THANK YOU!`
        : eror2}
      <br />
      {token.mytoken ? null : txnId.length === 0 ? (
        <h5>Enter your mobile number to recieve OTP</h5>
      ) : null}
      {token.mytoken ? null : txnId.length === 0 ? (
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter Your mobile no. here"
        ></input>
      ) : (
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter Your otp here"
        ></input>
      )}
      {token.mytoken ? null : txnId.length === 0 ? (
        mobile.length === 10 ? (
          <button type="submit" onClick={() => recieveotp()}>
            Get OTP
          </button>
        ) : null
      ) : otp.length === 6 ? (
        <button type="submit" onClick={() => submitotp()}>
          Submit OTP
        </button>
      ) : null}
      <br /> {eror}
    </div>
  );
}

export default Register;
//https://selfregistration.cowin.gov.in/dashboard

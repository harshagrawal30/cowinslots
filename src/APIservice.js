export default class APIService {
  static RegisterUser(body) {
    return fetch(`https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static VerifyUser(body) {
    return fetch(`https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
}

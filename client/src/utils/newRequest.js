import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://kisanmart-dqd7.onrender.com",
  //baseURL: "https://api-h2x3.onrender.com/api/",
//  baseURL: "https://agrosync-prototype.vercel.app/api/",
  withCredentials: true,
});

export default newRequest;

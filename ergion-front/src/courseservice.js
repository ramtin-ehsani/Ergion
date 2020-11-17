import axios from "axios";
import http from "./httpservice";
import config from "./config.json"
export const getcourse=(courseid)=>
{
return axios.get(`${config.apicourse}/${courseid}`);


};
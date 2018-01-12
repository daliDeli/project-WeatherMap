
import axios from "axios";
import {BASE_URL} from "../constants";


export default class FetchService{
    
    get(city,successHandler,errorHandler){
        axios({
            method:"get",
            url:`${BASE_URL}${city}`,
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then( response => successHandler(response))
        .catch( error => errorHandler(error))
    }
}
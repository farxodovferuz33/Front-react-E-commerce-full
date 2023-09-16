import axios from 'axios'


export default function Axios({url, method, data}) {
   
        return axios({
                baseURL:"http://localhost:3020",
                url,
                method,
                data
        })
        
  
    
}
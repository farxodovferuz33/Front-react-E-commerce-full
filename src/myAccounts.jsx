import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

export default function MyAcc() {
    const token = localStorage.getItem("token")

    const [arr, setArr] = useState([])

    const [inp, setInp] = useState("")

    let navigate = useNavigate()

    function getUserD() {
        axios({url:"http://localhost:3020/arrayUs/"+token, method:"get"}).then((res)=>{
            setArr(res.data)
         })
     }
 
     useEffect(()=>{
         getUserD()
     },[])

     console.log(arr);


     function chan(token) {
        
        let data = {
            name:arr.name,
            age:arr.age,
            login:arr.login,
            password:inp,
        }
        axios({url:"http://localhost:3020/arrayUs/"+token, method:"put", data}).then((res)=>{
            getUserD()
         })
     }


     function del() {
        axios({url:"http://localhost:3020/arrayUs/"+token, method:"delete"}).then((res)=>{
            getUserD()
         })
         localStorage.clear()
         navigate("/")
         toast.error("Account is deleted")
     }


    return(
        <div className='container'>



            <div className="container mx-5">
                <Link to={"/"}>
                    <button className="btn btn-outline-warning mx-5 my-5">Back to home</button>
                </Link>

                <Link to={-1}>
                    <button className="btn btn-outline-secondary my-3">Back 1 page</button>
                </Link>
            </div>


            
                


            

            


            <h1 style={{color:"yellow"}}>My accounts settings</h1>
            <li>Name: {arr.name}</li>
            <li>Age: {arr.age}</li>
            <li>Login: {arr.login}</li>
            <li>Password: *******</li>

            <input onChange={(e)=>setInp(e.target.value)} className='form-control w-25 my-2' type="text" placeholder='change password...'/>
            <button  onClick={()=>chan(token)} className='btn btn-success'>Change password</button>
            <button onClick={del} className='btn btn-danger m-3'>Delete account</button>
        </div>
    )
}


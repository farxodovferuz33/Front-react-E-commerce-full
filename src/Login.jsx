import { useState } from "react"
import axios from 'axios'
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { toast, ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"


export default function Login({setId2}) {
    const [inp1, setInp1] = useState("")
    const [inp2, setInp2] = useState("")

    const [arr, setArr] = useState([])

    const navigate = useNavigate()

    function getUserD() {
       axios({url:"http://localhost:3020/arrayUs", method:"get"}).then((res)=>{
            setArr(res.data);
            console.log(arr);
        })
    }

    useEffect(()=>{
        getUserD()
    },[])



    function Save() {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].login===inp1 && arr[i].password===inp2) {
                navigate("/admin")
                setId2(arr[i].id)
                localStorage.setItem("token",arr[i].id)
                
                return
            }

        }
        toast.error("Error!!! check login or password")


    }


  





    return (
        <div className="container my-5">

            <div className="container mx-5">
                <Link to={"/"}>
                    <button className="btn btn-outline-warning mx-5 my-5">Back to home</button>
                </Link>

                <Link to={-1}>
                    <button className="btn btn-outline-secondary my-3">Back 1 page</button>
                </Link>
            </div>


            <h1 style={{textAlign:"center", color:"blue"}}>Log in to Admin page</h1>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <input value={inp1} onChange={(e)=>setInp1(e.target.value)} className="form-control w-25 my-3" type="text" placeholder="login"/>
                <input value={inp2} onChange={(e)=>setInp2(e.target.value)} className="form-control w-25" type="text" placeholder="password"/>

                <button onClick={Save} className="btn btn-info my-3">Log in</button>

                <Link style={{textAlign:"center"}} to={"/signup"}>
                    Do not have account? <br /> Click here to create
                </Link>

            </div>
            <ToastContainer/>
        </div>
    )
}
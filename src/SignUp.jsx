import { useForm } from "react-hook-form"
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom"



export default function SignUp() {
    const {register, handleSubmit, reset} = useForm()

    const navigate = useNavigate()

    function mySubmit(params) {
        if (params.name=="" || params.age=="" || params.login=="" || params.password=="") {
            toast.error("please fill the inputs")
            return
        }

        axios({url:"http://localhost:3020/arrayUs", method:'post', data:params}).then(res=>{})
        toast.success("YOU HAVE SUCCESSFULLY SIGNED UP")    

        navigate("/")

        
        console.log(params);
        reset()
    }


    return(
        <div className="container my-3">

            <div className="container mx-5">
                <Link to={"/"}>
                    <button className="btn btn-outline-warning mx-5 my-5">Back to home</button>
                </Link>

                <Link to={-1}>
                    <button className="btn btn-outline-secondary my-3">Back 1 page</button>
                </Link>
            </div>


            <h1 style={{textAlign:"center", color:"green"}}>Create an account</h1>
            <form onSubmit={handleSubmit(mySubmit)} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <input {...register("name")} className="form-control w-25 my-3" type="text" placeholder="Name"/>
                <input {...register("age")} className="form-control w-25 " type="text" placeholder="Age"/>
                <input {...register("login")} className="form-control w-25 my-3" type="text" placeholder="Login"/>
                <input  {...register("password")}className="form-control w-25 " type="text" placeholder="Password"/>
                <button className="btn btn-success my-3">Sign up</button>
                <Link style={{textAlign:"center"}} to={"/signin"}>
                    Do have account? <br /> Click here to login
                </Link>

            
            </form>
            <ToastContainer/>
        </div>
    )
}
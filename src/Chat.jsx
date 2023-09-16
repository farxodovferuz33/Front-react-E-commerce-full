import {Link, Outlet} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Chat() {

    const [arr, setArr] = useState([])
    const token = localStorage.getItem("token")


    function getUserD() {
        axios({url:"http://localhost:3020/arrayUs", method:"get"}).then((res)=>{
             setArr(res.data);
         })
     }
 
     useEffect(()=>{
         getUserD()
     },[])


     function setD(params) {
     }


    return (
        <div>

            <div style={{display:"flex", justifyContent:"space-around"}} className="container mx-5">
                <Link to={"/"}>
                    <button className="btn btn-outline-warning mx-5 my-5">Back to home</button>
                </Link>

                <Link to={-1}>
                    <button className="btn btn-outline-secondary mx-5 my-5">Back 1 page</button>
                </Link>

                <h3 className="my-5" style={{color:"blue"}}>Admin info:</h3>
            </div>


            <div>
                <div style={{display:"flex"}}>

                <div style={{width:"300px", border:"1px solid", height:"700px"}}>
                    {
                        arr.filter(item=>{if(item.id===token){item.name = "Saved messages"; return item}else{return item}} ).map((item, index)=>(
                            <div key={item.id}>
                                <Link to={"/adminchat/chatIn/"+item.id}>
                                    <button onClick={()=>setD(item.id)} className='btn btn-outline-success m-3' >{item.name}</button>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <div>
                <Outlet></Outlet>
                </div>
                 </div>
            </div>


            <div>

            </div>
        </div>
    )
}
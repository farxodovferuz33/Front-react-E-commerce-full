import { useNavigate, Link, useParams, json } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import img1 from '../src/shopping-cart.png'

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';


export default function Header() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const token = localStorage.getItem("token")
    const [savat, setSavat] = useState([])

    const [savaB, setSavaB] = useState(false)



    const [page, setPage] = useState(1)

    const [btnLen, setBtnLen] = useState("")

    const [search, setSearch] = useState("")

    const [modal, setModal] = useState(false)

    const [buy, setBuy] = useState({})

    const [modal2, setModal2] = useState(false)

    function saveToLocalStorage() {
        localStorage.setItem("savat", JSON.stringify(savat))
    }
    useEffect(()=>{
        let x = localStorage.getItem("savat")
        setSavat(x?JSON.parse(x):[])
    }, [])

    function SignUp() {
        navigate("/signup")
    }
    function signIn() {
        navigate("/signin")
    }
    function myac() {
        navigate("/myaccounts")
    }


    function getUserf() {
        axios({url:`http://localhost:3020/users?q=${search}&_page=`+page+"&_limit=3", method:"get"}).then((res)=>{
             setUsers(res.data);
             setBtnLen(Math.ceil(res.headers["x-total-count"]/3))
         }).catch(err=>{
            console.log(err);
         })

     }
 
     useEffect(()=>{
         getUserf()
     },[page, search])

     function logout() {
        localStorage.clear()
        setUsers([...users])
     }




     function addPro(params) {
        axios({url:"http://localhost:3020/users/"+params, method:"get"}).then((res)=>{
             savat.push(res.data);
            setSavat([...savat])
         })
         saveToLocalStorage()

     }


     function del(params) {
        savat.splice(params, 1)
        setSavat([...savat])
        
     }

   
     function SearchE(params) {
        setSearch(params)
        console.log(params);
        setPage(1)
     }


     function nextPage(params) {
        if (page<btnLen) {
            setPage(page+1)

        } else {
            setPage(1)
        }
     }


     function prevPage(params) {
        if (page<=1) {
            setPage(btnLen)
        } else {
            setPage(page-1)
        }
     }

     function buyNow(params) {
        setBuy(params)
        setModal(true)
     }

     function totalPrice() {
        let s = 0;
        for (let i = 0; i < savat.length; i++) {
            let a = savat[i].money
            s+=Number(a);       
        }
        return s
     }

     function orederAll(params) {
        setModal2(true)
     }

        return (<div>
            <header className="container my-2" style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}     >
                <h2 style={{color:"green"}}>LOGO 👨‍👩‍👧‍👦 🏠</h2>

                <input className="form-control w-25" onChange={(e)=>SearchE(e.target.value)} type="text" placeholder="Search...🔦"/>

                <div style={{display:"flex", gap:"10px", alignItems:"center"}}>



                    {token!=null?
                    <button onClick={logout} className="btn btn-danger">Log out</button>:
                    token==null?<div style={{display:"flex", gap:"10px"}}><button onClick={signIn} className="btn btn-info">Sign in🔑</button>
                    <button onClick={SignUp} className="btn btn-outline-success">Sign up🔑</button></div>:""}



                    <button onClick={myac} className="btn btn-warning">My accounts👨‍👩‍👧‍👦</button>
                    <Link to={"/admin"}>
                        <button className="btn btn-success">Admin panel👨</button>
                    </Link>

                    <Link className="btn btn-outline-secondary" to={"/adminchat"}>
                        Chat with admins
                    </Link>

                    <button onMouseMove={()=>setSavaB(true)} onMouseLeave={()=>setSavaB(false)} className="btn btn-outline-info d-flex">🛒<h6 style={{color:"red"}}>{savat.length}</h6></button>
                </div>

            </header>
        

            <div className="mainCard">
                    <div className="mainIncard">
                        {
                            users.map(item=>(
                                <div >
                                    <div onClick={()=>buyNow(item)} className="cardIn" key={item.id}>
                                        <img className="cardImg"  src={item.imgs} alt="404" />
                                        <div>
                                            <h4 style={{textAlign:"center"}}>{item.fname}</h4>
                                            <h5 style={{textAlign:"center"}}>${item.money}</h5>
                                        </div>                                       
                                    </div>
                                    <div>
                                            <button onClick={()=>addPro(item.id)} className="btn btn-info mx-3 my-2"><img width={20} src={img1} alt="404" /></button>
                                            <button onClick={()=>buyNow(item)} className="btn btn-outline-success mx-3">Buy now</button>
                                        </div>
                                </div>
                            ))
                        }
                    </div>
                </div>



                {savaB?<div onMouseMove={()=>setSavaB(true)} onMouseLeave={()=>setSavaB(false)} className="sava">
                    <div className="savatOver">
                        {
                            savat.map((item, index)=>(
                                <div className="savatIn">
                                    <h5>{item.fname}</h5>
                                    <h6>${item.money}</h6>
                                    <button onClick={()=>del(index)} className="btn btn-outline-danger">x</button>
                                </div>
                            ))
                        }
                        <button onClick={orederAll} className="btn btn-info">Total price: ${totalPrice()}</button>
                    </div>
                </div>:""}


                <div className="pageNit">
                    <button onClick={nextPage} className="btn btn-outline-info mx-1">NEXT➡️</button>
                    {
                        new Array(btnLen).fill("").map((item,index)=>{
                            return <button className={index+1===page?"btn btn-danger mx-1":"btn btn-outline-danger mx-1"} onClick={()=>setPage(index+1)}>{index+1}</button>
                        })
                    }
                    <button onClick={prevPage} className="btn btn-outline-info mx-1">⬅️PREV</button>
                </div>

                
                <Rodal height={760} width={700} visible={modal} onClose={()=>setModal(false)}>
                    <h1 style={{color:"green", textAlign:"center"}}>Buy product now</h1>
                    <br />
                    <p style={{fontSize:"22px", textAlign:"center"}} className="mx-3">More info about product 👇</p>
                    <br /> 
                    <ul style={{fontSize:"22px", listStyle:"none", fontFamily:"cursive", color:"blue"}}>
                        <li>Product name: {buy.fname}</li>
                        <li>Product description: {buy.lname}</li>
                        <li>Product added date: {buy.date}</li>
                        <li>Year of product: {buy.age}</li>
                        <li style={{fontSize:"32px", color:"red"}}>Price of product: {buy.money}</li>
                        <li>Admin info: {buy.e}</li>
                        <li>Admin info: {buy.admin}</li>
                    </ul>

                    <h1 style={{textAlign:"center"}}>Register now 👇</h1>
                    <hr />

                    <form >
                        <input className="form-control my-3" type="text" placeholder="Full name"/>
                        <input className="form-control my-3" type="text" placeholder="Phone number"/>
                        <input className="form-control my-3" type="text" placeholder="PROMOCODE"/>

                        <button className="btn btn-info">Send request</button>
                    </form>


                </Rodal>

                <button onClick={orederAll} style={{marginTop:"-150px", marginLeft:"300px"}} className="btn btn-success">Your total buy price : ${totalPrice()}</button>


                <Rodal height={700} width={500} visible={modal2} onClose={()=>setModal2(false)}>
                    <h1 style={{color:"green", textAlign:"center"}}>Buy all products</h1>

                    <div className="card my-5">
                    {
                        savat.map((item)=>(
                            <ol>
                                <li>{item.fname}</li>
                                <li>{item.lname}</li>
                                <li>{item.money}</li>
                                <li>{item.date}</li>
                                <li>{item.e}</li>
                            </ol>
                        ))
                    }
                    </div>

                    <button className="btn btn-info m-5">Buy all</button>
                </Rodal>



                
            <ToastContainer />
        </div>)
}
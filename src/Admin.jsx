import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {Link} from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import Rodal from "rodal";
import 'rodal/lib/rodal.css';
import { useForm } from "react-hook-form";
import CreatetableSelect from 'react-select/creatable'



export default function Admin({id2}) {

    const [arr, setArr] = useState([])

    const [modal, setModal] = useState(false)

    const [users, setUsers] = useState([])

    const {register, handleSubmit, reset} = useForm()

    const [edit, setEdit] = useState("")

    const [adm, setAdm] = useState({})

    const token = localStorage.getItem("token")

    const [imgs, setImgs] = useState("")




    let [e, setE] = useState("")



    
    const [select12, setSelect] = useState([])
    const [nVal, setNval] = useState("")

    useEffect(()=>{
        getSelect()
    },[])
 
    function getSelect() {
        axios({url:"http://localhost:3020/selects", method:"get"}).then(res=>{
            setSelect(res.data)
        })
    }




    useEffect(()=>{
        toast.dismiss()
        toast.info("success")
    },[])

    function CloseM() {
        setModal(false)
    }



    function getUserD() {
        axios({url:"http://localhost:3020/arrayUs/"+id2, method:"get"}).then((res)=>{
             setArr(res.data);
         })
     }
 
     useEffect(()=>{
         getUserD()
     })


     function add(){
        setModal(true)
     }


     function getUserAd() {
        axios({url:"http://localhost:3020/arrayUs/"+token, method:"get"}).then((res)=>{
             setAdm(res.data);
         })
     }
 
     useEffect(()=>{
         getUserAd()
     })





     function mySubmit(params) {
            params.data = new Date().toLocaleTimeString()
            params.Admin = adm.name
            params.cou = 0
            axios({url:`http://localhost:3020/users${edit!==""?`/${edit}`:""}`, method:edit===""?'post':"put", data:{...params, e, imgs}}).then(res=>{
            getUserf()
            setEdit("")
        })
        setModal(false)
        reset({
            
        })
     }



     function getUserf() {
        axios({url:"http://localhost:3020/users", method:"get"}).then((res)=>{
             setUsers(res.data);
         })
     }
 
     useEffect(()=>{
         getUserf()
     },[])


     function del(params) {
        axios({url:"http://localhost:3020/users/"+params, method:"delete"}).then(res=>{
            getUserf()
        })
     }


     function handleSelect(newValue, actionMeta) {
        console.log(newValue.value);
        setE(newValue.value)


        if (actionMeta==="select-option") {
            setNval(newValue)
        } else {
            axios({url:"http://localhost:3020/selects", method:"post", data:{name:newValue.value}}).then(res=>{
            getUserf()
        })
        }
     }


     function handleImg(params) {
        let file = params.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>{
            setImgs(reader.result)
        }
     }


     function editItem(params) {
        setModal(true)
        setEdit(params.id)

        reset(params)
     }


    return (
        <div className="container">

            

            <div style={{display:"flex", justifyContent:"space-around"}} className="container mx-5">
                <Link to={"/"}>
                    <button className="btn btn-outline-warning mx-5 my-5">Back to home</button>
                </Link>

                <Link to={-1}>
                    <button className="btn btn-outline-secondary mx-5 my-5">Back 1 page</button>
                </Link>

                <h3 className="my-5" style={{color:"blue"}}>Admin info:</h3>


                <div className="my-4">
                        <div>
                                <ul style={{fontSize:"15px", color:"blue"}}>
                                    <li>Name: {arr.name}</li>
                                    <li>Age: {arr.age}</li>
                                    <li>Login: {arr.login}</li>
                                    <li>Password: ********</li>
                                </ul>
                        </div>
                </div>
            </div>
            

            <div>
                <button onClick={add} className="btn btn-primary my-3">Add user</button>

                <table className="table my-3">
                    <thead className="table table-success">
                        <tr>
                            <th>Picture</th>
                            <th>Product name</th>
                            <th>Description</th>  
                            <th>Date</th>
                            <th>Type</th>  
                            <th>Module year</th> 
                            <th>Price</th>  
                            <th>Actions</th> 
                            <th>Admin name</th>
                            <th>Date</th>
                        </tr> 
                    </thead> 

                    <tbody>
                        {
                            
                            users.map(item=>(
                                <tr key={item.id}>
                                    <img width={80} src={item.imgs} alt="404" />
                                    <td>{item.fname}</td>
                                    <td>{item.lname}</td>
                                    <td>{item.date}</td>
                                    {/* {
                                        select12.map(item=>(
                                            <td key={item.id}>{item.name}</td>
                                        ))
                                    } */}
                                    <td>{item.e}</td>
                                    <td>{item.age}</td>
                                    <td>{item.money}</td>
                                    <td>
                                    <button onClick={()=>del(item.id)} className="btn btn-outline-danger">❌</button>
                                    <button onClick={()=>editItem(item)} className="btn btn-warning mx-1">✏️</button>
                                    </td>
                                    <td>{item.Admin}</td>
                                    <td>{item.data}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            <Rodal height={550} visible={modal} onClose={CloseM}>
                <h5 style={{color:"blue"}}>Add user</h5>
                <form onSubmit={handleSubmit(mySubmit)}>

                    <label>
                        {imgs?<img width={80} src={imgs}/>
                        :<img width={80} src="data:image/jpeg;base64,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" alt="404" />}
                        Logo picture to upload...
                        <input onChange={handleImg} type="file" className="d-none"/>
                    </label>

                    <input {...register("fname")} type="text" className="form-control my-3" placeholder="Product name"/>
                    <input {...register("lname")} type="text" className="form-control" placeholder="Description"/>
                    <input {...register("date")} className="form-control my-3" type="date" />


                    <CreatetableSelect
                        onChange={handleSelect}
                        options={select12.map(item=>({
                            value:item.name,
                            label:item.name,
                        }))}
                    />

                    
                    <input {...register("age")} type="text" className="form-control my-3" placeholder="Module year"/>
                    <input {...register("money")} type="text" className="form-control" placeholder="Price"/>
                    <button className="btn btn-info my-3">Save</button>
                </form>

            </Rodal>



            <ToastContainer/>
        </div>
    )
}
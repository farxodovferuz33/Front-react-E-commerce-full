import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


export default function AdminIns() {
    let params = useParams()

    let token = localStorage.getItem("token")
    

    const [arr, setArr] = useState([])

    const [chat, setChat] = useState([])

    const [inp, setInp] = useState("")


    function getUserD() {
        axios({url:"http://localhost:3020/arrayUs/"+params.id, method:"get"}).then((res)=>{
             setArr(res.data);
         })
     }
 
     useEffect(()=>{
         getUserD()
     },[params])



     function save() {
        let obj = {
            inp,
            from:token,
            to:params.id
        }
        axios({url:"http://localhost:3020/chats", method:"post", data:obj}).then((res)=>{
             getUserCh()
             setInp('')
         })
     }

     function getUserCh() {
        axios({url:"http://localhost:3020/chats", method:"get"}).then((res)=>{
             setChat(res.data);
         })
     }
 
     useEffect(()=>{
         getUserCh()
     },[])

     function h1(p,item) {
    //      if(p.buttons===2){
    //     //right click
    //        if(prompt('del & edit')==='del') { axios({url:"http://localhost:3020/chats/"+item.id, method:"delete"}).then((res)=>{
    //         getUserCh()
    //     }) 
    // }
    //     }
     }


    return (
        <div>
            {
                arr.name
            }




        <div>
            {
                chat.filter(item=>{
                    if ((item.from==token && item.to===params.id) || (item.from==params.id && item.to==token)) {
                        return item
                    }
                }).map(item=>(
                    <h1 onMouseDown={(e)=>h1(e,item)} className={item.from === token ? 'btn btn-danger' : 'btn btn-success'}>{item.inp}</h1>
                ))
            }
        </div>
        




            <input value={inp} onChange={e=>setInp(e.target.value)} type="text" placeholder="Place enter a text"/>
            <button onClick={save}>🚛</button>
            
        </div>
    )
}
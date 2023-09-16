import { Routes, Route, useNavigate, useLocation } from 'react-router';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp';
import Login from './Login'
import Admin from './Admin'
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import MyAcc from './myAccounts';
import { useEffect } from 'react';
import Page404 from './page404';
import './style.css'
import Chat from './Chat';
import AdminIns from './AdminIns';

export default function App() {
    const [id2, setId2] = useState("")

    const lockPage = ["/admin", "/myaccounts"]
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if (lockPage.includes(location.pathname)) {
            const token = localStorage.getItem("token")
            if (token!==null) {
                
            }else{
                navigate("/404ERROR")
            }
        }
    },[location.pathname])

    return (
        <div>
            
            <Routes>
                <Route path='/' element={<Header/>}/>
                <Route path='signup' element={<SignUp/>}/>
                <Route  path='signIn' element={<Login setId2={setId2}/>}/>
                <Route  path='/admin' element={<Admin id2={id2}/>}/>
                <Route path='/myaccounts' element={<MyAcc id2={id2}/>}/>
                <Route path='/404ERROR' element={<Page404/>}/>

                <Route path='/adminchat' element={<Chat/>}>
                    <Route path='/adminchat/chatIn/:id' element={<AdminIns/>}/>
                </Route>


            </Routes>
            <ToastContainer/>
        </div>
    )
}
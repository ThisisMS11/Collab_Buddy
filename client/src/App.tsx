import { useState,useEffect } from 'react'
import Login from './components/Auth/login'
import Signup from './components/Auth/signup'
import Home from './components/Home/home'
import Room from './components/rooms/room'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Edit_document_source from './components/Edit_document/Edit_document_source'
import AuthRequire from './Auth/authRequire'
import { useAuth } from './contexts/user'
import axios from 'axios'
import CircularInterminate from "./components/loading"
import { DocumentProvider } from './contexts/document'
import JoinRoom from './components/rooms/JoinRoom'
function App() {
  const auth=useAuth();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token){
      const getUser=async()=>{
        try{
          const user=await axios.get("http://localhost:3000/api/v1/users/me",{headers:{authorisation:`Bearer ${token}`}})
           auth.setUser(user.data.data);
          console.log(user.data); 
          setLoading(false);
        }catch(err:any){
          setLoading(false);
          console.log(err)
        }
      }
      getUser();
    }else{
      setLoading(false);
    }
  },[])

  return (
    <>
      <DocumentProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={loading==false?<AuthRequire><Home /></AuthRequire>:<CircularInterminate />} />
        <Route path="/edit-document/:id" element={loading==false?<AuthRequire><Edit_document_source /></AuthRequire>:<CircularInterminate />} />
        <Route path="/room/" element={<Room name={auth.user?.name} />} />
        <Route path="/room/:roomID" element = {<JoinRoom name = {auth.user?.name}/>} />

      </Routes>
      </DocumentProvider>
    </>
  )
}

export default App

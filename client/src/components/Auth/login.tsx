import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {  useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/user';
import {useNavigate, Navigate} from "react-router-dom"
import { useLocation } from 'react-router-dom';

type FormValues={
    email:string,
    password:string
}

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [errorMessages,setErrorMessages]=useState<string | null>(null);
    const [loading,setLoading]=useState(false);
    const auth=useAuth();
    const navigate=useNavigate();
    const location=useLocation();

    const redirectPath = location.state?.path || '/'


    let formSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is mandatory')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is mandatory')
            .min(6, 'Password must be at least 6 char long'),

    })

    let formOptions = { resolver: yupResolver(formSchema) }
    let { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>(formOptions)

    const emailHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value);
        console.log(email)
    }

    const passwordHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
    }

    const loginHandler=async()=>{
        setLoading(true);
        try{
            const res=await axios.post(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/users/login`,{email,password})
            console.log(res.data)
            localStorage.setItem("token",res.data.token);
            const user=await axios.get(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/users/me`,{headers:{authorisation:`Bearer ${res.data.token}`}})
            auth.setUser(user.data);
            navigate(redirectPath, { replace: true });
            setLoading(false);
            
        }catch(err:any){
            setLoading(false);
            console.log(err)
            setErrorMessages(err.response.data.error);
            console.log(err.response.data.error)
        }
        setPassword("");
        setEmail("");
    }

    return (
        <>
        <div className="text-center height-[100vh] flex justify-center items-center">
            <div className="font-serif pt-[300px]  text-[#2F2E2E] w-[320px] ml-auto mr-auto">
                <h1 className="font-serif text-[48px] leading-[48px] mt-[10px] mb-[24px]">Sign In</h1>
                <div className="mb-[32px] text-[18px] flex justify-center items-center">
                <p className="">New to this site?&nbsp;</p>
                <p className="text-[#217CA7] cursor-pointer" onClick={()=>{navigate('/signup')}}>Sign Up</p>
                </div>
                <form onSubmit={handleSubmit(loginHandler)}>
                    <div className="flex w-[100%] flex-col items-start mb-[50px]">
                        <p className="text-[#605E5E] text-[13px] ">Email</p>
                        <input type="email" value={email} onFocus={()=>{setErrorMessages(null)}} {...register("email")} onChange={emailHandler} className="w-[100%] outline-0 border-b-[#605E5E] border-b-[1px] p-[2px] "/>
                        <p className="text-red-600">{errors.email?.message}</p>
                    </div>
                    <div className="flex w-[100%] flex-col items-start mb-[50px]">
                        <p className="text-[#605E5E] text-[13px] ">Password</p>
                        <input type="password" {...register("password")} onFocus={()=>{setErrorMessages(null)}} onChange={passwordHandler} value={password} className="w-[100%] outline-0 border-b-[#605E5E] border-b-[1px] p-[2px]"/>
                        <p className="text-red-600">{errors.password?.message}</p>
                         <p className="text-red-600">{errorMessages}</p>
                    </div>
                    <p className="underline text-[16px] text-start pb-[13px] cursor-pointer">Forgot Password?</p>
                    {loading==false && <button type="submit" className="w-[100%] bg-[#217CA7] h-[48px] text-[#FFFFFF] text-[16px] hover:bg-[#318CE7]">Sign In</button>}
                    {loading==true && <button type='button' disabled className="w-[100%] bg-[#CCCCCC] h-[48px] text-[#FFFFFF] text-[16px]">Sign In</button>}
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;

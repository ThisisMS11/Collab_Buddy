import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {  useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/user';
import {useNavigate} from "react-router-dom"

type FormValues={
    name:string,
    email:string,
    password:string
}

const Signup=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [loading,setLoading]=useState(false);
    const [errorMessages,setErrorMessages]=useState<string | null>(null);

    const auth=useAuth();
    const navigate=useNavigate();

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is mandatory'),
        email: Yup.string()
            .required('Email is mandatory')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is mandatory')
            .min(6, 'Password must be at least 6 char long'),

    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>(formOptions)

    const emailHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value);
        console.log(email)
    }

    const passwordHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
    }

    const nameHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value);
    }

    const signupHandler=async()=>{
        setLoading(true);
        try{
            const res=await axios.post(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/users/register`,{name,email,password})
            console.log(res.data)
            localStorage.setItem("token",res.data.token);
            const user=await axios.get(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/users/me`,{headers:{authorisation:`Bearer ${res.data.token}`}})
            auth.setUser(user.data);
            console.log(user.data)
            navigate("/")
            setLoading(false);
        }catch(err:any){
            setLoading(false);
            setErrorMessages(err.response.data.error);
            console.log(err)
        }
        setPassword("");
        setEmail("");
        console.log(email,password)
        setPassword("");
        setEmail("");
        setName("");
    }

    return (
        <>
        <div className="text-center height-[100vh] flex justify-center items-center">
            <div className="font-serif pt-[300px]  text-[#2F2E2E] w-[320px] ml-auto mr-auto">
                <h1 className="font-serif text-[48px] leading-[48px] mt-[10px] mb-[24px]">Sign Up</h1>
                <div className="mb-[32px] text-[18px] flex justify-center items-center">
                <p className="">Already have an account?&nbsp;</p>
                <p className="text-[#217CA7] cursor-pointer" onClick={()=>{navigate('/login')}}>Sign In</p>
                </div>
                <form onSubmit={handleSubmit(signupHandler)}>
                    <div className="flex w-[100%] flex-col items-start mb-[50px]">
                        <p className="text-[#605E5E] text-[13px] ">Name</p>
                        <input type="text" value={name} {...register("name")} onFocus={()=>{setErrorMessages(null)}} onChange={nameHandler} className="w-[100%] outline-0 border-b-[#605E5E] border-b-[1px] p-[2px] focus:border-b-[#217CA7] focus:border-b-[2px]"/>
                        <p className="text-red-600">{errors.name?.message}</p>
                    </div>
                    <div className="flex w-[100%] flex-col items-start mb-[50px]">
                        <p className="text-[#605E5E] text-[13px] ">Email</p>
                        <input type="email" value={email} {...register("email")} onFocus={()=>{setErrorMessages(null)}} onChange={emailHandler} className="w-[100%] outline-0 border-b-[#605E5E] border-b-[1px] p-[2px] focus:border-b-[#217CA7] focus:border-b-[2px]"/>
                        <p className="text-red-600">{errors.email?.message}</p>
                    </div>
                    <div className="flex w-[100%] flex-col items-start mb-[50px]">
                        <p className="text-[#605E5E] text-[13px] ">Password</p>
                        <input type="password" {...register("password")} onFocus={()=>{setErrorMessages(null)}} onChange={passwordHandler} value={password} className="w-[100%] outline-0 border-b-[#605E5E] border-b-[1px] p-[2px] focus:border-b-[#217CA7] focus:border-b-[2px]"/>
                        <p className="text-red-600">{errors.password?.message}</p>   
                        {errorMessages && <p className="text-red-600">{errorMessages}</p>}                             
                    </div>
                    {loading==false && <button type="submit" className="w-[100%] bg-[#217CA7] h-[48px] text-[#FFFFFF] text-[16px]">Sign Up</button>}
                    {loading==true && <button type='button' disabled className="w-[100%] bg-[#CCCCCC] h-[48px] text-[#FFFFFF] text-[16px]">Sign Up</button>}

                </form>
            </div>
        </div>
        </>
    )
}

export default Signup;

import { createContext,useContext,useState } from "react";

type User={
    email:string,
    isVerified:boolean,
    name:string,
    _id:string,
}

type UserContextType={
    user:User|null,
    setUser:(user:User | null)=>void,
}

const userContext=createContext<UserContextType>({
    user:null,
    setUser:()=>{}
})

type userContextProviderProps={
    children:React.ReactNode
}

export const UserContextProvider=({children}:userContextProviderProps)=>{
    const [user,setUser]=useState<User | null>(null);

    return(
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(userContext)
}
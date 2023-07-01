import { createContext,useContext,useState } from "react";

type document={
    _id:string,
    name:string,
    content:string,
    admin:string,
    accessibility:string,
    viewers:string[],
    editors:string[],
}

type documentContext={
    document:document,
    setDocument:React.Dispatch<React.SetStateAction<document>>
}

const DocumentContext=createContext<documentContext>({} as documentContext);

export const DocumentProvider=({children}:{children:React.ReactNode})=>{
    const [document,setDocument]=useState<document>({} as document);
    return(
        <DocumentContext.Provider value={{document,setDocument}}>
            {children}
        </DocumentContext.Provider>
    )
}

export const useDocument=()=>useContext(DocumentContext);


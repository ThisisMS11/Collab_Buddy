import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chats from "./RightBar/chats";
import { useDocument } from "../../contexts/document";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/user";

const RightBar = ({ onlineUsers }: { onlineUsers: any }) => {
    const doc = useDocument();
    const auth = useAuth();
    const [show, setShow] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showCollabarator, setShowCollabarator] = useState<boolean>(true);
    // const [colloborators, setColloborators] = useState([]);

    console.log(onlineUsers)


    const editTitle = () => {
        console.log(title);
        if (title == "") {
            setShow(false);
            return;
        } 
        const token = localStorage.getItem("token");
        setLoading(true);
        const editTitleFunc = async () => {
            try {
                const res = await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/document/editName/${doc.document._id}`, { name: title }, { headers: { authorisation: `Bearer ${token}` } })
                console.log(res.data);
                doc.setDocument(res.data.data);
                setShow(false);
                setTitle("");
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        editTitleFunc();
    }

    const handleRemoveEditor = (editor: string) => {
        const token = localStorage.getItem("token");
        const removeEditorFunc = async () => {
            try {
                const res = await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/document/removeEditor/${doc.document._id}`, { editor: editor },
                    { headers: { authorisation: `Bearer ${token}` } })
                console.log(res.data);
                doc.setDocument(res.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        removeEditorFunc();
    }


    return (
        <div className="border-l-[2px] border-l-grey-300 col-span-3 p-[30px] font-serif flex flex-col overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-300 s" style={{ height: 'calc(100vh - 80px)' }}>
            <div className="flex justify-between items-center">
                <p className="text-[20px]">{doc.document.name}</p>
                {show == false && doc.document.admin == auth.user?._id && <button className="text-center flex justify-center items-center w-[60px] h-[30px] rounded-md bg-[#217CA7] text-[#FFFFFF] hover:bg-[#318CE7]" onClick={() => { setShow(true) }}>Edit</button>}

            </div>
            <div className="flex justify-between mt-[10px] items-center">
                {show == true && <input type="text" value={title} className="outline-none border-b-2" onChange={(e) => { setTitle(e.target.value) }} onBlur={() => { setShow(false) }}></input>}
                {show == true && loading == false && <button className="text-center flex justify-center items-center w-[60px] h-[30px] rounded-md bg-[#217CA7] text-[#FFFFFF] hover:bg-[#318CE7]" onClick={editTitle}>Save</button>}
                {show == true && loading == true && <button disabled className="text-center flex justify-center items-center w-[60px] h-[30px] rounded-md bg-[#CCCCCC] text-[#FFFFFF] ">Save</button>}
            </div>
            <div className="flex items-center mt-10">
                <FontAwesomeIcon icon={faChevronUp} className=' text-[#2F2E2E] mr-5 text-[20px] cursor-pointer' />
                <p className="text-[20px]">Comments</p>
            </div>
            <Chats />

            <div className="flex  mt-10 flex-col">
                <div className="flex">
                    <FontAwesomeIcon icon={faChevronUp} className=' text-[#2F2E2E] mr-5 text-[20px] cursor-pointer' />
                    <p className="text-[20px] ">Online collabarators</p>
                </div>


                <div>
                    {onlineUsers && onlineUsers.map((user: any) => {
                        return <div>{user}</div>
                    })}
                </div>
            </div>


            <div className="flex flex-col mt-10">
                <div className="flex">

                    <FontAwesomeIcon icon={faChevronUp}
                        onClick={() => { setShowCollabarator(!showCollabarator) }}
                        style={{
                            transition: 'transform 0.5s ease',
                        }}
                        className={`text-[20px] text-[#2F2E2E] mr-5  cursor-pointer ${showCollabarator ? 'transform rotate-180 ' : ''}`} />


                    <p className="text-[20px]">Collabarators</p>
                </div>


                <div>
                    {
                        showCollabarator && doc.document.editors.map((editor: any) => {
                            return <div className="flex items-center "> <p>{editor}</p> <i className="fa-solid fa-user-xmark ml-6" onClick={() => handleRemoveEditor(editor)}></i>
                            </div>
                        })
                    }
                </div>


            </div>
            <div className="flex items-center mt-10">
                <FontAwesomeIcon icon={faChevronUp} className='text-[20px] text-[#2F2E2E] mr-5 cursor-pointer' />
                <p className="text-[20px]">History</p>
            </div>
        </div>
    )
}

export default RightBar;
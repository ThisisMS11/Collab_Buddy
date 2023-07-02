import Edit_Document from "./edit-document";
import Header from "./header";
import RightBar from "./right-bar";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/user";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDocument } from "../../contexts/document";
import CircularIndeterminate from "../loading";
import { io, Socket } from 'socket.io-client'

const Edit_document_source = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const doc = useDocument();
    const [onlineUsers, setOnlineUsers] = useState<any>([]);

    useEffect(() => {
        const getDocument = async (id: string | undefined) => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/document/getDocument/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        authorisation: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                doc.setDocument(res.data.data);
                setLoading(false);
                // console.log(res.data);
            } catch (err) {
                console.log(err);
                setLoading(false)
            }

        };
        // console.log(id);
        getDocument(id);
    }, [id]);


    /* connecting the socket io here */
    useEffect(() => {
        console.log(auth.user);

        const END_POINT = import.meta.env.VITE_APP_URL_LOCAL;
        const s = (io as any).connect(END_POINT);

        s.on('connect', () => {
            const email= auth.user?.email  as string;
            s.emit('add-user', email);
        })

        setSocket(s);
        return () => {

            console.log(auth.user);

            const email= auth.user?.email  as string;
            s.emit('remove-user', email);
            s.disconnect();
        }
    }, []);


    useEffect(() => {
        socket?.on('get-online-users', (OU) => {
            console.log(OU);


            console.log(doc.document);

            const onlineEditors = OU.filter(user => doc.document.editors.includes(user));

            setOnlineUsers(onlineEditors);

        });
    }, [socket]);

    return (
        <>
            {loading == true ? <CircularIndeterminate /> :
                <>
                    <Header />
                    <div className="grid grid-cols-12">
                        <Edit_Document />
                        <RightBar onlineUsers={onlineUsers} />
                    </div>
                </>
            }

        </>
    )
}

export default Edit_document_source;
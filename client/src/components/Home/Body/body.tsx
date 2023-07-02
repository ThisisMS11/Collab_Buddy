import Cards from "./card";
import { Button } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularIndeterminate2 from "../../loading2";
import { useNavigate } from "react-router-dom";

const Body = () => {
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(true);
    const [documents, setDocuments] = useState<any>([]);
    const [documentName, setDocumentName] = useState<string>("");
    const [documentAccessibility, setDocumentAccessibility] = useState<string>("private");
    const [errorMessages, setErrorMessages] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllDocuments = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/document/getYourDocuments`, { headers: { authorisation: `Bearer ${token}` } });
                setDocuments(res.data.data);
                console.log(res.data);
            } catch (err: any) {
                console.log(err);
            }
        }

        getAllDocuments();
        setLoading2(false);
    }, [])

    const createDocument = async () => {
        if (documentName == "") {
            setErrorMessages("Please provide name of the document");
            return;
        }
        if (documentName.length > 50) {
            setErrorMessages("Name of the document must be less than 50 characters");
            return;
        }
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/document/create`, { name: documentName, accessibility: documentAccessibility }, { headers: { authorisation: `Bearer ${token}` } });
            console.log(res.data);
            setOpen(false);
            setLoading(false);
            documents.push(res.data.data);
        } catch (err: any) {
            console.log(err);
            setLoading(false);
        }

    }

    return (
        <>
            {loading2 == true && <CircularIndeterminate2 />}
            {
                loading2 == false &&
                <>
                    <div className="flex justify-end px-8 w-[100%] h-[140px]">
                        <Button className="w-[60px] h-[40px] bg-[#217CA7] text-[#FFFFFF]" style={{ width: '80px', height: '40px', backgroundColor: '#217CA7', color: '#FFFFFF', marginTop: '50px' }} onClick={() => { setOpen(true) }}>+ New</Button>

                    </div>
                    <div className="grid w-[100vw]  mx-auto justify-center items-center max-w-[1200px] gap-[50px] grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                        {documents.map((document: any) => {
                            return (
                                <Cards id={document._id} title={document.name} key={document.id} />
                            )
                        }
                        )}
                    </div>
                    <div style={{ display: 'grid', placeItems: 'center' }}>
                        <Dialog open={open} onClose={() => { setOpen(false) }} aria-labelledby="form-dialog-title" >
                            <DialogTitle id="form-dialog-title">Create New Document</DialogTitle>
                            <DialogContent sx={{ width: '500px' }}>
                                <DialogContentText>
                                    Enter the name of the document
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Document Name"
                                    type="text"
                                    fullWidth
                                    sx={{ marginTop: '20px' }}
                                    onChange={(e) => { setDocumentName(e.target.value) }}
                                    onFocus={() => { setErrorMessages(null) }}
                                />
                                {errorMessages &&
                                    <DialogContentText style={{ color: '#B22222' }}>
                                        {errorMessages}
                                    </DialogContentText>}

                                <DialogContentText style={{ marginTop: '30px' }}>
                                    Accessibility
                                </DialogContentText>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue={documentAccessibility}
                                    onChange={(e) => { setDocumentAccessibility(e.target.value), console.log(e.target.value) }}
                                >
                                    <FormControlLabel value="public" control={<Radio />} label="Public" />
                                    <FormControlLabel value="private" control={<Radio />} label="Private" />

                                </RadioGroup>
                            </DialogContent>
                            <DialogActions>
                                <Button className="w-[60px] h-[40px] bg-[#217CA7] text-[#FFFFFF]" style={{ width: '80px', height: '40px', backgroundColor: '#B22222', color: '#FFFFFF', marginBottom: '10px' }} onClick={() => { setOpen(false) }}>Cancel</Button>

                                {loading == false && <Button className="w-[60px] h-[40px] bg-[#217CA7] text-[#FFFFFF]" style={{ width: '80px', height: '40px', backgroundColor: '#217CA7', color: '#FFFFFF', marginRight: '10px', marginLeft: '15px', marginBottom: '10px' }} onClick={createDocument}>Create</Button>}
                                {loading == true && <Button disabled className="w-[60px] h-[40px] bg-[#CCCCCC] text-[#FFFFFF]" style={{ width: '80px', height: '40px', backgroundColor: '#CCCCCC', color: '#FFFFFF', marginRight: '10px', marginLeft: '15px', marginBottom: '10px' }} >Create</Button>}
                            </DialogActions>
                        </Dialog>
                    </div>
                </>
            }
        </>
    )
}

export default Body;
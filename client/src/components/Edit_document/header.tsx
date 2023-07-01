import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDocument } from "../../contexts/document";
import { useAuth } from "../../contexts/user";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const doc = useDocument();
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [accessibility, setAccessibility] = useState<string>("read");
    const [errorMessages, setErrorMessages] = useState<string | null>(null);
    const navigate = useNavigate();

    const addCollabarator = async () => {
        if (email == "") {
            setErrorMessages("Please provide email of the user");
            return;
        }

        const addCollabaratorFunc = async () => {
            const token = localStorage.getItem("token");
            console.log(email)
            try {
                if (accessibility == "read") {
                    if (doc.document.viewers.includes(email)) {
                        setErrorMessages("User is already a collabarator");
                        return;
                    }
                    setLoading(true);
                    const res = await axios.put(`http://localhost:3000/api/v1/document/addViewer/${doc.document._id}`, { viewer: email }, { headers: { authorisation: `Bearer ${token}` } });
                    console.log(res.data);
                    doc.setDocument(res.data.data);
                    setOpen(false);
                }
                else if (accessibility == "write") {
                    if (doc.document.editors.includes(email)) {
                        setErrorMessages("User is already a collabarator");
                        return;
                    }
                    setLoading(true);
                    const res = await axios.put(`http://localhost:3000/api/v1/document/addEditor/${doc.document._id}`, { editor: email }, { headers: { authorisation: `Bearer ${token}` } });
                    console.log(res.data);
                    doc.setDocument(res.data.data);
                    setOpen(false);
                }
                setEmail("");
                setAccessibility("read");
                setLoading(false);
            } catch (err: any) {
                setErrorMessages(err.response.data.error);
                console.log(err);
                setLoading(false);
            }
        }

        addCollabaratorFunc();
    }

    return (
        <>
            <div className="h-[80px] grid grid-cols-12  border-b-[2px] border-b-grey-300 items-center font-serif">
                <div className="border-r-[2px] col-span-1 h-[100%] border-r-grey-300 flex justify-center items-center">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={() => { navigate('/') }} className='text-[20px] text-[#2F2E2E] cursor-pointer' />
                </div>

                {(auth.user?._id == doc.document.admin) ?
                    <>
                        <div className="col-span-8 flex justify-between items-center">
                            <p className="text-[#2F2E2E] text-[30px]  pl-[20px]">Collabora</p>
                            <button className="mr-[20px] border-grey-300 border-[2px] text-center flex justify-center items-center w-[80px] h-[30px] rounded-md">Cancel</button>
                        </div>
                        <div className="border-l-[2px] col-span-3 h-[100%] border-l-grey-300 flex justify-between items-center px-[20px]">
                            <button className="border-grey-300 border-[2px] text-center flex justify-center items-center w-[180px] h-[30px] rounded-md" onClick={() => { setOpen(true) }}>Add Collabarators</button>
                            <button className="text-center flex justify-center items-center w-[80px] h-[30px] rounded-md bg-[#217CA7] text-[#FFFFFF] ">Save</button>
                        </div>
                    </>
                    :
                    <>
                        <div className="col-span-9 flex justify-between items-center">
                            <p className="text-[#2F2E2E] text-[30px]  pl-[20px]">Collabora</p>
                            <button className="mr-[20px] border-grey-300 border-[2px] text-center flex justify-center items-center w-[80px] h-[30px] rounded-md">Cancel</button>
                        </div>
                        <div className="border-l-[2px] col-span-2 h-[100%] border-l-grey-300 flex justify-center items-center">
                            <button className="text-center flex justify-center items-center w-[80px] h-[30px] rounded-md bg-[#217CA7] text-[#FFFFFF] ">Save</button>
                        </div>
                    </>
                }
            </div>
            
            <Dialog open={open} onClose={() => { setOpen(false) }} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Add New Collabarator</DialogTitle>
                <DialogContent sx={{ width: '500px' }}>
                    <DialogContentText>
                        Enter email of the user
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        type="text"
                        value={email}
                        fullWidth
                        sx={{ marginTop: '20px' }}
                        onChange={(e) => { setEmail(e.target.value) }}
                        onFocus={() => { setErrorMessages(null) }}
                    />
                    {<DialogContentText style={{ color: '#B22222' }}>
                        {errorMessages}
                    </DialogContentText>}

                    <DialogContentText style={{ marginTop: '30px' }}>
                        Accessibility
                    </DialogContentText>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={accessibility}
                        onChange={(e) => { setAccessibility(e.target.value), console.log(e.target.value) }}
                    >
                        <FormControlLabel value="write" control={<Radio />} label="Read & Write" />
                        <FormControlLabel value="read" control={<Radio />} label="Read" />
                    </RadioGroup>

                </DialogContent>
                <DialogActions>
                    <Button className="w-[60px] h-[40px] bg-[#217CA7] text-[#FFFFFF]" style={{ width: '80px', height: '40px', backgroundColor: '#B22222', color: '#FFFFFF', marginBottom: '10px' }} onClick={() => { setOpen(false) }}>Cancel</Button>
                    {loading == false && <Button className="w-[60px] h-[40px] bg-[#217CA7] text-[#FFFFFF]" style={{ width: '80px', height: '40px', backgroundColor: '#217CA7', color: '#FFFFFF', marginBottom: '10px' }} onClick={addCollabarator}>Add</Button>}

                    {loading == true && <Button disabled className="w-[60px] h-[40px] bg-[#CCCCCC] text-[#FFFFFF]" style={{ width: '80px', height: '40px', backgroundColor: '#CCCCCC', color: '#FFFFFF', marginRight: '10px', marginLeft: '15px', marginBottom: '10px' }} >Add</Button>}

                </DialogActions>
            </Dialog>

        </>
    )
}

export default Header;
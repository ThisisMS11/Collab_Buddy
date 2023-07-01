import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/user';
import axios from 'axios';

const Navbar = () => {
    const auth = useAuth();

    const handlelogout=()=>{
        const token = localStorage.getItem("token");
        const logoutFunc = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/users/logout`, { headers: { authorisation: `Bearer ${token}` } })
                console.log(res.data);
                auth.setUser(null);
                localStorage.removeItem("token");
            } catch (err) {
                console.log(err);
            }
        }
        logoutFunc();
    }

    return (    
        <>
            <div className="flex justify-between items-center w-[100%] h-[80px] bg-[#217CA7] ">
                <div className="flex justify-start items-center ml-[50px]">
                    <p className="text-[#FFFFFF] text-[30px] font-serif">Collabora</p>
                </div>
                <div>
                    <div className="flex justify-end items-center mr-[50px]">
                        <div className="rounded-[50%] bg-[#FFFFFF] w-[30px] h-[30px] mr-[10px] flex items-center justify-center  border-[#FFFFFF] text-[18px]">
                            <FontAwesomeIcon icon={faUser} className="text-[#217CA7]" />
                        </div>

                        <p className="text-[#FFFFFF] text-[16px] font-serif cursor-pointer">{auth.user?.name}</p>

                        <div className='text-white  ml-2 hover:underline hover:cursor-pointer' onClick={handlelogout}>
                            logout
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;
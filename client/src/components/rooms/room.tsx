import Navbar from "../Home/navbar";
import { useParams } from "react-router-dom";
import dotenv from 'dotenv';
dotenv.config();
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
const Home = ({name}) => {
// let {_id} = useParams();
// let x = 0; 
// let _id  = ( Math.random()).toString();  
let _id = Date.now().toString();
  const myMeeting = async (element:HTMLDivElement) => {
    const appId = process.env.appId; 
    const serverSecret = process.env.serverSecret;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      _id,
      Date.now().toString(),
      name
    );
    
   const zc =  ZegoUIKitPrebuilt.create(kitToken); 
   zc.joinRoom({
    container:element, 
    sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.origin +
            window.location.pathname +
            _id,
        },
      ],
    scenario:{
        mode:ZegoUIKitPrebuilt.VideoConference
    },
    showTurnOffRemoteCameraButton: true,
    showTurnOffRemoteMicrophoneButton: true,
    showRemoveUserButton: true,

   })
  };

  return (
    <>
    <Navbar />
    <div
      ref={myMeeting}
      style={{ width: '100vw', height: '80vh' }}
    ></div>
    </>
  );
};

export default Home;

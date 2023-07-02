import Navbar from "../Home/navbar";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import dotenv from 'dotenv';
dotenv.config();
const Home = ({name}) => {
    const { roomID } = useParams();
    console.log("here is room id ",roomID);
const _id = roomID; 
console.log("params parameted ", _id);
  const myMeeting = async (element:HTMLDivElement) => {
    const appId = process.env.appId; 
    const serverSecret = process.env.serverSecret;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      _id,
      Date.now().toString(),
      name||"Guest"
    );
    
   const zc =  ZegoUIKitPrebuilt.create(kitToken); 
   zc.joinRoom({
    container:element, 
    sharedLinks: [
        {
          name: 'link To Join',
          url:
            window.location.origin +
            window.location.pathname +
            _id?.toString(),
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

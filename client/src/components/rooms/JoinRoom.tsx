import Navbar from "../Home/navbar";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import dotenv from 'dotenv';
// dotenv.config();
const Home = ({ name } : {name:any}) => {
  const { roomID } = useParams();
  console.log("here is room id ", roomID);
  const _id = roomID;
  console.log("params parameted ", _id);
  const myMeeting = async (element: HTMLDivElement) => {

    const appId = 1509312406;
    const serverSecret = '255311da8095fe7608e17ac3461bb87a';

    console.log(appId, serverSecret);


    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      _id as string,
      Date.now().toString(),
      name || "Guest"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'link To Join',
          url:
            window.location.origin +
            window.location.pathname +
            _id?.toString(),
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference
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

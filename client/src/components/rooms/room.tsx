import Navbar from "../Home/navbar";

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
const Home = ({ name }: { name: any }) => {
  // let {_id} = useParams();
  // let x = 0; 
  // let _id  = ( Math.random()).toString();  
  let _id = Date.now().toString();
  const myMeeting = async (element: HTMLDivElement) => {

    const appId = 1509312406;
    const serverSecret = '255311da8095fe7608e17ac3461bb87a';

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      _id,
      Date.now().toString(),
      name
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.origin +
            window.location.pathname +
            _id,
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

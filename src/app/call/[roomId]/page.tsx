"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, getDoc, updateDoc, onSnapshot, addDoc } from "firebase/firestore";
import styles from "../../page.module.css";
import { useAppContext } from "../../context/AppContext";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

export default function CallPage() {
  const { roomId } = useParams() as { roomId: string };
  const router = useRouter();
  const { user, profile } = useAppContext();
  
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [callStatus, setCallStatus] = useState("Initializing...");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  // Initialize Media
  useEffect(() => {
    if (!user || !profile) return; // Wait until authenticated

    const init = async () => {
      try {
        setCallStatus("Requesting camera/mic permissions...");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        setupWebRTC(stream);
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setCallStatus("Camera/Mic blocked or not available.");
      }
    };

    init();

    return () => {
      // Cleanup
      hangUp();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile]);

  const setupWebRTC = async (stream: MediaStream) => {
    peerConnection.current = new RTCPeerConnection(servers);
    
    // Create a new remote stream to hold the incoming tracks
    const rStream = new MediaStream();
    setRemoteStream(rStream);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = rStream;
    }

    // Push tracks from local stream to peer connection
    stream.getTracks().forEach((track) => {
      peerConnection.current?.addTrack(track, stream);
    });

    // Pull tracks from peer connection, add to remote stream
    peerConnection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        rStream.addTrack(track);
      });
    };

    // Firebase references
    const callDoc = doc(collection(db, "calls"), roomId);
    const answerCandidates = collection(callDoc, "answerCandidates");
    const offerCandidates = collection(callDoc, "offerCandidates");

    // Check if the room already exists (we are answering) or if we need to create it (we are offering)
    const callSnapshot = await getDoc(callDoc);

    if (!callSnapshot.exists()) {
      // WE ARE THE CALLER
      setCallStatus("Creating call room... Waiting for others to join.");
      
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          addDoc(offerCandidates, event.candidate.toJSON());
        }
      };

      const offerDescription = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer });

      // Listen for remote answer
      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!peerConnection.current?.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          peerConnection.current.setRemoteDescription(answerDescription);
          setCallStatus("Call Connected!");
        }
      });

      // Listen for remote ICE candidates
      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            peerConnection.current?.addIceCandidate(candidate);
          }
        });
      });

    } else {
      // WE ARE THE CALLEE (Answering)
      setCallStatus("Joining existing call room...");
      
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          addDoc(answerCandidates, event.candidate.toJSON());
        }
      };

      const callData = callSnapshot.data();

      if (!callData.offer) {
         setCallStatus("Invalid room. No offer found.");
         return;
      }

      const offerDescription = new RTCSessionDescription(callData.offer);
      await peerConnection.current.setRemoteDescription(offerDescription);

      const answerDescription = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await updateDoc(callDoc, { answer });
      setCallStatus("Call Connected!");

      // Listen for remote ICE candidates
      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            peerConnection.current?.addIceCandidate(candidate);
          }
        });
      });
    }
  };

  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const toggleScreenShare = async () => {
    if (!peerConnection.current || !localStream) return;

    try {
      if (!isScreenSharing) {
        // Request screen share
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];

        // Replace the track being sent to the peer
        const sender = peerConnection.current.getSenders().find(s => s.track?.kind === 'video');
        if (sender) {
          sender.replaceTrack(screenTrack);
        }

        // Update local video element
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = new MediaStream([screenTrack]);
        }

        setIsScreenSharing(true);

        // Listen for the user clicking "Stop sharing" on the browser's native banner
        screenTrack.onended = () => {
          stopScreenShare();
        };
      } else {
        stopScreenShare();
      }
    } catch (err) {
      console.error("Error sharing screen:", err);
    }
  };

  const stopScreenShare = () => {
    if (!peerConnection.current || !localStream) return;
    
    // Get the original camera track
    const cameraTrack = localStream.getVideoTracks()[0];
    
    // Replace the track back to the camera
    const sender = peerConnection.current.getSenders().find(s => s.track?.kind === 'video');
    if (sender) {
      sender.replaceTrack(cameraTrack);
    }

    // Update local video element back to camera
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }

    setIsScreenSharing(false);
  };

  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks()[0].enabled = !isMicOn;
      setIsMicOn(!isMicOn);
    }
  };

  const toggleCam = () => {
    if (localStream) {
      localStream.getVideoTracks()[0].enabled = !isCamOn;
      setIsCamOn(!isCamOn);
    }
  };

  const hangUp = async () => {
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
    }
    
    router.push("/");
  };

  return (
    <main className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h2 className="h2" style={{ marginBottom: '8px' }}>Secure WebRTC Call</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Room ID: <span style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>{roomId}</span>
          <br />
          Status: <span style={{ color: callStatus === 'Call Connected!' ? 'var(--accent-lime)' : 'inherit' }}>{callStatus}</span>
        </p>

        <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
          {/* Remote Video (Bigger) */}
          <div className="bento-card" style={{ flex: 2, position: 'relative', overflow: 'hidden', padding: 0, backgroundColor: '#000', borderRadius: '24px' }}>
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: '100px', fontSize: '14px', zIndex: 10 }}>
              Remote Peer
            </div>
          </div>

          {/* Local Video (Smaller) */}
          <div className="bento-card" style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: 0, backgroundColor: '#111', borderRadius: '24px' }}>
            <video 
              ref={localVideoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isScreenSharing ? 'scaleX(1)' : 'scaleX(-1)' }}
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: '100px', fontSize: '14px', zIndex: 10 }}>
              {isScreenSharing ? "Your Screen" : "You"}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
          <button 
            onClick={toggleMic}
            style={{
              padding: '16px 24px',
              borderRadius: '100px',
              border: 'none',
              background: isMicOn ? 'rgba(255,255,255,0.1)' : '#FF5C5C',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'background 0.2s'
            }}
          >
            {isMicOn ? "🎙️ Mute" : "🔇 Unmute"}
          </button>
          
          <button 
            onClick={toggleCam}
            disabled={isScreenSharing}
            style={{
              padding: '16px 24px',
              borderRadius: '100px',
              border: 'none',
              background: isCamOn && !isScreenSharing ? 'rgba(255,255,255,0.1)' : '#FF5C5C',
              color: 'white',
              fontSize: '16px',
              cursor: isScreenSharing ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              transition: 'background 0.2s',
              opacity: isScreenSharing ? 0.5 : 1
            }}
          >
            {isCamOn ? "📹 Cam Off" : "📸 Cam On"}
          </button>

          <button 
            onClick={toggleScreenShare}
            style={{
              padding: '16px 24px',
              borderRadius: '100px',
              border: 'none',
              background: isScreenSharing ? 'var(--accent-lime)' : 'rgba(255,255,255,0.1)',
              color: isScreenSharing ? 'black' : 'white',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'background 0.2s'
            }}
          >
            💻 {isScreenSharing ? "Stop Sharing" : "Share Screen"}
          </button>

          <button 
            onClick={hangUp}
            style={{
              padding: '16px 32px',
              borderRadius: '100px',
              border: 'none',
              background: '#FF5C5C',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            ❌ End Call
          </button>
        </div>
      </div>
    </main>
  );
}

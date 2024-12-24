"use client";

import React, { useEffect, useState } from 'react';
import { Mic, WifiOff, Wifi } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SessionResponse {
    client_secret: {
      value: string;
    };
  }
  
  type ConnectionState = 'connected' | 'disconnected' | 'connecting' | 'failed';

const AssistantComponent: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    let webRTCPeerConnection: RTCPeerConnection | null = null;
    let microphone: MediaStream | null = null;

    const init = async (): Promise<void> => {
      try {
        const sessionResponse = await fetch("/api/session");
        const data: SessionResponse = await sessionResponse.json();
        const clientSecret: string = data?.client_secret.value;

        webRTCPeerConnection = new RTCPeerConnection();
        webRTCPeerConnection.onconnectionstatechange = () => {
          setConnectionState((webRTCPeerConnection?.connectionState || 'disconnected') as ConnectionState);
        };

        const audio = document.createElement("audio");
        audio.autoplay = true;
        webRTCPeerConnection.ontrack = (e: RTCTrackEvent) => {
          if (e.streams[0]) audio.srcObject = e.streams[0];
        };

        try {
          microphone = await navigator.mediaDevices.getUserMedia({ audio: true });
          if (microphone && webRTCPeerConnection) {
            webRTCPeerConnection.addTrack(microphone.getTracks()[0], microphone);
          }
        } catch (err) {
          console.log(err);
          setShowAlert(true);
          return;
        }

        const dataChannel: RTCDataChannel = webRTCPeerConnection.createDataChannel("oi_events");
        dataChannel.addEventListener("message", (event: MessageEvent) => {
          const resp: { type: string } = JSON.parse(event.data);
          setIsListening(resp.type === "input_audio_buffer.speech_started");
        });

        const offer: RTCSessionDescriptionInit = await webRTCPeerConnection.createOffer();
        await webRTCPeerConnection.setLocalDescription(offer);

        const sdpResponse = await fetch(
          `https://api.openai.com/v1/realtime?model=gpt-4o-mini-realtime-preview-2024-12-17`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/sdp",
              Authorization: `Bearer ${clientSecret}`,
            },
            body: offer.sdp,
          }
        );

        if (!sdpResponse.ok) throw new Error(`API error: ${sdpResponse.status}`);

        const answer: RTCSessionDescriptionInit = {
          type: "answer",
          sdp: await sdpResponse.text()
        };
        await webRTCPeerConnection.setRemoteDescription(answer);
      } catch (error) {
        console.error("Initialization error:", error);
        setShowAlert(true);
      }
    };

    init();

    return () => {
      microphone?.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      webRTCPeerConnection?.close();
    };
  }, []);

  const pulseSize = isListening ? 'scale-110' : 'scale-100';
  const pulseOpacity = isListening ? 'opacity-100' : 'opacity-70';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {showAlert && (
          <Alert className="mb-4 bg-red-100 border-red-200">
            <AlertDescription>
              Please enable microphone access to use this feature
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Voice Assistant</h2>
            <p className="text-sm text-slate-500">
              {connectionState === "connected" ? "Ready to listen" : "Connecting..."}
            </p>
          </div>

          <div className="relative flex justify-center">
            <div className={`
              w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full 
              flex items-center justify-center
              transition-all duration-300 ease-in-out
              ${isListening ? 'bg-blue-100' : 'bg-slate-100'}
              ${pulseSize} ${pulseOpacity}
            `}>
              {connectionState === "connected" ? (
                <div className="relative">
                  <Mic 
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                    ${isListening ? 'text-blue-500' : 'text-slate-400'}`}
                  />
                  {isListening && (
                    <div className="absolute inset-0 animate-ping">
                      <Mic className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500 opacity-75" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-pulse">
                  {connectionState === "disconnected" ? (
                    <WifiOff className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-slate-400" />
                  ) : (
                    <Wifi className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-slate-400" />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <div className={`
              px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm
              ${isListening ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}
            `}>
              {isListening ? 'Listening...' : 'Waiting for speech'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantComponent;

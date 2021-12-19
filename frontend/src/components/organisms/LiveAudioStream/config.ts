export const MEDIA_CONFIG = {
  audio: true,
  video: false,
};

export const ICE_SERVERS = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

export const OFFER_RECEIVE = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: false,
};

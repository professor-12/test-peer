const getMedia = async () => {
    return await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    });
};

const initialiseSocket = () => {
    const socket = io();
    return socket;
};
(async () => {
    let socket = initialiseSocket();
    let localStream, peer, remoteStream;
    peer = new Peer();
    peer.on("open", (id) => {
        peerElement.textContent = id;
    });
    let form = document.querySelector("form");
    let peerElement = document.querySelector("[data-id=peer]");
    const callButton = document.querySelector("#call-button");
    callButton.addEventListener("click", async (e) => {
        console.log(peer);
        localStream = await getMedia();

        peer.on("call", (call) => {
            call.answer(localStream);
            call.on("stream", (e) => {
                if (remoteStream) return;
                remoteStream = e;
                createVideoElement(document.body, e);
            });
        });
        createVideoElement(document.body, localStream);
        callButton.disabled = true;
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const stream = await getMedia();
        createVideoElement(document.body, stream);
        localStream = stream;
        const value = new FormData(e.target);
        let peerId = value.get("peerId");
        const call = peer.call(peerId, localStream);
        call.on("stream", (_stream) => {
            if (remoteStream) return;
            remoteStream = _stream;
            createVideoElement(document.body, _stream);
        });
    });
})();

const createVideoElement = (parent, stream) => {
    const __document = document.createElement("video");

    __document.srcObject = stream;

    __document.muted = true;
    __document.autoplay = true;

    parent.appendChild(__document);
};

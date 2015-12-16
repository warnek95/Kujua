easyrtc.setStreamAcceptor( function(callerEasyrtcid, stream) {
  var video = document.getElementById('caller');
  easyrtc.setVideoObjectSrc(video, stream);
});

easyrtc.setOnStreamClosed( function (callerEasyrtcid) {
  easyrtc.setVideoObjectSrc(document.getElementById('caller'), "");
});


function my_init() {
  easyrtc.setUsername("hij");
  easyrtc.joinRoom("ff");
  easyrtc.setRoomOccupantListener( roomListener);
  var connectSuccess = function(myId) {
    console.log(easyrtc.getRoomsJoined())
    easyrtc.setRoomApiField("ff",  "streamerId", myId);
    console.log("My easyrtcid is " + myId);
    console.log(easyrtc.roomData)
    for( var i in easyrtc.roomData["ff"].clientList){ //easyrtcid in occupants
      if(easyrtc.roomData["ff"].clientList[i].apiField && easyrtc.roomData["ff"].clientList[i].apiField.streamerId) {
        //console.log("easyrtcid=" + i + " favorite alien is " + easyrtc.roomData["ff"].clientList[i].apiField.favorite_alien.fieldValue);
        easyrtc.call(
          i,
          function(easyrtcid) { console.log("completed call to " + easyrtcid);},
          function(errorCode, errorText) { console.log("err:" + errorText);},
          function(accepted, bywho) {
            console.log((accepted?"accepted":"rejected")+ " by " + bywho);
          }
        );
      }
    }
  }
  var connectFailure = function(errorCode, errText) {
    console.log(errText);
  }
  easyrtc.initMediaSource(
    function(){        // success callback
      var selfVideo = document.getElementById("self");
      easyrtc.setVideoObjectSrc(selfVideo, easyrtc.getLocalStream());
      easyrtc.connect("Kujua", connectSuccess, connectFailure);
    },
    connectFailure
  );
}


function roomListener(roomName, otherPeers) {
  var otherClientDiv = document.getElementById('otherClients');
  while (otherClientDiv.hasChildNodes()) {
    otherClientDiv.removeChild(otherClientDiv.lastChild);
  }
  for(var i in otherPeers) {
    var button = document.createElement('button');
    button.onclick = function(easyrtcid) {
      return function() {
        performCall(easyrtcid);
      }
    }(i);

    label = document.createTextNode(easyrtc.idToName(i));
    button.appendChild(label);
    otherClientDiv.appendChild(button);
  }
}


function performCall(easyrtcid) {
  easyrtc.getLocalStream().getVideoTracks()[0].stop()
  easyrtc.getLocalStream().getAudioTracks()[0].stop()
  var selfVideo = document.getElementById("self");
  easyrtc.setVideoObjectSrc(selfVideo, "");
  //easyrtc.call(
  //  easyrtcid,
  //  function(easyrtcid) { console.log("completed call to " + easyrtcid);},
  //  function(errorCode, errorText) { console.log("err:" + errorText);},
  //  function(accepted, bywho) {
  //    console.log((accepted?"accepted":"rejected")+ " by " + bywho);
  //  }
  //);
}
//easyrtc.getLocalStream().getVideoTracks()[0].stop()
//easyrtc.getLocalStream().getAudioTracks()[0].stop()

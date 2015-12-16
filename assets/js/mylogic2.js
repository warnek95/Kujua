easyrtc.setStreamAcceptor( function(callerEasyrtcid, stream) {
  var video = document.getElementById('caller');
  easyrtc.setVideoObjectSrc(video, stream);
  easyrtc.getLocalStream().getVideoTracks()[0].stop()
easyrtc.getLocalStream().getAudioTracks()[0].stop()
});

easyrtc.setOnStreamClosed( function (callerEasyrtcid) {
  easyrtc.setVideoObjectSrc(document.getElementById('caller'), "");
});


function my_init(pseudo,room) {
  easyrtc.setUsername(pseudo);
  easyrtc.joinRoom(room);
  //easyrtc.setRoomOccupantListener( roomListener);
  var connectSuccess = function(myId) {
    console.log(easyrtc.getRoomsJoined())
    console.log("My easyrtcid is " + myId);
    console.log(easyrtc.roomData)
    for( var i in easyrtc.roomData[room].clientList){ //easyrtcid in occupants
      if(easyrtc.roomData[room].clientList[i].apiField && easyrtc.roomData[room].clientList[i].apiField.streamerId && easyrtc.roomData[room].clientList[i].apiField.streamTitle) {
        document.getElementById("Title").innerHTML = "<h2>"+ easyrtc.roomData[room].clientList[i].apiField.streamTitle.fieldValue +"</h2>";
        easyrtc.call(
          easyrtc.roomData[room].clientList[i].apiField.streamerId.fieldValue,
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
  //easyrtc.initMediaSource(
  //  function(){        // success callback
  //    var selfVideo = document.getElementById("self");
  //    easyrtc.setVideoObjectSrc(selfVideo, easyrtc.getLocalStream());
  easyrtc.connect("Kujua", connectSuccess, connectFailure)
  //  },
  //  connectFailure
  //);
}

//
//function roomListener(roomName, otherPeers) {
//  for(var i in otherPeers) {
//    if(otherPeers[i].apiField && otherPeers[i].apiField.streamerId && i == otherPeers[i].apiField.streamerId.fieldValue) {
//      document.getElementById("Title").innerHTML = "<h2>"+  otherPeers[i].apiField.streamTitle.fieldValue +"</h2>";
//      easyrtc.call(
//        otherPeers[i].apiField.streamerId.fieldValue,
//        function(easyrtcid) { console.log("completed call to " + easyrtcid);},
//        function(errorCode, errorText) { console.log("err:" + errorText);},
//        function(accepted, bywho) {
//          console.log((accepted?"accepted":"rejected")+ " by " + bywho);
//        }
//      );
//    }
//  }
//}


//function performCall(easyrtcid) {
//  easyrtc.getLocalStream().getVideoTracks()[0].stop()
//  easyrtc.getLocalStream().getAudioTracks()[0].stop()
//  var selfVideo = document.getElementById("self");
//  easyrtc.setVideoObjectSrc(selfVideo, "");
//  //easyrtc.call(
//  //  easyrtcid,
//  //  function(easyrtcid) { console.log("completed call to " + easyrtcid);},
//  //  function(errorCode, errorText) { console.log("err:" + errorText);},
//  //  function(accepted, bywho) {
//  //    console.log((accepted?"accepted":"rejected")+ " by " + bywho);
//  //  }
//  //);
//}
//easyrtc.getLocalStream().getVideoTracks()[0].stop()
//easyrtc.getLocalStream().getAudioTracks()[0].stop()

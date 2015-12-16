function my_init(pseudo,room) {
  easyrtc.setUsername(pseudo);
  easyrtc.joinRoom(room);
  //easyrtc.setRoomOccupantListener( roomListener);
  var connectSuccess = function(myId) {
    console.log(document.getElementById("newTitle").value)
    console.log(document.getElementById("Title").innerText)
    console.log(easyrtc.getRoomsJoined())
    var title = document.getElementById("newTitle").value ? document.getElementById("newTitle").value : document.getElementById("Title").innerText
    easyrtc.setRoomApiField(room,  "streamerId", myId);
    easyrtc.setRoomApiField(room,  "streamTitle", title);
    document.getElementById("Title").innerHTML = "<h2>"+ title +"</h2>";
    console.log("My easyrtcid is " + myId);
    console.log(easyrtc.roomData)
    for( var i in easyrtc.roomData[room].clientList){ //easyrtcid in occupants
      if(easyrtc.roomData[room].clientList[i].apiField && easyrtc.roomData[room].clientList[i].apiField.streamerId) {
        //console.log("easyrtcid=" + i + " favorite alien is " + easyrtc.roomData[room].clientList[i].apiField.favorite_alien.fieldValue);
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


//function roomListener(roomName, otherPeers) {
//  var otherClientDiv = document.getElementById('otherClients');
//  while (otherClientDiv.hasChildNodes()) {
//    otherClientDiv.removeChild(otherClientDiv.lastChild);
//  }
//  for(var i in otherPeers) {
//    var button = document.createElement('button');
//    button.onclick = function(easyrtcid) {
//      return function() {
//        performCall(easyrtcid);
//      }
//    }(i);
//
//    label = document.createTextNode(easyrtc.idToName(i));
//    button.appendChild(label);
//    otherClientDiv.appendChild(button);
//  }
//}

function stop(){
  easyrtc.getLocalStream().getVideoTracks()[0].stop()
  easyrtc.getLocalStream().getAudioTracks()[0].stop()
  var selfVideo = document.getElementById("self");
  easyrtc.setVideoObjectSrc(selfVideo, "");
}

/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var easyrtc = require("easyrtc");           // EasyRTC external module

module.exports.bootstrap = function(cb) {
  require('events').EventEmitter.defaultMaxListeners = Infinity;
//  //console.log(sails.hooks.http.app)
  var io = sails.io
  //console.log(io)
  // Overriding the default easyrtcAuth listener, only so we can directly access its callback
  easyrtc.events.on("easyrtcAuth", function(socket, easyrtcid, msg, socketCallback, callback) {
    easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function(err, connectionObj){
      if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
        callback(err, connectionObj);
        return;
      }

      connectionObj.setField("credential", msg.msgData.credential, {"isShared":false});

      console.log("["+easyrtcid+"] Credential saved!", connectionObj.getFieldValueSync("credential"));

      callback(err, connectionObj);
    });
  });

// To test, lets print the credential to the console for every room join!
  easyrtc.events.on("roomJoin", function(connectionObj, roomName, roomParameter, callback) {
    //console.log(connectionObj)
    console.log(connectionObj.getUsername())
    console.log("["+connectionObj.getEasyrtcid()+"] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
    easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
  });


// Start EasyRTC server
  var rtc = easyrtc.listen(sails.hooks.http.app, io, null, function(err, rtcRef) {
    console.log("Initiated");

    rtcRef.events.on("roomCreate", function(appObj, creatorConnectionObj, roomName, roomOptions, callback) {
      console.log("roomCreate fired! Trying to create: " + roomName);

      appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
    });
  });

  //require('../WebRTC-Scalable-Broadcast.js')(sails.hooks.http.server);

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

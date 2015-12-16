/**
 * InterviewController
 *
 * @description :: Server-side logic for managing Interviews
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var easyrtc = require("easyrtc");           // EasyRTC external module

module.exports = {
  index: function(req, res, next){
    var pseudo = req.session.User ? req.session.User.pseudo : 'tfguytyugkughfyth';
    Channel.findOne({where: {"owner" : pseudo}}, function(err,channelFound){
      Channel.find({sort: 'createdAt DESC', limit : 9 }, function(err,channelsFound){
        res.view({
          channel: channelFound,
          channels: channelsFound
        })
      })
    })
  },
  dunno: function(req, res, next){
    var socket = req.socket;
    var io = sails.io;
    io.sockets.on('connection', function (socket) {
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
        console.log(data);
      });
    });
    res.view({
      name: "boom"
    });
  }
};


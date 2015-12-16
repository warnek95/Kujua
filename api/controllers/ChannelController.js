/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ObjectId = require('mongodb').ObjectID;
number = 0;

module.exports = {
	new : function(req,res,next) {
    Category.find({}).exec(function (err, categories){
      if (err) return res.negotiate(err);
      res.view({
        categories : categories
      });
    });
  },
  create : function(req,res,next) {
    var uploadPath = '../../assets/images';
    req.file('picture').upload({ dirname: uploadPath },function fileUploaded(err, files) {
      Channel.create({
        name : req.param('name'),
        description: req.param('description'),
        category: req.param('category'),
        free: req.param('free'),
        public: req.param('public'),
        owner: req.session.User.pseudo,
        picture: files[0] ? files[0].fd.replace(sails.config.folder,'') : '/images/1.jpg'
      },function (err, channelCreated){
        if (err) return res.negotiate(err);
        res.ok();
      })
    });
  },
  stream : function(req,res,next) {
    Channel.native(function(err, collection) {
      collection.findOne(
        {owner: req.param('pseudo')}
        ,function(err, channelFound) {
          res.view({
            channel: channelFound
          });
        })
    });
  },
  //category : function(req,res,next) {
  //  Channel.find({"category": req.param('category')},function(err,channelsFound){
  //    res.view({
  //      channels: channelsFound
  //    })
  //  })
  //},
  see : function(req,res,next) {
    Channel.native(function(err, collection) {
      number++;
      collection.findOne(
        {owner: req.param('pseudo')}
        ,function(err, channelFound) {
          res.view({
            channel: channelFound,
            pseudo: req.session.User ? req.session.User.pseudo : "anonymous"+number
          });
        })
    });
  },
  allcat : function(req,res,next) {
    res.view();
  },
  show : function(req,res,next) {
    if(req.param('category')){
      Channel.find({"category": req.param('category')},function(err,channelsFound){
        res.view({
          channels: channelsFound
        })
      })
    } else if (req.param('query')) {
      Channel.find({
          or : [
            { owner: { 'contains': req.param('query') } },
            { name: { 'contains': req.param('query') } }
          ]
        },function(err,channelsFound){
        res.view({
          channels: channelsFound
        })
      })
    } else {
      Channel.find({},function(err,channelsFound){
        res.view({
          channels: channelsFound
        })
      })
    }
  },
  edit : function(req,res,next) {
    res.view()
  }
};


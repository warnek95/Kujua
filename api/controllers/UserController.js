/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ObjectId = require('mongodb').ObjectID;

module.exports = {
  new: function (req, res,next) {
    var error = '';
    if (req.session.errorSignUp) {
      error = req.session.errorSignUp;
    }
    req.session.errorSignUp = '';
    res.view({
      errors: error
    });
  },
  create: function (req, res, next) {
    var error = new Object();
    var emailv = false;
    var pseudov = false;
    User.find({})
    .exec(function(err, users) {
      var Passwords = require('machinepack-passwords');

      // Encrypt a string using the BCrypt algorithm.
      Passwords.encryptPassword({
        password: req.param('password'),
      }).exec({
        // An unexpected error occurred.
        error: function (err){
          res.negotiate(err);
        },
        // OK.
        success: function (result){

          for (var i = users.length - 1; i >= 0; i--) {
            if (users[i].email == req.param('email')) emailv = true;
            if (users[i].pseudo == req.param('pseudo')) pseudov = true;
          };
          if(emailv ){
            error.errEmail = true;
          };
          if(pseudov ){
            error.errPseudo = true;
          };
          if (error.errEmail || error.errPseudo) {
            //req.session.errorSignUp = error;
            res.emailOrPseudoAlreadyInUse(error.errEmail,error.errPseudo);
          }else{
            var uploadPath = '../../assets/images';
            req.file('picture').upload({ dirname: uploadPath },function fileUploaded(err, files) {
              User.create({
                pseudo: req.param('pseudo'),
                lastName: req.param('lastName'),
                firstName: req.param('firstName'),
                password: result,
                email: req.param('email'),
                online: false,
                status: req.param('status'),
                profession: req.param('profession'),
                following: new Array(),
                picture: files[0] ? files[0].fd.replace(sails.config.folder,'') : '/images/anon.jpg'
              }, function userCreated(err, userCreated) {
                if (err) return next(err);
                User.native(function (err, collection) {
                  collection.findOne(
                    {_id: new ObjectId(userCreated.id)}
                    , function (err, userFound) {
                      req.session.authenticated = true;
                      req.session.User = userFound;
                      // user.online = 1;
                      res.logInSuccessful()
                    })
                });
              })
            })
          }
        }
      })
    })
  },
  connect: function (req, res,next) {
    res.view({});
  },
  show: function(req,res,next){
    Channel.findOne({where: {"owner" : req.session.User.pseudo}}, function(err,channelFound) {
      res.view({
        channel: channelFound,
        user: req.session.User
      })
    })
  }
};


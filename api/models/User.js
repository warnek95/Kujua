/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'Users',
  schema: true,
  connection: 'mongodbconnect',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    pseudo: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    firstName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    online: {
      type: 'boolean',
      defaultsTo: false
    },
    status: {
      //(viewer , consultant , admin)
      type: 'string',
      required: true
    },
    following: {
      type: 'array'
    },
    profession: {
      type: 'string'
    },
    picture: {
      type: 'string',
      required: true
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj._csrf;
      return obj;
    }
  }
};


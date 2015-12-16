/**
* Channel.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'Channels',
  schema: true,
  connection: 'mongodbconnect',
  autoCreatedAt: true,
  autoUpdatedAt: false,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    category: {
      type: 'string',
      required: true
    },
    free: {
      type: 'string',
      required: true
    },
    public: {
      type: 'string',
      required: true
    },
    owner: {
      type: 'string',
      required: true
    },
    picture: {
      type: 'string',
      required: true
    }
  }
};


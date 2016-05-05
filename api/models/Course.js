/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    code: {type: 'string'},
    name: {type: 'string'},
    credits: {type: 'string'},
    url: {type: 'string'},
    department: {model: 'Department'},
    guide: {model: 'Guide'},
    keywords: {
      collection: 'Tag',
      via: 'course'
    }
  }
};


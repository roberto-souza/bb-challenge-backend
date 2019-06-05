'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Tool extends Model {
  tags() {
    return this.hasMany('App/Models/Tag');
  }
}

module.exports = Tool;

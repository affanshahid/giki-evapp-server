import Sequelize from 'sequelize';
import config from '../config';

export const sequelize = initDB();

export const Announcement = sequelize.import('./Announcement');
export const Module = sequelize.import('./Module');

function initDB() {
  return new Sequelize(...config.dbSetup, config.dbOpts);
}

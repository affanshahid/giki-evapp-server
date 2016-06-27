import Sequelize from 'sequelize';
import config from '../config';

export const sequelize = initDB();

export const Announcement = sequelize.import('./Announcement');
export const Module = sequelize.import('./Module');
export const News = sequelize.import('./News');

function initDB() {
  return new Sequelize(...config.dbSetup, config.dbOpts);
}

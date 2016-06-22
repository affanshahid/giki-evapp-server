import Sequelize from 'sequelize';
import config from '../config';

export const sequelize = initDB();

export const Announcement = sequelize.import('./Announcement');
export const Module = sequelize.import('./Module');

function initDB() {
  let sequelize;

  if (config.env === 'development') {
    sequelize = new Sequelize(undefined, undefined, undefined, {
      dialect: 'sqlite',
      storage: './data/db.sqlite',
      typeValidation: true,
      logging: false
    });
  } else {
    sequelize = new Sequelize(config.db_url, {
      dialect: 'postgres',
      typeValidation: true,
      logging: false
    });
  }

  return sequelize;
}

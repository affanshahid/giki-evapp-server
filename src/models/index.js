import Sequelize from 'sequelize';

export function init(wagner) {
  wagner.factory('sequelize', initDB);

  wagner.factory('Announcement', sequelize => sequelize.import('./Announcement'));
  wagner.factory('Module', sequelize => sequelize.import('./Module'));
}

function initDB(config) {
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

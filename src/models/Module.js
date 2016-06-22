import locTags from './location_tags';

export default function (sequelize, DataTypes) {
  return sequelize.define('Module', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: DataTypes.STRING,
    category: DataTypes.STRING,
    fileId: DataTypes.STRING,
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    locTag:{
      allowNull: false,
      type: DataTypes.ENUM.apply(null, locTags)
    }
  });
}

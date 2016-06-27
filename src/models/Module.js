import locTags from './location_tags';

export default function (sequelize, DataTypes) {
  return sequelize.define('Module', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 60]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 200]
      }
    },
    link: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    category: DataTypes.STRING,
    fileUrl: DataTypes.STRING,
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    locTag: {
      allowNull: false,
      type: DataTypes.ENUM.apply(null, locTags)
    },
    startEpoch: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return new Date(this.get('startTime')).getTime();
      }
    },
    endEpoch: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return new Date(this.get('endTime')).getTime();
      }
    }
  });
}

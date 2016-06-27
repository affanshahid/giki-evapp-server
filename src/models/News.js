export default function (sequelize, DataTypes) {
  return sequelize.define('News', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5,60]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5,200]
      }
    },
    link: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    fileUrl: DataTypes.STRING
  });
}

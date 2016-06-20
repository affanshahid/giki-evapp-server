export default function (sequelize, DataTypes) {
  return sequelize.define('Announcement', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
}

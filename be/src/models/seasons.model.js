const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const seasons = sequelizeClient.define('seasons', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startsAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endsAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  seasons.associate = function (models) {
    models.seasons.hasMany(models.participants);
    models.seasons.hasMany(models.walls);
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return seasons;
};

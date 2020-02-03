const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const walls = sequelizeClient.define('walls', {
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

  walls.associate = function (models) {
    models.walls.belongsTo(models.seasons);
    models.walls.belongsToMany(models.participants, { through: models.walls_participants });
  };

  return walls;
};

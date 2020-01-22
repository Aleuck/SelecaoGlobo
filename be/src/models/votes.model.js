// const Sequelize = require('sequelize');
// const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const votes = sequelizeClient.define('votes', {
    // no fields
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  votes.associate = function (models) {
    models.votes.belongsTo(models.walls_participants);
  };

  return votes;
};

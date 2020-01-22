const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const wallsParticipants = sequelizeClient.define('walls_participants', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV,
      primaryKey: true
    }
  }, {
    timestamps: false,
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  wallsParticipants.associate = function (models) {
    models.walls_participants.hasMany(models.votes);
  };

  return wallsParticipants;
};

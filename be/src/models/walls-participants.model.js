const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const wallsParticipants = sequelizeClient.define('walls_participants', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    callNumber: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    smsNumber: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
  }, {
    timestamps: false,
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  wallsParticipants.associate = function (models) {
    models.walls_participants.hasMany(models.votes, {
      foreignKey: {
        name: 'vote',
        allowNull: false,
      },
    });
  };

  return wallsParticipants;
};

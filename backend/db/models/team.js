'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    creatorId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Team.associate = function(models) {
    Team.belongsTo(models.User, {
      as: "creator",
      foreignKey: "creatorId"
    })
    Team.hasMany(models.Project, {
      foreignKey: "teamId",
      onDelete: "CASCADE",
      hooks: true,
    })
    Team.hasMany(models.Membership, {
      foreignKey: "teamId",
      onDelete: "CASCADE",
      hooks: true,
    })
  };
  return Team;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.User, {
      as: "creator",
      foreignKey: "creatorId"
    })
    Project.belongsTo(models.Team, { foreignKey: "teamId" })
    Project.hasMany(models.Task, {
      as: "tasks",
      foreignKey: "projectId",
      onDelete: "CASCADE",
      hooks: true,
    })
  };
  return Project;
};

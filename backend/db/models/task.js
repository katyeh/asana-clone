'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    deadline: {
      type: DataTypes.DATEONLY,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assigneeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.Project, { as: "tasks", foreignKey: "projectId" })
    Task.belongsTo(models.User, {
      as: "assignee",
      foreignKey: "assigneeId"
    })
    Task.belongsTo(models.User, {
      as: "creator",
      foreignKey: "creatorId"
    });
    Task.hasMany(models.Comment, {
      foreignKey: "taskId",
      onDelete: "CASCADE",
      hooks: true, })
  };
  return Task;
};

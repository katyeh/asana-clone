'use strict';
module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER
    },
  }, {});
  Membership.associate = function(models) {
    Membership.belongsTo(models.Team, { foreignKey: "teamId" })
    Membership.belongsTo(models.User, { foreignKey: "userId" })
  };
  return Membership;
};

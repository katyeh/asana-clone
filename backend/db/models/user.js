'use strict';

const bcrypt = require('bcryptjs');
const userproject = require('./userproject');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    picUrl: {
      type: DataTypes.STRING(500),
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validates: {
        len: [60, 60],
      },
    },
    tokenId: {
      type: DataTypes.STRING
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Team, { foreignKey: "creatorId" })
    User.hasMany(models.Project, { foreignKey: "creatorId" })
    User.hasMany(models.Task, { as: "assignee", foreignKey: "assigneeId" })
    User.hasMany(models.Task, { as: "creator", foreignKey: "creatorId" })
    User.hasMany(models.Membership, { foreignKey: "userId" })
    User.hasMany(models.Comment, { foreignKey: "userId" })

    const columnMapping = {
      through: 'UserProject',
      foreignKey: 'userId',
      other: 'projectId'
    }

    User.belongsToMany(models.Project, columnMapping);
  };

  User.prototype.isValid = () => true;

  User.prototype.setPassword = function (password) {
    this.hashedPassword = bcrypt.hashSync(password);
    return this;
  };

  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  // TODO: Customize the Safe Object for JWT if needed
  User.prototype.toSafeObject = function () {
    return {
      createdAt: this.createdAt,
      email: this.email,
      id: this.id,
      name: this.name,
      updatedAt: this.updatedAt,
    };
  };

  return User;
};

'use strict';

function passwordEncrypt(password) {
  return password.split('').reverse().join('');
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      set(value) {
        this.setDataValue('password', passwordEncrypt(value));
      },
      get() {
        return '';
      },
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  }, {});

  User.prototype.doesPasswordMatch = function (guess) {
    return passwordEncrypt(guess) === this.getDataValue('password');
  };

  User.associate = function(models) {
    User.hasMany(models.Task);
  };
  return User;
};
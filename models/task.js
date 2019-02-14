'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    completedAt: DataTypes.DATE
  }, {
    scopes: {
      incomplete: {
        where: {
          completedAt: null
        }
      },
      completed: {
        where: {
          completedAt: {
            [sequelize.Op.not]: null
          }
        }
      },
      completedToday: function() {
        return {
          where: {
            completedAt: {
              [sequelize.Op.gte]: (new Date() - 24 * 60 * 60 * 1000)
            }
          }
        };
      },
      updatedToday: function() {
        return {
          where: {
            updatedAt: {
              [sequelize.Op.gte]: (new Date() - 24 * 60 * 60 * 1000)
            }
          }
        };

      },
      completedXHoursAgo: function(x) {
        return {
          where: {
            completedAt: {
              [sequelize.Op.gte]: (new Date() - x * 60 * 60 * 1000)
            }
          }
        };
      }
    }
  });
  Task.associate = function(models) {
    Task.belongsTo(models.User);
  };

  Task.prototype.isCompleted = function() {
    return !!this.completedAt;
  };

  Task.prototype.markCompleted = function() {
    return this.update({ completedAt: new Date() });
  };
  return Task;
};
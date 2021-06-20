'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A title is required'
                },
                notEmpty: {
                    msg: 'Please provide a valid course title'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description is required'
                },
                notEmpty: {
                    msg: 'Please provide a valid course description'
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: {
              fieldName: "userId",
              allowNull: true,
            }
        },
    },
    { 
        sequelize 
    });
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
          foreignKey: 'userId',
          allowNull: false
        });
      };
    
    return Course;
};
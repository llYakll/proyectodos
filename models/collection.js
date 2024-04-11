const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collection extends Model {}

Collection.init(
    {
        collectionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avgPrice: {
            type: DataTypes.DECIMAL(10, 2)
        },
        cardID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'card',
                key: 'cardID'
            }
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'userID'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'collection'
    }
)

module.exports = Collection;
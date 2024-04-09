const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Collection extends Model {}

Collection.init(
    {
        collectionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userID',
            },
        },
        cardID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Card_Collection',
                key: 'cardID',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        avgPrice: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'collection',
    }
)

module.exports = Collection;
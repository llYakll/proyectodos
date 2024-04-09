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
        },
        avgPrice: {
            type: DataTypes.DECIMAL(10, 2),
        },
    }
)

module.exports = Collection;
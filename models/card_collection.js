const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Card_Collection extends Model {}

Card_Collection.init(
    {
        cardID: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Card',
                key: 'cardID',
            },
        },
        collectionID: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'Collection',
                key: 'collectionID',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'card_collection',
    }
)

module.exports = Card_Collection;
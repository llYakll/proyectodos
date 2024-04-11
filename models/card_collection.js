const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card_Collection extends Model {}

Card_Collection.init(
    {
        cardID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'card',
                key: 'cardID'
            }
        },
        collectionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'collection',
                key: 'collectionID'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'card_collection'
    }
);

module.exports = Card_Collection;
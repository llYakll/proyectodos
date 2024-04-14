const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card_Collection extends Model {}

Card_Collection.init(
    {
        card_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'card',
                key: 'card_id'
            }
        },
        collection_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'collection',
                key: 'collection_id'
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
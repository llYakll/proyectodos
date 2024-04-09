const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

Card.init(
    {
        cardID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cardType: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        imgURL: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        pokeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemon',
                key: 'pokeID'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'card'
    }
);

module.exports = Card;
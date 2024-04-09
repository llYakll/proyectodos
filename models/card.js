const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

Card.init(
    {
        cardID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        pokeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Pokemon',
                key: 'pokeID',
            },
        },
        cardType: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        imgURL: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'card',
    }
)

module.exports = Card;
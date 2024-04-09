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
        },
        imgURL: {
            type: DataTypes.STRING,
        },
    }
)

module.exports = Card;
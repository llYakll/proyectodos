const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Collection = require('./collection');
const Card_Collection = require('./card_collection');

class Card extends Model {
    static async saveToCollection(cardData, userId) {
        try {
            const collection = await Collection.findOne({
                where: { userId: userId },
            });
      
            if (!collection) {
                throw new Error('User collection not found');
            }
      
            const cardCollection = await Card_Collection.create({
                cardID: cardData.cardID,
                collectionID: collection.collectionID,
            });
      
            return cardCollection;
        } catch (error) {
            console.error('Error saving card to collection:', error);
            throw error;
        }
    }
}

Card.init(
    {
        cardID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        setID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cardName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cardSubtypes: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        averageSellPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        imgURL: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'card'
    }
);

module.exports = Card;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Collection = require('./collection');
const Card_Collection = require('./card_collection');

class Card extends Model {
    static async saveToCollection(card_data, user_id) {
        try {
            const collection = await Collection.findOne({
                where: { user_id: user_id },
            });
      
            if (!collection) {
                throw new Error('User collection not found');
            }
      
            const cardCollection = await Card_Collection.create({
                card_id: card_data.card_id,
                collection_id: collection.collection_id,
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
        card_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        set_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        card_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        card_subtypes: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isArray(value) {
                    if (!Array.isArray(value)) {
                        throw new Error('card_subtypes must be an array');
                    }
                }
            }
        },
        average_sell_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        img_url: {
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
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Team_Roster extends Model {}

Team_Roster.init(
    {
        rosterID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        teamHash: {
            type: DataTypes.STRING,
            allowNull: false
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
        modelName: 'team_roster'
    }
);

module.exports = Team_Roster;
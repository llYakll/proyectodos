const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Team extends Model {}

Team.init(
    {
        teamID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'userID',
            },
        },
        teamName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        pokemon1ID: {
            type: DataTypes.STRING,
            references: {
                model: 'pokemon',
                key: 'pokeID',
            },
        },
        pokemon2ID: {
            type: DataTypes.STRING,
            references: {
                model: 'pokemon',
                key: 'pokeID',
            },
        },
        pokemon3ID: {
            type: DataTypes.STRING,
            references: {
                model: 'pokemon',
                key: 'pokeID',
            },
        },
        pokemon4ID: {
            type: DataTypes.STRING,
            references: {
                model: 'pokemon',
                key: 'pokeID',
            },
        },
        pokemon5ID: {
            type: DataTypes.STRING,
            references: {
                model: 'pokemon',
                key: 'pokeID',
            },
        },
        pokemon6ID: {
            type: DataTypes.STRING,
            references: {
                model: 'pokemon',
                key: 'pokeID',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'team',
    }
);

module.exports = Team;
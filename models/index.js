const Card_Collection = require('./card_collection');
const Team_Roster = require('./team_roster');
const Collection = require('./collection');
const Pokemon = require('./pokemon');
const User = require('./user');
const Team = require('./team');
const Card = require('./card');

/* User Relationships (Bottom) */
User.hasMany(Team, {
    foreignKey: 'userID'
});

Team.belongsTo(User, {
    foreignKey: 'userID'
});

User.hasOne(Collection, {
    foreignKey: 'userID'
});

Collection.belongsTo(User, {
    foreignKey: 'userID'
});


/* Pokemon & Team Relationships (Top & Left) */
Pokemon.hasMany(Card, {
    foreignKey: 'pokeID'
});

Card.belongsTo(Pokemon, {
    foreignKey: 'pokeID'
});

Pokemon.hasMany(Team_Roster, {
    foreignKey: 'pokeID'
});

Team_Roster.belongsTo(Pokemon, {
    foreignKey: 'pokeID'
});

// Team.hasMany(Team_Roster, {
//     foreignKey: '???'
// });

// Team_Roster.belongsTo(Team, {
//     foreignKey: '???'
// });


/* Card & Collection Relationships (Right) */
Card_Collection.hasMany(Card, {
    foreignKey: 'cardID'
});

Card.belongsTo(Card_Collection, {
    foreignKey: 'cardID'
});

Card_Collection.hasMany(Collection, {
    foreignKey: 'collectionID'
});

Collection.belongsTo(Card_Collection, {
    foreignKey: 'collectionID'
});



module.exports = { User, Pokemon, Team_Roster, Team, Card, Card_Collection, Collection }

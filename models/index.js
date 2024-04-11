const Card = require('./card');
const Card_Collection = require('./card_collection');
const Collection = require('./collection');
const User = require('./user');

// one to one
User.hasOne(Collection, {
    foreignKey: 'userID'
});

Collection.belongsTo(User, {
    foreignKey: 'userID'
});

// many to many
Card.belongsToMany(Collection, {
    through: Card_Collection,
    foreignKey: 'cardID'
});

Collection.belongsToMany(Card, {
    through: Card_Collection,
    foreignKey: 'collectionID'
});

module.exports = { Card, Card_Collection, Collection, User };
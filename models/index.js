const Card = require('./card');
const Card_Collection = require('./card_collection');
const Collection = require('./collection');
const User = require('./user');

User.hasOne(Collection, {
    foreignKey: 'userID'
});

Collection.belongsTo(User, {
    foreignKey: 'userID'
});

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

module.exports = { Card, Card_Collection, Collection, User };
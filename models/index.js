const Card = require('./card');
const Card_Collection = require('./card_collection');
const Collection = require('./collection');
const User = require('./user');

// one to one
User.hasOne(Collection, {
    foreignKey: 'user_id'
});

Collection.belongsTo(User, {
    foreignKey: 'user_id'
});

// many to many
Card.belongsToMany(Collection, {
    through: Card_Collection,
    foreignKey: 'card_id'
});

Collection.belongsToMany(Card, {
    through: Card_Collection,
    foreignKey: 'collection_id'
});

module.exports = { Card, Card_Collection, Collection, User };
const Card = require('../models/card');

const cardData = [
  {
    cardType: 'basic',
    imgURL: 'url_here',
  },
  {
    cardType: 'mega',
    imgURL: 'url_here',
  },
  {
    cardType: 'EX',
    imgURL: 'url_here',
  },
  {
    cardType: 'basic',
    imgURL: 'url_here',
  },
  {
    cardType: 'mega',
    imgURL: 'url_here',
  },

  // Potentially in need of another column here to contain some sort of identifying information for each specific card besides the auto iterating cardID.
  // Before our big shift, this was being covered by pokeID

  // I left one painting from the seed used in our exercises as an example for when I bring it up.

  // {
  //   title: 'Winter Home',
  //   artist: 'Smit',
  //   exhibition_date: 'January 20, 2018',
  //   gallery_id: 4,
  //   filename: '09-winter-home.jpg',
  //   description:
  //     'Log cabin blanketed in heavy white snow with tall snow covered pine trees in the background.',
  // },
];

const seedCard = () => Card.bulkCreate(cardData);

module.exports = seedCard;
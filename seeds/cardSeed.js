const Card = require('../models/card');

const cardData = [
  {
    setID: 'bw5-3',
    cardName: 'Venusaur',
    cardSubTypes: [
      'Stage 2'
    ],
    averageSellPrice: 12.56,
    imgURL: 'https://images.pokemontcg.io/bw5/3_hires.png',
  },
  {
    setID: 'xy2-12',
    cardName: 'Charizard',
    cardSubTypes: [
      "Basic",
      "EX"
    ],
    averageSellPrice: 19.3,
    imgURL: 'https://images.pokemontcg.io/xy2/12_hires.png',
  },
  {
    setID: 'sm12-38',
    cardName: 'Blastoise & Piplup-GX',
    cardSubTypes: [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    averageSellPrice: 13.62,
    imgURL: 'https://images.pokemontcg.io/sm12/38_hires.png',
  },
  {
    setID: 'swsh4-44',
    cardName: 'Pikachu VMAX',
    cardSubTypes: [
      "VMAX"
    ],
    averageSellPrice: 4.15,
    imgURL: 'https://images.pokemontcg.io/swsh4/44_hires.png',
  }
];

const seedCard = () => Card.bulkCreate(cardData);

module.exports = seedCard;
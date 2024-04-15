const Card = require('../models/card');

const card_data = [
  {
    set_id: 'bw5-3',
    card_name: 'Venusaur',
    card_subtypes: JSON.stringify(["Stage 2"]),
    average_sell_price: 12.56,
    img_url: 'https://images.pokemontcg.io/bw5/3_hires.png',
  },
  {
    set_id: 'xy2-12',
    card_name: 'Charizard',
    card_subtypes: JSON.stringify(["Basic", "EX"]),
    average_sell_price: 19.30,
    img_url: 'https://images.pokemontcg.io/xy2/12_hires.png',
  },
  {
    set_id: 'sm12-38',
    card_name: 'Blastoise & Piplup-GX',
    card_subtypes: JSON.stringify(["Basic", "TAG TEAM", "GX"]),
    average_sell_price: 13.62,
    img_url: 'https://images.pokemontcg.io/sm12/38_hires.png',
  },
  {
    set_id: 'swsh4-44',
    card_name: 'Pikachu VMAX',
    card_subtypes: JSON.stringify(["VMAX"]),
    average_sell_price: 4.15,
    img_url: 'https://images.pokemontcg.io/swsh4/44_hires.png',
  }
];

const seedCard = async () => {
  try {
      await Card.bulkCreate(card_data);
  } catch (error) {
      console.error('Error seeding cards:', error);
  }
};

module.exports = seedCard;
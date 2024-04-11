document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const pokeInput = document.getElementById('pokeInput');
    const pokecardContainer = document.getElementById('pokecard-container');

    // Compile Handlebars template
    const source = document.getElementById('card-template').innerHTML;
    const template = Handlebars.compile(source);

    //push data from search to div
    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const name = pokeInput.value.trim();
        if (name === '') {
            alert('Please enter a Pokémon name');
            return;
        }
        
        //temp fetch for api results until controller is operational
        try {
            const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}`);

            if (!response.ok) {
                alert('Card not found');
                return;
            }

            const { data } = await response.json();

            // Call displayCard to append the fetched card to the container
            displayCard(data[0]);

        } catch (error) {
            console.error(error);
            alert('Card not found');
            return;
        }
    });

    // Render template with data and insert into container
    function displayCard(card) {
        const cardData = {
            image: card.images.small || 'placeholder-image.jpg',
            name: card.name,
            rarity: card.rarity,
            price: card.cardmarket.prices.averageSellPrice || 'N/A',
            type: card.types[0] || 'N/A',
            weaknessValue: card.weaknesses[0].value || 'N/A',
            weaknessType: card.weaknesses[0].type || 'N/A'
        };

        const html = template(cardData);
        //ensures that each new card is added below the previous ones
        pokecardContainer.insertAdjacentHTML('beforeend', html);
    }
});

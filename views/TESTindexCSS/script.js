document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const pokeInput = document.getElementById('pokeInput');
    const pokecardContainer = document.getElementById('pokecard-container');

    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const name = pokeInput.value.trim(); // Trim whitespace from input

        if (name === '') {
            alert('Please enter a Pokémon name');
            return;
        }

        try {
            const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}`);

            if (!response.ok) {
                throw new Error('Card not found');
            }

            const { data } = await response.json();
            // Call displayCard to append the fetched card to the container
            displayCard(data[0]); // Assuming you want to display the first card from the response
        } catch (error) {
            console.error(error);
        }
    });

    function displayCard(card) {
        const cardElement = createCardElement(card);
        pokecardContainer.appendChild(cardElement);
    }

    function createCardElement(card) {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column', 'is-one-fifth');
    
        const img = document.createElement('img');
        
        // Check if the card object contains an images property with a small property
        if (card.images && card.images.small) {
            img.src = card.images.small;
        } else {
            console.error('Card data structure is not as expected:', card);
        }
    
        columnDiv.appendChild(img);
    
        return columnDiv;
    }
});

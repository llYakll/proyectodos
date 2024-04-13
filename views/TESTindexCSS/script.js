document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const pokeInput = document.getElementById('pokeInput');
    const pokecardContainer = document.getElementById('pokecard-container');

    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const name = pokeInput.value.trim();
        if (name === '') {
            alert('Please enter a Pokémon name');
            return;
        }

        try {
            const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}`);

            if (!response.ok) {
                alert('Card not found');
                return;
            }

            const { data } = await response.json();
            displayCards(data);
        } catch (error) {
            console.error(error);
        
        }
    });

    function displayCards(cards) {
        pokecardContainer.innerHTML = ''; 
        
        cards.forEach(card => {
            const cardElement = createCardElement(card);
            if (cardElement) {
                pokecardContainer.appendChild(cardElement);
            }
        });
    }

    function createCardElement(card) {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column', 'is-one-quarter');

        const img = document.createElement('img');
        if (card.images && card.images.small) {
            img.src = card.images.small;
        } else {
            console.error('Image not found for card:', card.name);
            return null;
        }

        columnDiv.appendChild(img);

        // Create additional elements for other information
        
        const nameElement = document.createElement('div');
        nameElement.textContent = `Name: ${card.name}`;
        
        const rarityElement = document.createElement('div');
        rarityElement.textContent = `Price: $${card.cardmarket.prices.averageSellPrice} USD`;
        
        const typeElement = document.createElement('div');
        typeElement.textContent = `SetID: ${card.id}`;
        
        const typeWeakness = document.createElement('div');
        const subtypes = card.subtypes || []; // handle if subtypes array is undefined
        typeWeakness.textContent = `Sub Types: ${subtypes.length > 0 ? subtypes[0] : 'Unknown'}`;
        
        const addToCollection = document.createElement('button');
        addToCollection.textContent = 'Add to Collection';

        // Append additional information elements to the columnDiv
        columnDiv.appendChild(nameElement);
        columnDiv.appendChild(rarityElement);
        columnDiv.appendChild(typeElement);
        columnDiv.appendChild(typeWeakness);

        return columnDiv;
    }
});

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
            // Call displayCard to append the fetched card to the container
            displayCard(data[0]);
        } catch (error) {
            console.error(error);
            alert('Card not found');
                return;
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
        if (card.images && card.images.small) {
            img.src = card.images.small;
        } else {
            // Set a placeholder image or display an error message
            img.src = 'placeholder-image.jpg'; // Example placeholder image
        }
    
        columnDiv.appendChild(img);
    
        // Create additional elements for other information
        const nameElement = document.createElement('div');
        nameElement.textContent = `Name: ${card.name}`;
    
        const rarityElement = document.createElement('div');
        rarityElement.textContent = `Price: $${card.cardmarket.prices.averageSellPrice} USD`;
    
        const typeElement = document.createElement('div');
        typeElement.textContent = `Typing: ${card.types[0]}`;

        const typeWeakness = document.createElement('div');
        typeWeakness.textContent = `${card.weaknesses[0].value} weak to ${card.weaknesses[0].type}`;
    
        // Append additional information elements to the columnDiv
        columnDiv.appendChild(nameElement);
        columnDiv.appendChild(rarityElement);
        columnDiv.appendChild(typeElement);
        columnDiv.appendChild(typeWeakness);
    
        return columnDiv;
    }
});

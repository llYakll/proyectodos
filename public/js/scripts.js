document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('pokeInput').value;

    try {
        const response = await fetch(`/api/cards?name=${name}`);

        if (!response.ok) {
            throw new Error('Card not found');
        }

        const cardData = await response.json();
        
        // Compile the Handlebars template for pokecard
        const pokecardTemplate = Handlebars.compile(document.getElementById('pokecard-template').innerHTML);
        // Pass the card data to the pokecard template
        const pokecardHtml = pokecardTemplate({ data: cardData });
        // Update the pokecard container with the generated HTML
        document.getElementById('pokecard-container').innerHTML = pokecardHtml;
    } catch (error) {
        console.error(error);
    }
});

// Get all checkboxes with class "rowCheckbox"
const rowCheckboxes = document.querySelectorAll('.rowCheckbox');

// Add event listener to each checkbox
rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Get the parent row of the checkbox
        const parentRow = this.closest('tr');
        
        // Get the image route from the data attribute of the parent row
        const imageRoute = parentRow.dataset.imageRoute;

        // Check if the checkbox is checked
        if (this.checked) {
            // Create a new sprite element
            const spriteElement = document.createElement('div');
            spriteElement.innerHTML = `<section><figure><div class="image is-128x128"><img src="${imageRoute}" alt="pokemon sprite"/></div><p class="is-size-5 has-text-danger has-text-centered">${parentRow.querySelector('td:nth-child(2)').textContent}</p></figure></section>`;

            // Append the sprite element to the container
            document.getElementById('pokemonSpritesContainer').appendChild(spriteElement);
        } else {
            // Remove the sprite element from the container if the checkbox is unchecked
            const spriteElement = document.querySelector(`div[data-image-route="${imageRoute}"]`);
            if (spriteElement) {
                spriteElement.remove();
            }
        }
    });
});
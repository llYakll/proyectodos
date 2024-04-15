const cardNameInput = document.getElementById('card_name');

cardNameInput.addEventListener('input', () => {
    const regex = /^[A-Za-z\s]+$/;
    const isValid = regex.test(cardNameInput.value);
    if (!isValid) {
        cardNameInput.setCustomValidity('Only letters and spaces are allowed.');
    } else {
        cardNameInput.setCustomValidity('');
    }
});
# User Story
As a Pokémon Trading Card Game (TCG) enthusiast, I want to use an application that allows me to search for specific Pokémon cards using the Poke TCG API. Additionally, I want the ability to save these cards to my collection when logged in, where I can view the average sale price per card and the total value of my collection.


## Features
### Registration and Authentication:
- As a new user, I want to register for an account using my username and password, so I can access personalized features.
- As a registered user, I want to be able to log in securely via my credentials to access my account.

### Pokémon Card Search:
- As a user, I want to search for Pokémon cards by their name and/or subtypes using the Poke TCG API.
- As a user, I expect accurate search results from the Poke TCG API, including card details.

### TCG Collection Management:
- As a user, I want to save Pokémon cards to my collection when logged in, allowing me to track the cards I own.
- As a registered user, I want my collection to display the average sale price per card and the total value of my collection based on current market data.
- As a user, I want to be able to view my collection and its details, including card names, images, sets, rarities, and pricing information.

### User Interface:
- As a user, I expect an intuitive and user-friendly interface that allows me to easily navigate and interact with the application.
- As a user, I want responsive design and layout that works seamlessly across different devices and screen sizes.
---

## User Journey
### Basic Features (Without Logging In):
- As a guest user, I can search for Pokémon cards by name and/or subtypes using the search feature.
- As a guest user, I can view basic card details such as name, subtype, and image.
- As a guest user, I cannot save cards to my collection or view collection-related features.

### Advanced Features (After Logging In):
- As a registered user, I can log in to my account to access personalized features.
- As a registered user, I can save Pokémon cards to my collection, allowing me to track the cards I own.
- As a registered user, I can view my collection, including detailed card information and pricing data.
- As a registered user, I can log out of my account to protect my privacy and secure access to my collection.
---

## Acceptance Criteria
- The registration and login forms should include proper validation for user inputs, such as unique usernames and secure passwords.
- The Pokémon card search feature should return accurate results from the Poke TCG API based on user input.
- The collection management feature should accurately calculate and display the average sale price per card and the total value of the user's collection.
- The user interface should be intuitive, responsive, and visually appealing, providing a seamless user experience across different devices.
- User authentication and session management should be secure and robust, protecting user data and privacy.
- The application should adhere to accessibility standards to ensure inclusivity and usability for all users.
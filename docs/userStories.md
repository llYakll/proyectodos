# User Story
As a Pokémon enthusiast, I want a Pokémon app that provides comprehensive features for exploring, collecting, and strategizing within my Pokémon experience. I want to search for a Pokémon by name to view their stats and trading card images, so I can easily access information about my favorite Pokémon.


## Features
### Registration and Authentication:
- As a new user, I want to register for an account using my username and password, so I can access personalized features.
- As a registered user, I want to be able to log in securely via my credentials to access my account.

### Pokémon Search:
- As a user, I want to search for a Pokémon by name, so I can view its name, type, stats, abilities, and other relevant information.
- As a user, I want to see additional details about the Pokémon, such as their evolutionary line, when I search for them.

### Evolution Chart:
- As a user, I want to be able to view an evolutionary chart for the searched Pokémon which includes all relevant evolutionary stages.
- As a user, I expect the evolution chart to handle special cases like Eevee's evolution line, which has multiple branching paths based on certain evolutionary triggers.

### Battle Team Builder:
- As a user, I want to build and analyze a team of Pokémon to strategize for upcoming battles.
- As a user, I want the app to help me identify the strengths and weaknesses of my current team's composition.
    #### Extra:
    - As a user, I want the team builder to suggest Pokémon (or types) that I should add to cover my weaknesses and exploit an opponent's weaknesses based on team composition.

### TCG Collection Management:
- As a user, I want to see the current average sale price of a given Pokémon card.
- As a registered user, I want to see the current value of my entire collection.
- As a registered user, I want to be able to manage my collection, including adding, removing, and updating card details.

    #### Extra:
    - As an user, I want the app to provide up-to-date market data and trends for trading cards, so that I can make informed decisions about buying and selling cards.
---

## User Journey
### Basic Features (Without Logging In):
- As a guest user, I can search for Pokémon by name and view their details.
- As a guest user, I can use the team builder to experiment with team compositions. I can view their strengths and weaknesses, but I cannot save them.
- As a guest user, I can search average price of a given card.

### Advanced Features (After Logging In):
- As a registered user, I gain access to additional features such as saving Pokémon cards to my collection.
- As a registered user, I can save multiple team compositions in the team builder.
    #### Extra:
    - As a registered user, I can receive suggestions for how to improve my team compositions.
    - As a registered user, when I view an evolution chart for a Pokémon, I can track their evolutionary progress within my collection.
---

## Acceptance Criteria
- The registration and login forms should be intuitive and secure, with proper validation for user inputs.
- The Pokémon search should return accurate results based on the user's input.
- The evolution chart should be comprehensive and easy to navigate, even for complex evolutionary lines like Eevee's.
- The collection management feature should accurately calculate and display the total collection price as well as the individual price of each card.
- The team builder should provide meaningful suggestions based on the user's existing team composition.
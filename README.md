# SunnySideUp

## Description

This code allows a user to search for a music artist, generate a random album by that artist, display information about the artist from Wikipedia, and save a history of searched artists and albums.

The key features are:

- An input field to search for an artist.
- A button to trigger the search and get a random album.
- API calls to TheAudioDB for album data and Wikipedia for artist info.
- Saving searched albums and artist-wiki links to localStorage.
- Displaying the album, artist info, and search history on the page.
- Pagination to move between search result pages.

## Usage

To search for an artist:

- Type the name of the artist into the input field labeled "Artist Name"
- Click the "Search" button

This will trigger a search to retrieve a random album by that artist from TheAudioDB API.

The random album name will display below the search button.

It will also call the Wikipedia API to get information about the artist and display a link to the Wikipedia page under "Artist Info".

To view search history:

- Previously searched artists and albums will be displayed under "Search History" as clickable buttons.
- Click one of those buttons to search for that item again.

To navigate between pages:

- After an initial search, the results will display on a second page.
- Click the back button in the browser to return to the initial search page.
- User can also search for a new artist on the second page.

## Screenshots

The following images demonstrate the web application's appearance and functionality:

![Alt text](./assets/images/mockup-1.png)
![Alt text](./assets/images/mockup-2.png)
![Alt text](./assets/images/mockup-3.png)

## Deployment Link

https://harmonyburke.github.io/beatdeets/

## Credits

This project was created for educational purposes as part of the KU Coding Bootcamp curriculum.

The following resources were utilized:

- KU Coding Bootcamp Spot - Provided project requirements and guidelines.
- W3Schools - Referenced for general HTML, CSS, JavaScript documentation.
- MDN Web Docs - Referenced for general HTML, CSS, JavaScript documentation.
- Stack Overflow - Referenced for general HTML, CSS, JavaScript documentation.

## License

Please refer to the LICENSE in the repository.
$(document).ready(function () {
  var artistSearch = $("#artists-input");
  var searchBtn = $("#search-button");
  var randomDiv = $("#random-album");
  var wikiBioElement = document.getElementById("wikibio"); // Reference to the wiki bio element
  var wikiLinks = []; // This will hold the single latest wiki link for the current artist

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function getAlbum(artistName) {
    console.log(artistName);
    var artistIdApi = `https://theaudiodb.com/api/v1/json/2/discography.php?s=` + artistName.toLowerCase();
    // the API to find an album by the artist name, toLowerCase changes any capitalization to lowercase letters

    fetch(artistIdApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        var albums = data.album;
        console.log(albums);
        // data.album is the array with the albums by the artist that is searched

        if (albums && albums.length > 0) {
          // if the albums.length index is greater than 0
          var randomIndex = Math.floor(Math.random() * albums.length);
          var randomAlbum = albums[randomIndex].strAlbum;
          console.log('Random Album:', randomAlbum);
          randomDiv.empty().append(randomAlbum);
          // this randomized the album chosen from the albums array
          saveAlbum(randomAlbum, artistName);
          // this saves the randomly chosen album and artist name to local storage
        } else {
          console.log('No albums found for the artist');
          // this would run if the search doesn't return anything
        }
      })
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });
  }

  function saveAlbum(randomAlbum, artistName) {
    var albumHistory = JSON.parse(localStorage.getItem("savedAlbum")) || [];
    // saves the album to local storage as an array
    var combinedName = artistName + " - " + randomAlbum;
    // combined the artist name and random album as a single string
    console.log(combinedName);

    albumHistory.unshift(combinedName);
    albumHistory = albumHistory.slice(0, 4);
    localStorage.setItem("savedAlbum", JSON.stringify(albumHistory));
    updateAlbumHistoryDisplay(albumHistory);
  }

  function updateAlbumHistoryDisplay(albumHistory) {
    var lastAlbumDiv = document.getElementById("previous-button");
    lastAlbumDiv.innerHTML = "";

    albumHistory.forEach(function (artistAlbum, i) {
      var prevAlbum = document.createElement("button");
      prevAlbum.textContent = artistAlbum;
      prevAlbum.setAttribute("id", "albumBtn" + i);
      lastAlbumDiv.appendChild(prevAlbum);

      prevAlbum.addEventListener("click", function () {
        var [clickedArtist, clickedAlbum] = artistAlbum.split(" - ");
        displaySearchResults(clickedArtist, clickedAlbum);
      });
    });
  }

  function performSearch(artistInput) {
    var searchQuery = artistInput + ' musician';
    var apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&utf8=&format=json&origin=*`;

    fetch(apiUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        var formattedArtistInput = capitalizeFirstLetter(artistInput);
        var wikiLinkId = data.query.search[0].pageid;
        var wikiLink = `https://en.wikipedia.org/?curid=${wikiLinkId}`;

        displaySearchResults(formattedArtistInput, wikiLink);
        storeWikiLink(wikiLink);
      })
      .catch(function (error) {
        console.error("Fetch error:", error);
      });
  }

  function displaySearchResults(formattedArtistInput, wikiLink) {
    if (window.location.pathname.includes('page2.html') && wikiBioElement) {
      // Update the "About the Artist" link to remove the artist's name
      wikiBioElement.innerHTML = `<a href='${wikiLink}' target='_blank'>About the Artist</a>`;
    }
  }
  

  function storeWikiLink(wikiLink) {
    // Store only the latest wiki link
    wikiLinks[0] = wikiLink;
    localStorage.setItem('wikiLinks', JSON.stringify(wikiLinks));
  }

  function init() {
    // Load the stored "About the Artist" link if available
    var storedWikiLink = JSON.parse(localStorage.getItem('wikiLinks'));
    if (storedWikiLink && storedWikiLink.length > 0) {
      wikiLinks = storedWikiLink;
      wikiBioElement.innerHTML = `<a href='${wikiLinks[0]}' target='_blank'>About the Artist</a>`;
    }
  }

  function handleSearch(artistName) {
    if (window.location.pathname.includes('page2.html')) {
      getAlbum(artistName);
      performSearch(artistName);
      window.history.pushState({}, '', `page2.html?artist=${encodeURIComponent(artistName)}`);
    } else {
      window.location.href = `page2.html?artist=${encodeURIComponent(artistName)}`;
    }
  }

  searchBtn.on("click", function () {
    var artistName = artistSearch.val();
    if (artistName) {
      handleSearch(artistName);
    }
  });

  if (window.location.pathname.includes('page2.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const artistInput = urlParams.get("artist");
    if (artistInput) {
      handleSearch(artistInput);
    }
    init(); // Initialize the page with stored data
  }
});

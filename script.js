

$(document).ready(function () {

  var artistSearch = $("#artists-input")
  var searchBtn = $("#search-button")
  var randomDiv = $("#random-album")
  

  searchBtn.on("click", function () {
    // event.preventDefault()
    console.log("hello")
    var artistName = artistSearch.val()
    getAlbum(artistName)

    window.location.href = `page2.html?artist=${encodeURIComponent(artistName)}`;
    // window.location.href=`page2.html`
  })

  function getAlbum(artistName) {

    console.log(artistName)

    var artistIdApi = `http://theaudiodb.com/api/v1/json/2/discography.php?s=` + artistName.toLowerCase()

    fetch(artistIdApi)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)

        var albums = data.album;
        console.log(albums)

        // Check if there are albums in the response
        if (albums && albums.length > 0) {
          // Generate a random index within the valid range
          var randomIndex = Math.floor(Math.random() * albums.length);

          // Get the random album
          var randomAlbum = albums[randomIndex].strAlbum;
  
          console.log('Random Album:', randomAlbum);
          // randomDiv.textContent=randomAlbum
          randomDiv.empty().append(randomAlbum);


          saveAlbum(randomAlbum, artistName)
  


        } else {

          console.log('No albums found for the artist');
        }


      })
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });
  
  
  
  
  
  }







const urlParams = new URLSearchParams(window.location.search);
const artistInput = urlParams.get("artist");
if (artistInput) {
  // document.getElementById("artists-input").value = artistInput;
  console.log(artistInput)
  getAlbum(artistInput)
  
  performSearch(artistInput);
}
document
  .getElementById("search-button")





  var wikiLinkListEl = document.querySelector('.previous');

  // Create array of wikiLinks.
  var wikiLinks = [];




function saveAlbum(randomAlbum, artistName) {
  var albumHistory = JSON.parse(localStorage.getItem("savedAlbum")) || [];

  var combinedName = artistName + " - " + randomAlbum;
  console.log(combinedName)

  if (albumHistory.indexOf(combinedName) === -1) {
    albumHistory.push(combinedName);
    localStorage.setItem("savedAlbum", JSON.stringify(albumHistory));

    var lastAlbumDiv = document.getElementById("previous-button");
    lastAlbumDiv.innerHTML = "";

    for (var i = 0; i < albumHistory.length; i++) {
      var artistAlbum = albumHistory[i];
      console.log(artistAlbum);

      var prevAlbum = document.createElement("button");
      prevAlbum.textContent = artistAlbum;
      prevAlbum.setAttribute("id", "albumBtn" + i); // Unique IDs for each button
      lastAlbumDiv.appendChild(prevAlbum);

      prevAlbum.addEventListener("click", function(event) {
        var albumClick = event.target.textContent; // Get the text content of the button
        var [clickedArtist, clickedAlbum] = albumClick.split(" - ");
        displaySearchResults(clickedArtist, clickedAlbum);

      });
    }
  }
}





  function capitalizeFirstLetter(artistInput) {
    return artistInput.toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase();

    })
  }
  function performSearch(artistInput) {

    var searchQuery = artistInput + ' musician';
    var apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&utf8=&format=json&origin=*`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        var formattedArtistInput = capitalizeFirstLetter(artistInput);
        console.log(formattedArtistInput);

        // Get wikiLink for artist input.
        var wikiLinkId = data.query.search[0].pageid;
        var wikiLink = `https://en.wikipedia.org/?curid=${wikiLinkId}`;
        console.log(wikiLink);

        displaySearchResults(formattedArtistInput, wikiLink);

        // Set the wikiLink to local storage.
        storeWikiLink(wikiLink);

        // Display wikiLink history.
        renderWikiLinkHistory(formattedArtistInput, wikiLink);

      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

  }



  function displaySearchResults(formattedArtistInput, wikiLink) {

    var wikiBioElement = document.getElementById("wikibio");
    wikiBioElement.innerHTML = "";

    wikiBioElement.innerHTML = `<strong>${formattedArtistInput}</strong>: <a href='${wikiLink}' target='_blank'>About the Artist</a>`;
  }


  // Stringify and set key in localStorage to wikiLinks array.
  function storeWikiLink(wikiLink) {

    if (!wikiLinks.includes(wikiLink)) {

      // Push the wikiLink to the array only if it's not already in the array.
      wikiLinks.push(wikiLink);

      // Stringify and set key in localStorage to wikiLinks array.
      localStorage.setItem('wikiLinks', JSON.stringify(wikiLinks));
    }

  }


  // Renders links in a history list as buttons.
  function renderWikiLinkHistory(formattedArtistInput) {
    wikiLinkListEl.innerHTML = '';

    for (var i = 0; i < wikiLinks.length; i++) {
      var wikiLink = wikiLinks[i];

      // Testing...
      console.log(wikiLink);
      console.log(i);

      var prevWikiLinkBtn = document.createElement("button");
      var link = document.createElement("a");
      link.href = wikiLink;
      link.target = "_blank";
      link.textContent = 'About the Artist';

      prevWikiLinkBtn.appendChild(link);
      prevWikiLinkBtn.setAttribute('data-index', i);
      wikiLinkListEl.appendChild(prevWikiLinkBtn);
    }

    wikiLinkListEl.addEventListener('click', function (event) {
      var element = event.target;
  
      // Checks if element is a button
      if (element.matches("button") === true) {
  
        // Get its data-index value.
        var index = element.parentElement.getAttribute("data-index");
        wikiLinks.splice(index, 1);
  
        // Store updated todos in localStorage, re-render the list
        storeWikiLink();
        renderWikiLinkHistory();
      }
  
    });
  }


  // Add click event to todoList element


  // This function is being called below and will run when the page loads.
  function init() {

    // Get stored wikiLinks from localStorage.
    var storedWikiLinks = JSON.parse(localStorage.getItem('wikiLinks'));

    // If wikiLinks were retrieved from localStorage, update the wikiLinks array to it.
    if (storedWikiLinks !== null) {

      wikiLinks = storedWikiLinks;
      renderWikiLinkHistory();
    }

  }
  
      init();


})

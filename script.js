

var artistSearch = $("#artists-input")
var searchBtn = $("#search-button")
var randomDiv = $("#random-album")




document.addEventListener("DOMContentLoaded", function () {

  searchBtn.on("click", function () {
    // event.preventDefault()
    var artistName = artistSearch.val()
      window.location.href = `page2.html?artist=${encodeURIComponent(artistName)}`;
      // window.location.href=`page2.html`
      getAlbum(artistName)
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
        if (albums.length > 0) {
          // Generate a random index within the valid range
          var randomIndex = Math.floor(Math.random() * albums.length);

          // Get the random album
          var randomAlbum = albums[randomIndex].strAlbum;

          console.log('Random Album:', randomAlbum);
          randomDiv.textContent=randomAlbum
          randomDiv.append(randomAlbum)

        } else {

          console.log('No albums found for the artist');
        }


      })





  }
  
  
  
  
 
    const urlParams = new URLSearchParams(window.location.search);
    const artistInput = urlParams.get("artist");
    if (artistInput) {
      // document.getElementById("artists-input").value = artistInput;
      performSearch(artistInput);
    }
    document
      .getElementById("search-button")
     
  
  
  
  function performSearch(artistInput) {
    const searchQuery = `${artistInput} + _(musician)`;
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=parse&page=${searchQuery}&format=json&origin=*`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        displaySearchResults(data, artistInput);
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }



  function displaySearchResults(data, artistInput) {
    const wikiBioElement = document.getElementById("wikibio");
    wikiBioElement.innerHTML = "";
    const searchTerm = artistInput;
    const wikiUrl = `https://en.wikipedia.org/wiki/${searchTerm.replace(
      / /g,
      "_"
    )}`;
    wikiBioElement.innerHTML = `<strong>${searchTerm}</strong>: <a href="${wikiUrl}" target="_blank">Wikipedia Link</a>`;
  }


$("#saved-albums").each(function () {
  // looks for current album and saves it 
  var albumName = localStorage.getItem(saveAlbum);
  // gets the album saved to local storage
  var saveAlbum = albumName.val()
  // this pulls the value from the entered information
  
  if (albumName) {
    $(this).find(saveAlbum).val(albumName)
    // finds the album name and saves it to the html class/id
  }

})
$("#artist-info").each(function () {
  var artistWiki = $("#artist-info").val()
  // this pulls the value entered into the input field 
  var saveWiki = localStorage.getItem(artistWiki)
  // this gets the information from the wiki that has been set to local storage
  if (saveWiki) {
    $(this).find(saveWiki).val(artistWiki)
    // find the info and sets it
  }
  
  
})
})

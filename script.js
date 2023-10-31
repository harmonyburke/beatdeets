var artist = `http://theaudiodb.com/api/v1/json/2/album.php?i=112024`;
console.log(artist);

fetch(artist)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    return data;
  });

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const artistInput = urlParams.get("artist");

  if (artistInput) {
    // document.getElementById("artists-input").value = artistInput;

    performSearch(artistInput);
  }

  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      const artistInput = document.getElementById("artists-input").value;

      window.location.href = `page2.html?artist=${encodeURIComponent(
        artistInput
      )}`;
    });

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
});

$("#saved-albums").each(function () {
  // looks for current album and saves it
  var albumName = localStorage.getItem(saveAlbum);
  // gets the album saved to local storage
  var saveAlbum = albumName.val();
  // this pulls the value from the entered information

  if (albumName) {
    $(this).find(saveAlbum).val(albumName);
    // finds the album name and saves it to the html class/id
  }
});
$("#artist-info").each(function () {
  var artistWiki = $("#artist-info").val();
  // this pulls the value entered into the input field
  var saveWiki = localStorage.getItem(artistWiki);
  // this gets the information from the wiki that has been set to local storage
  if (saveWiki) {
    $(this).find(saveWiki).val(artistWiki);
    // find the info and sets it
  }
});

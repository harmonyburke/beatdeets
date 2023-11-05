

$(document).ready(function () {

  var artistSearch = $("#artists-input")
  var searchBtn = $("#search-button")
  var randomDiv = $("#random-album")
  var wikiBioElement = document.getElementById("wikibio");
  
  var wikiLinkListEl = $(".wikiresults");


  searchBtn.on("click", function () {
    var artistName = artistSearch.val();
    var randomAlbum = getAlbum(artistName);

    if (randomAlbum) {
      // Get random album first and then call performSearch
      performSearch(artistName, randomAlbum);
      
    }

    window.location.href = `page2.html?artist=${encodeURIComponent(artistName)}`;
  });

 

  function getAlbum(artistName) {

    console.log(artistName)

    var artistIdApi = `https://theaudiodb.com/api/v1/json/2/discography.php?s=` + artistName.toLowerCase()

    fetch(artistIdApi)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)

        var albums = data.album;
        console.log(albums)

        if (albums && albums.length > 0) {
          var randomIndex = Math.floor(Math.random() * albums.length);
          var randomAlbum = albums[randomIndex].strAlbum;
      
          // Pass randomAlbum to saveAlbum function
          saveAlbum(artistName, randomAlbum, wikiLinks);
      
          console.log('Random Album:', randomAlbum);
          randomDiv.empty().append(randomAlbum);


          // saveAlbum(randomAlbum, artistName, wikiLinks)



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






  // Create array of wikiLinks.
  var wikiLinks = [];









  function capitalizeFirstLetter(artistInput) {
    return artistInput.toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase();

    })
  }
  // function performSearch(artistInput) {

  //   var searchQuery = artistInput + ' musician';
  //   var apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&utf8=&format=json&origin=*`;

  //   fetch(apiUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);

  //       var formattedArtistInput = capitalizeFirstLetter(artistInput);
  //       console.log(formattedArtistInput);

  //       // Get wikiLink for artist input.
  //       var wikiLinkId = data.query.search[0].pageid;
  //       var wikiLink = `https://en.wikipedia.org/?curid=${wikiLinkId}`;
  //       console.log(wikiLink);

  //       displaySearchResults(formattedArtistInput, wikiLink);

  //       // Set the wikiLink to local storage.
  //       storeWikiLink(wikiLink);


  //     })
  //     .catch((error) => {
  //       console.error("Fetch error:", error);
  //     });

  // }
  
  function saveAlbum(artistName, randomAlbum, wikiLink) {
  var albumHistory = JSON.parse(localStorage.getItem("savedAlbum")) || [];

  var entry = {
    artist: artistName,
    album: randomAlbum,
    wikiLink: wikiLink,
  };
  console.log(randomAlbum)
  console.log("Entry",entry)

  if (!albumHistory.some((entryItem) => entryItem.artist === artistName && entryItem.album === randomAlbum)) {
    albumHistory.push(entry);
    localStorage.setItem("savedAlbum", JSON.stringify(albumHistory));

    var lastAlbumDiv = document.getElementById("previous-button");
    lastAlbumDiv.innerHTML = "";

    for (var i = 0; i < albumHistory.length; i++) {
      var artistAlbumEntry = albumHistory[i];
      var prevAlbum = document.createElement("button");
      prevAlbum.textContent = artistAlbumEntry.artist + " - " + artistAlbumEntry.album;
      prevAlbum.setAttribute("id", "albumBtn" + i);
      lastAlbumDiv.appendChild(prevAlbum);

      prevAlbum.addEventListener("click", function (event) {
        
        var albumClick = event.target.textContent;
        var clickedEntry = albumHistory.find((entryItem) => artistAlbumEntry.artist + " - " + artistAlbumEntry.album === albumClick);
        displaySearchResults(clickedEntry.artist, clickedEntry.album, clickedEntry.wikiLink);
      });
    }
  }
}

  
  
  
  function performSearch(artistInput, randomAlbum) {
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
        // var formattedArtistInput = capitalizeFirstLetter(artistInput);
  
        // Get wikiLink for artist input.
        var wikiLinkId = data.query.search[0].pageid;
        var wikiLink = `https://en.wikipedia.org/?curid=${wikiLinkId}`;
        
        // Pass the dynamically generated wikiLink to the saveAlbum function
        saveAlbum(artistInput, randomAlbum, wikiLink);
  
        // Rest of your code...
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
  // function storeWikiLink(wikiLink) {
  //   // localStorage.setItem("wikiLinks", JSON.stringify(wikiLink));
  //   // console.log("Stored link:", wikiLink);
  


  //   if (!wikiLinks.includes(wikiLink)) {

  //     // Push the wikiLink to the array only if it's not already in the array.
  //     wikiLinks.push(wikiLink);

  //     // Stringify and set key in localStorage to wikiLinks array.
  //     localStorage.setItem('wikiLinks', JSON.stringify(wikiLinks));
  //   }

  // }

  // function saveAlbum(randomAlbum, artistName, wikiLinks) {
  //   var albumHistory = JSON.parse(localStorage.getItem("savedAlbum")) || [];

  //   var combinedData = artistName + " - " + randomAlbum + " - " + wikiLinks;
  //   console.log(combinedData)

  //   if (albumHistory.indexOf(combinedData) === -1) {
  //     albumHistory.push(combinedData);
  //     localStorage.setItem("savedAlbum", JSON.stringify(albumHistory));
      

  //     var lastAlbumDiv = document.getElementById("previous-button");
  //     lastAlbumDiv.innerHTML = "";

  //     for (var i = 0; i < albumHistory.length; i++) {
  //       var artistAlbum = albumHistory[i];
  //       // console.log(artistAlbum);

  //       var prevAlbum = document.createElement("button");
  //       prevAlbum.textContent = artistAlbum;
  //       prevAlbum.setAttribute("id", "albumBtn" + i); // Unique IDs for each button
  //       lastAlbumDiv.appendChild(prevAlbum);

  //       prevAlbum.addEventListener("click", function (event) {
  //         var albumClick = event.target.textContent; // Get the text content of the button
  //         var [clickedArtist, clickedAlbum] = albumClick.split(" - ");
  //         var getUrl=JSON.parse(localStorage.getItem(wikiLinks))
  //         console.log("check URL in saveAlbum:", getUrl)
  //         displaySearchResults(clickedArtist, clickedAlbum, getUrl );

  //       });
  //     }
  //   }
    
  //     // Stringify and set key in localStorage to wikiLinks array.
  

  //   // saveAllInfo()
  
  // }







//   var storedInfo=JSON.parse(localStorage.getItem("savedAlbum"))
//   var urlInfo=JSON.parse(localStorage.getItem("wikiLinks"))
//   console.log('all my stored info',storedInfo + " :" + urlInfo)
//   varfunction saveAllInfo(){
//  combinedData=storedInfo+urlInfo
//   localStorage.setItem("artistData", JSON.stringify(combinedData))
//   var lastAlbumDiv = document.getElementById("previous-button");

//   lastAlbumDiv.append(combinedData)
// }
  // Renders links in a history list as buttons.
  // function renderWikiLinkHistory(formattedArtistInput) {
  //   wikiLinkListEl.innerHTML = '';
  //   var storedLink= JSON.parse(localStorage.getItem("wikiLink"));

  //   if(storedLink===null){
  //     storedLink=[]
  //     // this will run if there is no information saved yet
  //   }
  //   if (storedLink.indexOf(formattedArtistInput) === -1){
  //     storedLink.push(formattedArtistInput)
  //     localStorage.setItem("wikiLink", JSON.stringify(storedLink))
  //   }
  //   for (var i = 0; i < wikiLinks.length; i++) {
  //     var wikiLink = wikiLinks[i];

  //     // Testing...
  //     console.log(wikiLink);
  //     console.log(i);

  //     var prevWikiLinkBtn = document.createElement("button");
  //     var link = document.createElement("a");
  //     link.href = wikiLink;
  //     link.target = "_blank";
  //     link.textContent = 'About the Artist';

  //     prevWikiLinkBtn.append(link);
  //     prevWikiLinkBtn.setAttribute('data-index', i);
  //     wikiLinkListEl.append(prevWikiLinkBtn);
  //   }
  // Initialize an array to store artist-related Wikipedia links
// Initialize an empty array to store artist-related Wikipedia links
// Initialize an array to store artist-related Wikipedia links
// Initialize an empty array to store artist-related Wikipedia links

// Function to retrieve and update wikiLinks from localStorage
// function updateWikiLinks() {
//   var storedLinks = JSON.parse(localStorage.getItem("wikiLinks"));
//   if (Array.isArray(storedLinks)) {
//     wikiLinks = storedLinks;
//   }
// }


// var wikiLinks = [];

// // Retrieve the stored data from localStorage and update wikiLinks
// function renderWikiLinkHistory(formattedArtistInput, wikiLink) {
//   if (!wikiLinks.includes(wikiLink)) {
//     wikiLinks.push(wikiLink);
//     localStorage.setItem("wikiLinks", JSON.stringify(wikiLinks));
//   }

//   wikiLinkListEl.html(''); // Clear the content

//   for (var i = 0; i < wikiLinks.length; i++) {
//     var artistWikiLink = wikiLinks[i];

//     var prevWikiLinkBtn = document.createElement("button");
//     var link = document.createElement("a");
//     link.href = artistWikiLink;
//     link.target = "_blank";
//     link.textContent = 'About the Artist';

//     prevWikiLinkBtn.appendChild(link);
//     prevWikiLinkBtn.setAttribute('data-index');
//     wikiLinkListEl.append(prevWikiLinkBtn);
//   }
// }





    // wikiLinkListEl.addEventListener('click', function (event) {
    //   var element = event.target;

    //   // Checks if element is a button
    //   if (element.matches("button") === true) {

    //     // Get its data-index value.
    //     var index = element.parentElement.getAttribute("data-index");
    //     wikiLinks.splice(index, 1);

    //     // Store updated todos in localStorage, re-render the list
    //     storeWikiLink();
    //     renderWikiLinkHistory();
    //   }

    // });
  // }


  // Add click event to todoList element


  // This function is being called below and will run when the page loads.
  // function init() {
  //   updateWikiLinks();
  //   renderWikiLinkHistory();
  // }
  
  // init();


})

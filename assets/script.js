function getApi() {

    var requestUrl = 'http://theaudiodb.com/api/v1/json/2/album.php?i=112024';

    fetch(requestUrl)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
        })

}

console.log(getApi());

var artist=`http://theaudiodb.com/api/v1/json/2/album.php?i=112024`
console.log(artist)
fetch (artist)
.then(function(response){
    return response.json();
    
})
.then(function(data){
    console.log(data)
    return data;
})


localStorage.setItem(artist, album)
// this should go within the search event listener so that it saves the information on page load

// saves the information in the given class/id to be shown from local storage
$(".saved-albums").each(function(){
    // looks for current album and saves it 
    var albumName=localStorage.getItem(saveAlbum);
    // gets the album saved to local storage
    var saveAlbum=albumName.text(empty)

    if (albumName){
        $(this).find(saveAlbum).val(albumName)
        // finds the album name and saves it to the html class/id
    }
})
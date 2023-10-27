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


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
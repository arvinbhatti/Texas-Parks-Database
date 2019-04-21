
var parkCode = document.getElementById("parkCode").innerHTML;

let url2=`/getImages?parkCode=${parkCode}`;
        fetch(url2).then(response => response.json())
        .then( (result) => {
            console.log('success:', result[0].images[0].url);
            var imageURL = result[0].images[0].url;
           
          document.getElementById("pic").src = imageURL;
          
            
        })
        .catch(error => console.log('error:', error));
let url="/allParks";
        fetch(url).then(response => response.json())
        .then( (result) => {
            console.log('success:', result)
            
            var cardContainer = document.getElementById('cardColumn');
            for(var i=0; i<result.length; i++){
            	let card = document.createElement('div');
    		card.className = 'card shadow cursor-pointer';

		    let cardBody = document.createElement('div');
		    cardBody.className = 'card-body';

		    let image = document.createElement('img');
		    if(result[i].images == undefined){
		    	image.src= "https://www.alterenterprise.com/wp-content/uploads/2014/02/Image-not-available_1.jpg";
		    }else if(result[i].images[0] == undefined){
		    	image.src= "https://www.alterenterprise.com/wp-content/uploads/2014/02/Image-not-available_1.jpg";
		    }else{
		    	 image.src = result[i].images[0].url;
		    }
		   
		    image.className = 'card-img-top';

		   let body = document.createElement('div');
		    
		    body.className = 'card-body';
		    let cardText = document.createElement('h5');
		    cardText.className = 'card-text';
		    cardText.innerHTML = `<a href='/parks?name=${result[i].fullName}'> ${result[i].fullName}</a>`;
		    body.appendChild(cardText);

		    card.insertBefore(image, card.children[0]);
		    //cardBody.appendChild(image);
		    cardBody.appendChild(body);
		    card.appendChild(cardBody);
		    cardContainer.appendChild(card);
            }
             
          
        })
        .catch(error => console.log('error:', error));
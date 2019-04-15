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
		    image.src = result[i].images[0].url;
		    image.className = 'card-img-top';

		   let body = document.createElement('div');
		    
		    body.className = 'card-body';
		    let cardText = document.createElement('h5');
		    cardText.className = 'card-text';
		    cardText.innerHTML = `<a href='/parks?name=${result[i].fullName}'> ${result[i].fullName}</a>`;
		    body.appendChild(cardText);


		    cardBody.appendChild(image);
		    cardBody.appendChild(body);
		    card.appendChild(cardBody);
		    cardContainer.appendChild(card);
            }
             
          
        })
        .catch(error => console.log('error:', error));
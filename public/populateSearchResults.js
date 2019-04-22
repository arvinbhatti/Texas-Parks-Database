var this_js_script = $('script[src*=populateSearchResults]'); // or better regexp to get the file name..

var results = this_js_script.attr('data-var1');   
var type = this_js_script.attr('data-var2');


var result = JSON.parse(results);
//console.log(result[0].name);
if(type=='Park'){
	populateParkResults(result);
}else if(type=='Campground'){
	populateCampgroundResults(result);
}else{
	populateCenterResults(result);
}


function populateParkResults(array){
	 var cardContainer = document.getElementById('cardColumn');
            for(var i=0; i<result.length; i++){
            	console.log(result[i].fullName);
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


			    card.insertBefore(image, card.children[0]);
			    cardBody.appendChild(body);
			    card.appendChild(cardBody);
			    cardContainer.appendChild(card);
            }

	}


function populateCampgroundResults(array){
	var cardContainer = document.getElementById('cardColumn');
	for(var i=0; i<result.length; i++){
		//console.log(result[i].name);
		let card = document.createElement('div');
	card.className = 'card shadow cursor-pointer';

	let cardBody = document.createElement('div');
	cardBody.className = 'card-body';

	var parkCode = result[i].parkCode;
	let url3=`/getImages?parkCode=${parkCode}`;
	fetch(url3).then(response => response.json())
	.then( (result) => {
		//console.log('sucess:', result[0].images[0]);
		let image = document.createElement('img');
	    
	    if(result[0].images != undefined){
	    	if(result[0].images[0] != undefined){
	    	image.src = result[0].images[0].url;
	    	}else{
	    	image.src="https://twu.edu/media/images/communication-sciences/Photo-Unavailbale-300-Square.jpg";
	    	}
	    }else{
	    	image.src="https://twu.edu/media/images/communication-sciences/Photo-Unavailbale-300-Square.jpg";
	    }
	    
	    image.className = 'card-img-top';
	    
	    card.insertBefore(image, card.children[0]);

	    let park = document.createElement('p');
	    park.className = 'card-text';
	    park.innerHTML= 'Park: ' + result[0].fullName;
	    park.style.margin='5px';
	    cardBody.insertBefore(park, cardBody.children[2]);

	}).catch(error => console.log('error:', error));


	let body = document.createElement('div');


	body.className = 'card-body';
	let cardText = document.createElement('h5');
	cardText.className = 'card-title';
	cardText.innerHTML = `<a href='/campgrounds?name=${result[i].name}'> ${result[i].name}</a>`;

	body.appendChild(cardText);



	cardBody.appendChild(body)
	card.appendChild(cardBody);
	cardContainer.appendChild(card);


	}
}



function populateCenterResults(array){
	var cardContainer = document.getElementById('cardColumn');
	for(var i=0; i<result.length; i++){
		//console.log(result[i].name);
		let card = document.createElement('div');
	card.className = 'card shadow cursor-pointer';

	let cardBody = document.createElement('div');
	cardBody.className = 'card-body';

	var parkCode = result[i].parkCode;
	let url3=`/getImages?parkCode=${parkCode}`;
	fetch(url3).then(response => response.json())
	.then( (result) => {
		//console.log('sucess:', result[0].images[0]);
		let image = document.createElement('img');
	    
	    if(result[0].images != undefined){
	    	if(result[0].images[0] != undefined){
	    	image.src = result[0].images[0].url;
	    	}else{
	    	image.src="https://twu.edu/media/images/communication-sciences/Photo-Unavailbale-300-Square.jpg";
	    	}
	    }else{
	    	image.src="https://twu.edu/media/images/communication-sciences/Photo-Unavailbale-300-Square.jpg";
	    }
	    
	    image.className = 'card-img-top';
	    
	    card.insertBefore(image, card.children[0]);

	    let park = document.createElement('p');
	    park.className = 'card-text';
	    park.innerHTML= 'Park: ' + result[0].fullName;
	    park.style.margin='5px';
	    cardBody.insertBefore(park, cardBody.children[2]);

	}).catch(error => console.log('error:', error));


	let body = document.createElement('div');


	body.className = 'card-body';
	let cardText = document.createElement('h5');
	cardText.className = 'card-title';
	cardText.innerHTML = `<a href='/visitorCenters?name=${result[i].name}'> ${result[i].name}</a>`;

	body.appendChild(cardText);



	cardBody.appendChild(body)
	card.appendChild(cardBody);
	cardContainer.appendChild(card);


	}
}


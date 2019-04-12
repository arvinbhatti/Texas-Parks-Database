let url="http://localhost:8080/json";
        fetch(url).then(response => response.json())
        .then( (result) => {
            console.log('success:', result)
            let table=document.getElementById('parkTableBody');
            var parks = result[0];
            for(var i=0; i<5; i++){
              var row = table.insertRow();
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              cell1.innerHTML = `<b>${i+1}</b>`;
              cell2.innerHTML = parks[i].fullName;
              if(parks[i].address){
               cell3.innerHTML = `${parks[i].address[0].city}, ${parks[i].address[0].stateCode} ${parks[i].address[0].postalCode}`; 
             }else{
              cell3.innerHTML="unavailable";
             }
              
           
            }

          table = document.getElementById('campsiteTableBody');
           var campsites=result[1];
           for(var i=0; i<5; i++){
             var row = table.insertRow();
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              cell1.innerHTML = `<b>${i+1}</b>`;
              cell2.innerHTML = campsites[i].name;
              if(campsites[i].address){
               cell3.innerHTML = `${campsites[i].address[0].city}, ${campsites[i].address[0].stateCode} ${campsites[i].address[0].postalCode}`;
             }else{
              cell3.innerHTML="unavailable";
             }
              
           }
            
          table = document.getElementById('visitorTableBody');
           var visitorCenters=result[2];
           for(var i=0; i<5; i++){
             var row = table.insertRow();
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              cell1.innerHTML = `<b>${i+1}</b>`;
              cell2.innerHTML = visitorCenters[i].name;
               if(visitorCenters[i].address){
               cell3.innerHTML = `${visitorCenters[i].address[0].city}, ${visitorCenters[i].address[0].stateCode} ${visitorCenters[i].address[0].postalCode}`;
             }else{
              cell3.innerHTML="unavailable";
             }
              
           }
            
        })
        .catch(error => console.log('error:', error));
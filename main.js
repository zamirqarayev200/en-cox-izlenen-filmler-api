
const infoDiv = document.getElementById('firstDiv');
const myFavoritFilms = []; 

/*
if (typeof(Storage) !== "undefined"){
    //
    if(sessionStorage.getItem('films')){
        //alert('Films movcuddur');
        const myFavoritFilms = sessionStorage.getItem('films');
    }else{
        const myFavoritFilms = [
            {"id" : '1', "name" : 'Test', "image_path" : 'test', "start_date" : '2015-10-05'}
        ]  
    }
}else{
    alert('brauzer session desteklemir')
}*/

    function nextPage(){

        const currentPageNumber = document.getElementById('currentPageNumber').innerText;
        const result = Number(currentPageNumber) + 1;
        document.getElementById('currentPageNumber').innerText = result;
        showFilmsdata(result);


    }
 
    
    function backPage(){
        alert('geri seyfe');
    }
//seyfe yuklenende islyen funk
  
    //get ile json melumatlari alan funk 
    function showFilmsdata(page){
     
        fetch("https://www.episodate.com/api/most-popular?page=" + page)
        .then(response => response.json())
        .then(data => {
           // console.log(data.tv_shows);
           data.tv_shows.forEach(element => {
                let id = element.id;
                let name = element.name;
                let start_date = element.start_date;
                let image_thumbnail_path = element.image_thumbnail_path;
                //console.log(element.name);
                //infoDiv.innerHTML = id + element.name;
               // document.write("<li>" + element.name + "</li>");
                infoDiv.innerHTML += 
                "<div onclick='showIdData("+ element.id + ");' id='" + element.id + "' class='info'>" + "<img height='320px' width='250px' src=" + element.image_thumbnail_path + ">" + "<br>Film name: " + element.name + "<br> Started Time: " + start_date + "<br>" + "Platform:" + element.network + "<br><button onclick='showIdData("+ element.id + ");'>Get Info</button>" + "</div>";
           });
            
        })
    }
       

        //melumatlari aldiqdan sonra ekranda gosteren funk
            function showIdData(d_id){
               // alert(d_id);
                document.getElementById("myPopup").style.display = 'block';
               // document.getElementById("popupyazi").innerHTML = d_id;

                   fetch("https://www.episodate.com/api/show-details?q=" + d_id)
                   .then(response => response.json())
                   .then(data2 => {
                        //biz ne alaciyiq
                        //description, description_source, image_path, start_date, 
                        resultDiv = "<img src='" + data2.tvShow.image_path +"' >" + "<p><h2>" + data2.tvShow.name + "</h2></p>" + "<p>" + data2.tvShow.description + "</p><br>" + "<p>Baslama tarixi: " + data2.tvShow.start_date + "</p><br>" + "<p>WikiPedia Soruce: " + data2.tvShow.description_source + "</p>" + "<div id='tvShowId' style='display: hidden'>" + data2.tvShow.id + "</div>";
                        document.getElementById("popupyazi").innerHTML = resultDiv;
              
                   })

            }

            function addFavorit(){
                //eyni show datadaki kimi
                const itemId =  document.getElementById('tvShowId').innerText;
                document.getElementById("myPopup").style.display = 'block';

                    fetch("https://www.episodate.com/api/show-details?q=" + itemId)
                    .then(response => response.json())
                    .then(data3 => {
                        //biz ne alaciyiq
                        //description, description_source, image_path, start_date,  
                            
                            if(!sessionStorage.getItem('films')){

                                myFavoritFilms.push({"id" : data3.tvShow.id, "name" : data3.tvShow.name, "image_path" : data3.tvShow.image_path, "start_date" : data3.tvShow.start_date});
                                sessionStorage.setItem('films', JSON.stringify(myFavoritFilms));
                                // sessionStorage.setItem('films', JSON.stringify(myFavoritFilms));
                                console.log(myFavoritFilms);

                            }else{
                                
                                myFavoritFilms.push({"id" : data3.tvShow.id, "name" : data3.tvShow.name, "image_path" : data3.tvShow.image_path, "start_date" : data3.tvShow.start_date});
                                sessionStorage.setItem('films', JSON.stringify(myFavoritFilms));
                            }

                        })
            }

            function getfavoritItem(){
              //jsonu cek 
              //for ile parcala
              sessionFilms = sessionStorage.getItem('films');
              lastResult = JSON.parse(sessionFilms);
              console.log(lastResult);
              lastResult.forEach(x => {
               console.log(x.name);
                document.getElementById('favoritItem').innerHTML += 
                "<div onclick='showIdData("+ x.id + ");' id='" + x.id + "' class='info'>" + "<img height='320px' width='250px' src=" + x.image_path + ">" + "<br>Film name: " + x.name + "<br> Started Time: " + x.start_date + "<br><button onclick='showIdData("+ x.id + ");'>Get Info</button>" + "</div>";
              });
            }

            function closeMyPopup(){
                document.getElementById("myPopup").style.display = 'none';
            }
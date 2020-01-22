function getfunction(){
    console.log("Hi")
    var user = $("#user").val(); //user input value
    var url = "https://developers.zomato.com/api/v2.1/search?entity_id=285&entity_type=city&q="+user+"&count=11"; //API Query URL including user input

    $.ajax({
        dataType: "json",
        url: url,
        headers: {
            "Accept": "application/json", "user-key": "2a1abc699306276c4158991259dd01a5"
        }, 
        success: function(result){
            $(".resultheader").show(); //makes results div visible and sets CSS values
            $("ol").show();
            $(".results").css("border", "5px #b1b1b1 solid");
            var ratingList = [] //empty array of restaurant ratings
            var nameList = [] // empty array of restaurant names
            var restList = result.restaurants //sets variable for returned array of restaurants
            for (i = 0; i < restList.length; i++){  // loop that changes the text in each empty label to the restaurant and rating, adds both to lists
                $("#res"+i).html(result.restaurants[i].restaurant.name) //displays restaurant name
                nameList.push(result.restaurants[i].restaurant.name) //adds restaurant to list
                $("#rat"+i).html(result.restaurants[i].restaurant.user_rating.aggregate_rating) //displays rating
                ratingList.push(result.restaurants[i].restaurant.user_rating.aggregate_rating) //adds rating to list
            }
            console.log(nameList)
            console.log(ratingList)
            var data = [{ //data visualization
                x: [nameList[0], nameList[1], nameList[2], nameList[3], nameList[4], nameList[5], nameList[6], nameList[7], nameList[8], nameList[9]], //indexing through name list, will use as x values
                y: [ratingList[0], ratingList[1], ratingList[2], ratingList[3], ratingList[4], ratingList[5], ratingList[6], ratingList[7], ratingList[8], ratingList[9]], //indexing through rating list, will use as y values
                type: 'bar'
            }];
            var layout = { //graph layout
                title: 'Ratings of Restaurants in Detroit Area',
                autosize: false,
                height: 600,
                width: 1000,
                xaxis: {
                automargin: true
                }   
            };
            Plotly.newPlot('chart', data, layout);
                }
            })
    }
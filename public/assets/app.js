var inputValue = "WA"
let apiKey = "8qah6C7HinYsTe78kWFUYdGnfdvvHOPa1JPycDTC";
let queryURL = (`https://developer.nps.gov/api/v1/parks?stateCode=${inputValue}&api_key=${apiKey}`)

$(document).ready(function () {
    displayCampgrounds();
    
    function displayCampgrounds() {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (results) {
            displayCards(results)
        });
    }
    
    function displayCards(results) {
    console.log(results.data)

    let campSiteCardConatiner = document.getElementById("camp-container");
    for (let i = 0; i < results.data.length; i++) {
        var latLong = results.data[i].latLong.split(",");
        var lat = latLong.slice(0, 1);
        var long = latLong.slice(1, 2);
        console.log(lat + " " + long)
        var latString = lat.toString();
        var longString = long.toString();
        var latitude = latString.slice(4);
        var longitude = longString.slice(6)

        console.log(latitude + " " + longitude)
        var directions = results.data[i].directionsInfo;
        
        console.log(typeof directions);

        campSiteCardConatiner.innerHTML +=
            `<div class="col-xs-12 col-sm-6 col-lg-4">
        <div class="card camp-card my-3">
            <div class="card-body">
              <h2 class="card-title">${results.data[i].name}</h2>
              <hr>
              <p class="byline">${results.data[i].designation}</small>
                <p class="card-text">${results.data[i].description}</p>
            </div>
          <div class="text-center pb-3">
            <a href="${results.data[i].url}" target="_blank" class="btn btn-primary">Visit Website!<i class="fas pl-2 fa-external-link-alt"></i></a>
            <a onclick="moveTo(${longitude}, ${latitude})" href="#map" class="btn btn-primary">Find on Map<i class="fa pl-2 fa-map"></i></a>
          </div>
        </div>
        </div>`
    }
}

});

function getDirections() {
    console.log("get directions is working");
    let directions = $(this).attr("data-directions");
    console.log(directions)
}

// Carousel Functionality

$(function () {
    // $(".carousel").carousel({ interval: 2000 });
    // $("#carouselButton").click(function () {
    //     if ($("#carouselButton i").hasClass("fa-pause")) {
    //         $(".carousel").carousel("pause");
    //         $("#carouselButton i").removeClass("fa-pause");
    //         $("#carouselButton i").addClass("fa-play");
    //     } else {
    //         $(".carousel").carousel("cycle");
    //         $("#carouselButton i").removeClass("fa-play");
    //         $("#carouselButton i").addClass("fa-pause");
    //     }
    // });

    $(".carousel").carousel( { interval: 2000 } );
        $("#carouselButton").click(function(){
            if ($("#carouselButton").children("i").hasClass("fa-pause")) {
                $(".carousel").carousel("pause");
                $("#carouselButton").children("i").removeClass("fa-pause");
                $("#carouselButton").children("i").addClass("fa-play");
            } else {
                $(".carousel").carousel("cycle");
                $("#carouselButton").children("i").removeClass("fa-play");
                $("#carouselButton").children("i").addClass("fa-pause"); 
            }
        });

    // LOGIN AND RESERVE MODALS
    $("#loginButton").click(function () {
        $("#loginModal").modal();
    })

    $("#reserveButton").click(function () {
        $("#reserveModal").modal();
    })

});

// Open Layers Map Functionality

var layer = new ol.layer.Tile({
    source: new ol.source.OSM(),
    noWrap: true,
    wrapX: false
});
var london = ol.proj.transform([-0.12755, 51.507222], 'EPSG:4326', 'EPSG:3857');

var seattle = ol.proj.transform(
    [-122.316284, 47.601719],
    'EPSG:4326',
    'EPSG:3857'
);
var view = new ol.View({
    center: seattle,
    zoom: 12
});
var map = new ol.Map({
    renderer: 'canvas',
    target: 'map',
    layers: [layer],
    view: view
});

function moveTo(longitude, latitude) {
    var campSiteLocation = ol.proj.transform(
        [longitude, latitude],
        'EPSG:4326', 'EPSG:3857')
    console.log(`This seems to be working: Latitude: ${latitude} and longitidue ${longitude}`)
    map.getView().setCenter(campSiteLocation);
}

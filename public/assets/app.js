import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';

const map = new Map({
  layers: [new TileLayer({
    source: new OSM()
  })],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

var inputValue = "WA"
let apiKey = "8qah6C7HinYsTe78kWFUYdGnfdvvHOPa1JPycDTC";
let queryURL = (`https://developer.nps.gov/api/v1/parks?stateCode=${inputValue}&api_key=${apiKey}`)

$("#search-state").on("click", (event) => {
    event.preventDefault();
    console.log("button is clicked")
    console.log(inputValue)
    displayCampgrounds();
    console.log("Yes, it's working")
})



function displayCampgrounds() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
    });
}





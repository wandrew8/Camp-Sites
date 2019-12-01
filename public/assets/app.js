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
    }).then(function (results) {
        displayCards(results)
    });
}

function displayCards(results) {
    console.log(results.data)
    console.log(results.data[0].name)

    let campSiteCardConatiner = document.getElementById("camp-container");
    for (let i = 0; i < results.data.length; i++) {
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
            <a href="${results.data[i].url}" target="_blank" class="btn btn-primary">Visit Website!<i class="fas pl-2 fa-share-square"></i></a>
          </div>
        </div>
      </div>`
    }
}



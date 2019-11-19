var inputValue = $("#selectState :selected").val();
let apiKey = "8qah6C7HinYsTe78kWFUYdGnfdvvHOPa1JPycDTC";
// let inputValue = document.getElementById("selectState").value;
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

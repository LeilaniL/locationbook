// Back-end Logic
function LocationBook(){
    this.places =[];
    this.currentId = 0;
}

LocationBook.prototype.addPlace = function(place) {
    place.id = this.assignId();
    this.places.push(place);
}

LocationBook.prototype.assignId = function(){
    this.currentId += 1;
    return this.currentId;
}

LocationBook.prototype.findPlace = function(id){
    for (var i=0; i < this.places.length; i++){
        if (this.places[i]){
          if (this.places[i].id==id){
            return this.places[i];
          }
        }
      };
      return false;
}

LocationBook.prototype.deletePlace = function(id){
    for (var i=0; i<this.places.length; i++){
      if (this.places[i]){
        if (this.places[i].id==id){
          delete this.places[i];
          return true;
        }
      }
    };
    return false;
  }
function Place(location, timeOfYear, landmarks, notes){
    this.location = location,
    this.timeOfYear = timeOfYear,
    this.landmarks = landmarks,
    this.notes = notes
}
Place.prototype.getNotes = function(){
    return this.location + " " + this.notes;
}
// Front-end Logic
var newLocationBook = new LocationBook();
function displayLocationDetails (newLocationBookToDisplay){
    var placesList = $("ul#places");
    var htmlForPlaceInfo = "";
    newLocationBookToDisplay.places.forEach(function(place){
        htmlForPlaceInfo += "<li id=" +place.id+ ">" + place.location + "</li>";
    });
    placesList.html(htmlForPlaceInfo);
};
function showPlace(placeId){
    var place = newLocationBook.findPlace(placeId);
    $("#show-place").show();
    $(".location").html(place.location);
    $(".landmark").html(place.timeOfYear);
    $(".time").html(place.landmarks);
    $(".notes").html(place.notes);
    var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + place.id + ">Delete</button>");
}
function attachPlaceListeners(){
    $("ul#places").on("click", "li", function(){
        showPlace(this.id);
    });
    $("#buttons").on("click", ".deleteButton", function(){
        newLocationBook.deletePlace(this.id);
        $("#show-place").hide();
        displayLocationDetails(newLocationBook);
    });
};
$(document).ready(function() {
    attachPlaceListeners();
    $("form#new-place").submit(function(event){
        event.preventDefault();
        debugger;
        var inputtedLocation = $("input#location").val();
        var inputtedTimeOfYear = $("input#time").val();
        var inputtedLandmark = $("input#landmark").val();
        var inputtedNotes = $("input#notes").val();

        $("input#location").val("");
        $("input#time").val("");
        $("input#landmark").val("");
        $("input#notes").val("");

        var newPlace = new Place(inputtedLocation, inputtedLandmark, inputtedTimeOfYear, inputtedNotes);
        newLocationBook.addPlace(newPlace);
        displayLocationDetails(newLocationBook);
        });
    })
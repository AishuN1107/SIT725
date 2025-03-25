$(document).ready(function(){
    $('.modal').modal();

    const travelPlaces = [
        { location: "Paris, France", image: "images/paris.jpg", description: "The city of love and lights!" },
        { location: "Kyoto, Japan", image: "images/kyoto.jpg", description: "Beautiful temples and cherry blossoms." },
        { location: "Maui, Hawaii", image: "images/Maui.png", description: "Stunning beaches and tropical paradise." }
    ];

    const addCards = (places) => {
        $("#card-section").empty(); 
        places.forEach(place => {
            let card = `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="${place.image}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${place.location}</span>
                            <p>${place.description}</p>
                        </div>
                    </div>
                </div>`;
            $("#card-section").append(card);
        });
    };

    $("#submitForm").click(() => {
        let newPlace = {
            location: $("#location").val(),
            image: $("#image").val(),
            description: $("#description").val()
        };
        travelPlaces.push(newPlace);
        addCards(travelPlaces);
        $("#location, #image, #description").val("");
        $('.modal').modal('close');
    });

    addCards(travelPlaces);
});

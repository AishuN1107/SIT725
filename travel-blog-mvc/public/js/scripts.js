$(document).ready(function(){
    $('.modal').modal();

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

    const getPlaces = () => {
        $.get('/api/places', (response) => {
            if (response.statusCode === 200) {
                addCards(response.data);
            }
        });
    };

    $("#submitForm").click(() => {
        let newPlace = {
            location: $("#location").val(),
            image: $("#image").val(),
            description: $("#description").val()
        };
        $.post('/api/places', newPlace, (response) => {
            if (response.statusCode === 201) {
                getPlaces();
                $("#location, #image, #description").val("");
                $('.modal').modal('close');
            }
        });
    });

    getPlaces();
});

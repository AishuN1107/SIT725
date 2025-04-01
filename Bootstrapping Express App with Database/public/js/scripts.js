$(document).ready(function () {
    $('.modal').modal();

    let travelPlaces = [
        { location: "Paris, France", image: "public/images/paris.jpg", description: "The city of love and lights!" },
        { location: "Kyoto, Japan", image: "public/images/kyoto.jpg", description: "Beautiful temples and cherry blossoms." },
        { location: "Maui, Hawaii", image: "public/images/Maui.png", description: "Stunning beaches and tropical paradise." }
    ];

    // Add cards to the page
    const addCards = (places) => {
        $("#card-section").empty();
        places.forEach(place => {
            const card = `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="${place.image}" alt="${place.location}">
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

    // Handle form submission for adding a new travel place
    document.getElementById("submitForm").addEventListener("click", async function (event) {
        event.preventDefault();  // Prevent default form submission behavior

        const newPlace = {
            location: $("#location").val(),
            image: $("#image").val(),
            description: $("#description").val()
        };

        // Validate inputs before proceeding
        if (!newPlace.location || !newPlace.image || !newPlace.description) {
            alert("Please fill out all fields.");
            return;
        }

        console.log("New Place Data:", newPlace);  // Log the new place data

        try {
            let response = await fetch("/api/travel-places", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPlace),
            });

            if (response.ok) {
                let data = await response.json();
                console.log("Successfully added new place:", data);

                // Add the newly saved place to the travelPlaces array and render it
                travelPlaces.push(data.data);
                addCards(travelPlaces); // Re-render cards after adding new place

                // Reset the form fields
                $("#location, #image, #description").val("");

                // Close the modal
                $('.modal').modal('close');
                M.toast({ html: "Travel place added successfully!" });
            } else {
                M.toast({ html: "Error adding travel place." });
            }
        } catch (error) {
            console.error("Error adding travel place:", error);
            M.toast({ html: "Error submitting the form." });
        }
    });

    // Initial rendering of cards
    addCards(travelPlaces);
});
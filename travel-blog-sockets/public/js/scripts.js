document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);

  const socket = io();

  function addPlaceCard(place) {
    const cardSection = document.getElementById('card-section');
    const card = `
      <div class="col s12 m4">
        <div class="card">
          <div class="card-image">
            <img src="${place.image}" alt="Place Image">
            <span class="card-title">${place.location}</span>
          </div>
          <div class="card-content">
            <p>${place.description}</p>
          </div>
        </div>
      </div>
    `;
    cardSection.innerHTML += card;
  }

  // Fetch existing places
  fetch('/places')
    .then(response => response.json())
    .then(places => {
      places.forEach(place => addPlaceCard(place));
    })
    .catch(err => console.error(err));

  // Listen for new places from server
  socket.on('new-place', (place) => {
    console.log('New place received via socket:', place);
    addPlaceCard(place);
  });

  // Submit form
  document.getElementById('submitForm').addEventListener('click', async () => {
    const location = document.getElementById('location').value;
    const image = document.getElementById('image').value;
    const description = document.getElementById('description').value;

    if (!location || !image || !description) {
      alert('Please fill all fields!');
      return;
    }

    // 🔥 Only POST to server — do NOT manually add card here
    await fetch('/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location, image, description })
    });

    // After posting, clear form and close modal
    document.getElementById('location').value = '';
    document.getElementById('image').value = '';
    document.getElementById('description').value = '';

    const modal = M.Modal.getInstance(document.getElementById('modal1'));
    modal.close();
  });
});

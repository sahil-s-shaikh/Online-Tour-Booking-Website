let displayHistory = document.querySelector(".container");

let loadHistory = async () => {
  let userId = Number(sessionStorage.getItem("id"));

  // 🔒 Safety check
  if (!userId) {
    alert("Please login first");
    window.location.href = "../login/login.html";
    return;
  }

  let response = await fetch("http://localhost:3000/booking");
  let data = await response.json();

  // ✅ FILTER: only logged-in user's bookings
  let userBookings = data.filter(
    (value) => value.userId === userId
  );

  if (userBookings.length === 0) {
    displayHistory.innerHTML = "<p>No booking history found.</p>";
    return;
  }

  userBookings.forEach((value) => {
    let historyContainer = document.createElement("article");

    let place = document.createElement("p");
    let contact = document.createElement("p");
    let bookingDate = document.createElement("p");
    let persons = document.createElement("p");

    place.innerText = `Place: ${value.places}`;
    contact.innerText = `Contact: ${value.contact}`;
    bookingDate.innerText = `Booking Date: ${value.bookingDate}`;
    persons.innerText = `Persons: ${value.persons}`;

    historyContainer.className = "col-12 col-md-4 col-lg-3";
    historyContainer.append(place, contact, bookingDate, persons);
    displayHistory.append(historyContainer);
  });
};

loadHistory();
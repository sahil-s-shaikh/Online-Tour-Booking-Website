let displayContainer = document.querySelector(".container");

let notificationValue = async () => {
  if (!displayContainer) return;

  let response = await fetch("http://localhost:3000/booking");
  let data = await response.json();

  let userId = Number(sessionStorage.getItem("id"));

  // unseen notifications
  let filterUserNotification = data.filter(
    (value) => value.notification === false && value.userId === userId
  );

  // all user bookings
  let filterDataDisplay = data.filter(
    (value) => value.userId === userId
  );

  // display notifications
  filterDataDisplay.forEach((value) => {
    let p = document.createElement("p");
    p.innerHTML = `The booking is confirmed on <b>${value.bookingDate}</b> 
                   for <b>${value.places}</b>`;
    displayContainer.append(p);
  });

  // mark notifications as seen
  for (let value of filterUserNotification) {
    await seenTrue(value.id);
  }

  // update count
  sessionStorage.setItem("length", filterUserNotification.length);

  let sup = document.querySelector("sup");
  if (sup) {
    sup.innerHTML = filterUserNotification.length;
  }
};

// mark notification as seen
let seenTrue = async (id) => {
  await fetch(`http://localhost:3000/booking/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ notification: true })
  });
};

notificationValue();
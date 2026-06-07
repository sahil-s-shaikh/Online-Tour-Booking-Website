// Container
let containerData = document.querySelector(".container");
if(!containerData){
    console.warn("Navbar Skipped")
}else{

// Create Navbar
let navbar = document.createElement("nav");
navbar.innerHTML = `
<section id="logo" class="col-3"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8X8rLWFDkOR70SV2Okmc5tubssOMkN7jdpw&s" width="100px" height="70px"></section>
<section id="navigation" class="col-5">
</section>
<section id="profile" class="col-4"></section>
`;
navbar.classList = "row align-items-center justify-content-center";
containerData.before(navbar);

// Navbar blocks
let navigationBlock = document.querySelector("#navigation");
let profileBlock = document.querySelector("#profile");

// Navigation data
let navigationData = [
    { label: "Home", Path: "../Home_Page/homepage.html" },
    { label: "About Us", Path: "../About Us/aboutus.html" },
    { label: "Contact Us", Path: "../contactus/contactus.html" },
    { label: "Booking", Path: "../booking/booking.html" },
    { label: "Add Places", Path: "../addPlaces/addplaces.html" }
];

// Profile data
let profileData = [
    { label: "BH", Path: "../browserHistory/history.html" },
    { label: "Notification", Path: "../notification/notification.html" },
    { label: "Sign-Up", Path: "../Registration/registration.html" },
    { label: "Log-In", Path: "../login/login.html" },
    { label: "Log Out" }
];

// Get user login status
let userId = sessionStorage.getItem("id");
let role = sessionStorage.getItem("role");

// Logout function
let clearLogin = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("length");
    location.reload();
};

// Notification Count
let notificationData=async()=>{
    let response= await fetch("http://localhost:3000/booking");
    let data=await response.json();

   let filterUserNotification =data .filter((value)=>value.notification===false && value.userId===userId);
   sessionStorage.setItem("length",filterUserNotification.length);
   let sup = document.querySelector("sup");
   sup.innerHTML=sessionStorage.getItem("lenght");
}

// Create navbar function
let createNavbar = (data, appendValues) => {
  let ul = document.createElement("ul");
  ul.className = "row";

  data.forEach((value) => {
    let li = document.createElement("li");
    li.className = "col";

    let button = document.createElement("button");
    button.innerHTML = value.label;

    // 🔐 SIGN-UP & LOGIN (only when NOT logged in)
    if (value.label === "Sign-Up" || value.label === "Log-In") {
      if (userId) return; // hide if logged in
    }

    // 🚪 LOGOUT (only when logged in)
    if (value.label === "Log Out") {
      if (!userId) return;
      button.addEventListener("click", clearLogin);
    }

    // 👑 ADMIN ONLY: Add Places
    if (value.label === "Add Places") {
      if (role !== "admin") return;
    }

    // 🔔 Notification count
    if (value.label === "Notification") {
      let sup = document.createElement("sup");
      sup.innerHTML = sessionStorage.getItem("length") || 0;
      button.append(sup);
    }

    // 🔗 Navigation
    if (value.Path) {
      button.addEventListener("click", () => {
        location.href = value.Path;
      });
    }

    li.append(button);
    ul.append(li);
  });

  appendValues.append(ul);
};
createNavbar(navigationData,navigationBlock)
createNavbar(profileData,profileBlock);
notificationData();}
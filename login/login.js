let form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = new FormData(form);
  let email = formData.get("email");
  let password = formData.get("password");

  try {
    let response = await fetch("http://localhost:3000/users");
    let users = await response.json();

    let singleUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!singleUser) {
      alert("Invalid email or password");
      return;
    }

    // store session data
    sessionStorage.setItem("id", singleUser.id);
    sessionStorage.setItem("role", singleUser.role);

    alert("Login successful");

    // role-based redirect
    if (singleUser.role === "admin") {
      window.location.href = "../addPlaces/addplaces.html";
    } else {
      window.location.href = "../Home_Page/index.html";
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Server error. Try again later.");
  }
});
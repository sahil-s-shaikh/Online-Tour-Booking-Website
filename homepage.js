let displayContainer = document.querySelector(".container");

let click =()=>{
    location.href="../booking/booking.html"
}


let displayPlaces = async () => {
    let response = await fetch("http://localhost:3000/places");
    let placesData = await response.json();

    placesData.forEach((value) => {
        let placeContainer = document.createElement("article");
        let button=document.createElement("button")
        placeContainer.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        placeContainer.innerHTML = `
            <figure>
                <img src="${value.image}" />
            </figure>
            <p>Place: ${value.placeName}</p>
            <p>Price: ${value.price}</p>
            <p>Description: ${value.description}</p>
            <p>Days: ${value.days}</p>
            
        `;
        
      button.innerHTML="Add To Package"
      placeContainer.append(button)
      button.addEventListener("click",click)
        displayContainer.append(placeContainer);
    });
};

// displayPlaces();

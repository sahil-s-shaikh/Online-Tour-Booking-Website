let selectTag=document.querySelector("select");
let places;
let placesDetails = async ()=>{
    let response = await fetch("http://localhost:3000/places");
    let data=await response.json();
places=data;
console.log(places);
    data.map((value)=>{
        let optionTag=document.createElement("option")
        optionTag.innerText=value.placeName;
        optionTag.value=value.placeName;
        selectTag.append(optionTag)
    });
    return data;


}
placesDetails();

let form=document.querySelector("form");
form .addEventListener("submit",(e)=>{
    e.preventDefault()

    let formData = new FormData(form);

    let UserId=sessionStorage.getItem("id");
let package=formData.get("package");
let persons=formData.get("persons");

    let bookingDetails={
        // id:UserId,
        bookingDate:formData.get("date"),
        contact:formData.get("contact"),
        email:formData.get("email"),
        persons:persons,
        places:package,
        notification:false,
        userId:Number(sessionStorage.getItem("id"))

        

    };
let place=places.find((value)=> value.placeName===package);
    if(UserId){
        addBooking(bookingDetails)
        alert(`Your booking is Successful and Total Price is ${
            persons*place.price
        } `)
    }
    else{
        location.href="../login/login.html";
    }
});

let addBooking=async(data)=>{
    await fetch("http://localhost:3000/booking",{
        method:"POST",
        headers:{
            "content-type":"application/json",

        },
        body:JSON.stringify(data),
    });
}
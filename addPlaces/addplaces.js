let role = sessionStorage.getItem("role");

if (role !== "admin") {
  alert("Access denied");
  location.href = "../login/login.html";
}
let form=document.querySelector("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let formData=new FormData(form)
    let reader= new FileReader();
    reader.onload=(e)=>{
        let imgeUrl=e.currentTarget.result;

        let placeDetails={
            image:imgeUrl,
            placeName:formData.get("place"),
            price:formData.get("price"),
            days:formData.get("days"),
            description:formData.get("description"),
        };
        console.log(placeDetails)
        addPlace(placeDetails);
        location.href="../Home_Page/homepage.html"
    };
   reader.readAsDataURL(formData.get("image"));
});

let addPlace = async(data)=>{
    await fetch("http://localhost:3000/places" ,{
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(data),
    })
}
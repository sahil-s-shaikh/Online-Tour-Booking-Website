let form=document.querySelector("form")


form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let formData= new FormData(form);
    let details={
        name:formData.get("name"),
        contact:formData.get("contact"),
        email:formData.get("email"),
        password:formData.get("password"),
        address:formData.get("address"),
        gender:formData.get("gender"),
        dob:formData.get("dob"),
        role:"user",

    };
    console.log(details)
 addUsers(details);
    alert("Register successfully. Please Login Now" )

    

    
})

let addUsers=async(data)=>{
    await fetch(`http://localhost:3000/users`,{


        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data),

    }
        
    )
}
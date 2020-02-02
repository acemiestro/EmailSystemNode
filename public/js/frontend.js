// selector
const login = document.querySelector(".login");
const signup = document.querySelector(".signup")
const uploadPlanImages = document.querySelector(".uploadPlanImages");

async function sendLogin(email, password) {
    const response = await axios.post("/api/users/login", {email, password});
    if (response.data.success){
        location.assign("/")
    }
    else{
        alert("Something went wrong")
    }
}

async function sendSignUP(name, password, confirmPassword, email, role, phone) {
    const response = await axios.post("/api/users/signup", {name, password, confirmPassword, email, role, phone});
    if (response.data.success){
        location.assign("/")
    }
    else{
        alert("Something went wrong")
    }

}

async function addFormdata(form) {    
    const button=document.querySelector(".updatebtn");
    const id=button.getAttribute("planId")
    const response = await axios.patch(`/api/plans/${id}`, form);
    if (response.data.success) { alert("Plan Successfully uploaded") }
}

if(login){
    login.addEventListener("submit", function(event){
        event.preventDefault();
        const inputArr = document.getElementsByTagName("input")
        const email = inputArr[0].value
        const password = inputArr[1].value
        sendLogin(email, password)
    })
}

if(signup){
    signup.addEventListener("submit", function(event){
        event.preventDefault();
        const inputArr = document.getElementsByTagName("input")
        const name = inputArr[0].value
        const password = inputArr[1].value
        const confirmPassword = inputArr[2].value
        const email = inputArr[3].value
        const role = inputArr[4].value
        const phone = inputArr[5].value
        sendSignUP(name, password, confirmPassword, email, role, phone)
    })
}

if(uploadPlanImages) {
  uploadPlanImages.addEventListener("submit", function (e) {
    e.preventDefault();
    const form = new FormData();
    const inputs = document.getElementsByTagName("input");
    form.append("cover",inputs[0].value);
    for (var i = 1; i < inputs.length; i++) {
      form.append("picture",inputs[i].value);
    }
    addFormdata(form)
  })
}
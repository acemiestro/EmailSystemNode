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


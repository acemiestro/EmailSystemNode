// selector
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const bookPlan = document.querySelector(".bookPlan");   
var stripe = Stripe('pk_test_B115y7vSSQTc7ydMEUSS4eas00RwTyzoPp');

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

if(bookPlan) {
    bookPlan.addEventListener("click", async function(e){
        e.preventDefault();
        const id = bookPlan.getAttribute("planId")
        const response = await axios.get("/api/booking/" + id)
        const session = response.data.session;
        const userId = response.data.userId;
        console.log(session.id);
        stripe
            .redirectToCheckout({
                // Make the id field from the Checkout Session creation API response
                // available to this file, so you can provide it as parameter here
                // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                sessionId: session.id
            })
            .then(function (resultFromStripe) {
                console.log(resultFromStripe)
                if (resultFromStripe.error.message) {
                    // /api/bookings/removeNewbooking
                alert("Booking Failed");
                       // => remove th booking
                } 
                else {}
                      // If `redirectToCheckout` fails due to a browser or network
                      // error, display the localized error message to your customer
                      // using `result.error.message`.
            });
    })
}
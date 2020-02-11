const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// const users = require("./data/users");
const planRouter = require("./routers/planRouter");
const userRouter = require("./routers/userRouter");
const viewRouter = require("./routers/viewRouter");
const bookingRouter = require("./routers/bookingRouter");
// converts buffer to json
// 
app.use(cors());
app.post("/webhook-checkout",bodyParser.raw({ type: 'application/json' }), bookingController.createBooking);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// => static files
app.use(express.static("public"));
app.use("/plans", express.static("public"))

app.use(cookieParser());

// pug => render
app.set("view engine", "pug");
app.set("views", "views");


app.use(function(req,res,next){
  console.log("cookies");
  console.log(req.cookies)
  console.log("end");
next();
})
app.use("/", viewRouter);

app.use("/api/plans", planRouter);
app.use("/api/users", userRouter);
app.use("/api/booking", bookingRouter);

// app.get("/plans",);
// createPlans
// plans/1
// plans/2
// app.patch("/plans/:id", );
// createPlan
// app.post("/plans");

// user
app.get("/users");

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});

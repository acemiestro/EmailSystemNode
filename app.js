const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

// const users = require("./data/users");
const planRouter = require("./routers/planRouter");
const userRouter = require("./routers/userRouter");
const viewRouter = require("./routers/viewRouter");
// converts buffer to json
// 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// => static files
app.use(express.static("public"));

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

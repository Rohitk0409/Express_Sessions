const express=require("express");
const app=express();
const port=4000;
const session = require('express-session');
const flash = require('connect-flash');
app.use(flash());
app.set("view engine","ejs");
const sessionOPtion= {
    secret:"seceretsession",
      resave:true,
     saveUninitialized :true
    };

 app.use(session(sessionOPtion));
 // middlewares
 app.use((req,res,next)=>{
    res.locals.message=req.flash("success");
    res.locals.name=req.session.name;
    res.locals.err=req.flash("error");
    next();
 });

 app.get("/register",(req,res)=>{
    let{name="Anonymous"}=req.query;
    req.session.name=name;
    if(name=="Anonymous"){
        req.flash("error","user not register!");
        
    }else{
        req.flash("success","user successfulll register!");
    }
    
    res.redirect("/hello")
    // res.send(req.session.name);
    // console.log(req.session);
 });

 app.get("/hello",(req,res)=>{
    // res.send(req.session.name);
    res.render("home.ejs");
 });
// app.get("/countrequest",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
//     res.send(`total count of request is ${req.session.count}`);
// });

app.get("/test",(req,res)=>{
    res.send("working the route..");
});

app.listen(port,()=>{
    console.log(`Listening the port${port}`);
})
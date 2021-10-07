const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(express.urlencoded({extended:true}));

//Static files
app.use(express.static("public"));

//Templating the engine
app.set('views','./src/views');
app.set('view engine','ejs');

//Routes
const newsrouter=require('./src/routes/news');

//front page
app.use('/',newsrouter);

app.listen(3000,function(){
  console.log("server is running on port 3000");
})

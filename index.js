var express=require("express");
var rutas=require("./routes/citasRutas");
var path = require('path');
 
var app=express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",rutas);


var port=process.env.PORT || 8002;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});
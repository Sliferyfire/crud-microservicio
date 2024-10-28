var ruta=require("express").Router();
var {mostrarCitas, nuevaCita, modificarCita, buscarPorID, borrarCita}=require("../database/citasBD");

ruta.get("/", async(req, res)=>{
    var citas = await mostrarCitas();
    // console.log(citas);
    res.render("citas/mostrar",{citas});
});

ruta.post("/mostrarCitas", async(req, res)=>{
    var citas = await mostrarCitas();
    res.status(200).json(citas);
});

ruta.post("/nuevacita", async(req, res)=>{
    console.log(req.body);
    var error = await nuevaCita(req.body);
    if (error == 0)
        res.status(200).json({message: "Nueva cita registrada"});
    else
        res.status(500).json({message: "Error al registrar la cita"});
});

// ruta.get("/editar/:id",async(req, res)=>{
//     var user=await buscarPorID(req.params.id);
//     console.log("Cita xd: "+user);
//     res.render("citas/modificar",{user});
// });

ruta.post("/buscarPorID/:id", async(req,res)=>{
    var cita = await buscarPorID(req.params.id);
    console.log("Cita: "+cita);
    res.status(200).json(cita);
})

ruta.post("/editar", async(req, res)=>{
    var error=await modificarCita(req.body);
    res.redirect("/");      
});

ruta.post("/borrar/:id", async(req, res)=>{
    await borrarCita(req.params.id);
    res.status(200).json({message: "Cita eliminada"});
});

module.exports=ruta;
//const Router = require('express').Router;
const { Router } = require("express");
const router = Router();


router.get("/atendimentos" , (req , res) =>{
res.send(`Chegou aqui, estamos listando todos os atendimentos...`);
});

router.post("/atendimentos", (req ,res)=>{
res.send(`Chegou aqui, estamos criando todos os atendimentos...`);
});

router.put("/atendimento/:id", (req ,res)=>{
    const { id  } = req.params;
res.send(`Chegou aqui, estamos atualizando todos os atendimentos ${id}...`);
});

router.post("/atendimento/:id", (req ,res)=>{
    const { id } = req.params;
res.send("Chegou aqui, estamos listando todos os atendimentos"+ id +`...`);
});



module.exports = router;
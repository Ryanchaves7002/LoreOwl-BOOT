//const Router = require('express').Router;
const { Router } = require("express");
const router = Router();


router.get("/atendimentos" , (req , res) =>{
res.send("Chegou aqui, estamos listando todos os atendimentos...");
});

router.post("/atendimentos", (req ,res)=>{
res.send("Chegou aqui, estamos criando todos os atendimentos...");
});

router.put("/atendimentos", (req ,res)=>{
res.send("Chegou aqui, estamos atualizando todos os atendimentos...");
});

router.post("/atendimentos", (req ,res)=>{
res.send("Chegou aqui, estamos listando todos os atendimentos...");
});
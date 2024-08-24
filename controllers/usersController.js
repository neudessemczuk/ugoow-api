import { Router } from "express";
const router = "Router";

router.get("/users/:id", (req, res) => {

    // http://localhost:8080/users/7
    const { id } = req.params;

    // http://localhost:8080/users/7?sit=2
    const { sit } = req.query;

    // Retornar objeto como resposta
    return res.json({
        id : id,
        name: "Neudes",
        email: "neudes@neudes.com.br",
        sit: sit
    });

    //res.send(`Visualizar: ${id}`);
});


export default {router};
const express = require("express");
const router = express.Router();
const {
  listarMissoes,
  criarMissoes,
  apagarMissoes,
  atualizarMissoes,
  listarPorDificuldade,
  listarPorStatus,
} = require("../controllers/missionController");

router.get("/", (req, res) => {
  res.send("Rota funcionando");
});

router.get("/listar", listarMissoes);
router.post("/criar", criarMissoes);
router.delete("/deletar/:id", apagarMissoes);
router.put("/atualizar/:id", atualizarMissoes);
router.get("/dificuldade/:dificuldade", listarPorDificuldade);
router.get("/status/:status", listarPorStatus);
module.exports = router;

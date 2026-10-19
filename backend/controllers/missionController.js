const {
  puxarDados,
  criarDados,
  deletarDados,
  atualizarDados,
  buscarPorDificuldade,
  buscarPorStatus,
} = require("../models/missionModel");

async function listarMissoes(req, res) {
  try {
    const missoes = await puxarDados();
    return res.status(200).json(missoes);
  } catch (error) {
    console.error("Erro no controller ao listar missões:", error.message);
    return res.status(500).json({ erro: "Erro ao buscar as missões." });
  }
}
async function criarMissoes(req, res) {
  try {
    const { titulo, descricao, dificuldade, xp_recompensa } = req.body;
    if (!titulo || !dificuldade) {
      return res
        .status(400)
        .json({ erro: "Título e dificuldade são obrigatórios!" });
    }

    const novaMissao = await criarDados(
      titulo,
      descricao,
      dificuldade,
      xp_recompensa,
    );
    return res.status(201).json({
      mensagem: "Missão criada com sucesso!",
      dados: novaMissao,
    });
  } catch (error) {
    console.error("Erro no controller ao criar missão:", error.message);
    return res
      .status(500)
      .json({ erro: "Erro interno no servidor ao salvar a missão." });
  }
}

async function apagarMissoes(req, res) {
  try {
    const { id } = req.params;
    const missaoRemovida = await deletarDados(id);

    if (!missaoRemovida) {
      return res.status(404).json({ erro: "Missão não encontrada." });
    }

    return res.status(200).json({
      mensagem: "Missão apagada com sucesso!",
      dados: missaoRemovida,
    });
  } catch (error) {
    console.error("Erro no controller ao apagar missão:", error.message);
    return res
      .status(500)
      .json({ erro: "Erro interno no servidor ao apagar a missão." });
  }
}

async function atualizarMissoes(req, res) {
  try {
    const { id } = req.params;
    const { titulo, descricao, dificuldade, xp_recompensa } = req.body;

    if (!titulo || !dificuldade) {
      return res.status(400).json({
        erro: "Título e dificuldade são obrigatórios para atualizar!",
      });
    }

    const missaoAtualizada = await atualizarDados(
      id,
      titulo,
      descricao,
      dificuldade,
      xp_recompensa,
    );

    if (!missaoAtualizada) {
      return res
        .status(404)
        .json({ erro: "Missão não encontrada para atualização." });
    }

    return res.status(200).json({
      mensagem: "Missão atualizada com sucesso!",
      dados: missaoAtualizada,
    });
  } catch (error) {
    console.error("Erro no controller ao atualizar a missão:", error.message);
    return res
      .status(500)
      .json({ erro: "Erro interno no servidor ao atualizar a missão." });
  }
}

async function listarPorDificuldade(req, res) {
  try {
    const { dificuldade } = req.params;

    const missoes = await buscarPorDificuldade(dificuldade);

    if (missoes.length === 0) {
      return res.status(404).json({
        mensagem: `Nenhuma missão encontrada com a dificuldade: ${dificuldade}`,
      });
    }

    return res.status(200).json(missoes);
  } catch (error) {
    console.error(
      "Erro no controller ao buscar por dificuldade:",
      error.message,
    );
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

async function listarPorStatus(req, res) {
  try {
    const { status } = req.params;

    const missoes = await buscarPorStatus(status);

    if (missoes.length === 0) {
      return res.status(404).json({
        mensagem: `Nenhuma missão encontrada com a status: ${status}`,
      });
    }

    return res.status(200).json(missoes);
  } catch (error) {
    console.error("Erro no controller ao buscar por status:", error.message);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

module.exports = {
  listarMissoes,
  criarMissoes,
  apagarMissoes,
  atualizarMissoes,
  listarPorDificuldade,
  listarPorStatus,
};

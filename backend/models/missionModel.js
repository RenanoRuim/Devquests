const pool = require("./../db");

async function puxarDados() {
  try {
    const resultado = await pool.query("SELECT * FROM missoes");
    console.log("Sucesso ao puxar dados:");
    console.log(resultado.rows);
    return resultado.rows;
  } catch (error) {
    console.error("Erro ao conectar:", error.message);
  }
}
async function buscarPorDificuldade(dificuldade) {
  const sql = "SELECT * FROM missoes WHERE dificuldade = $1;";
  try {
    const resultado = await pool.query(sql, [dificuldade]);
    return resultado.rows;
  } catch (error) {
    console.error("Erro ao buscar por dificuldade:", error.message);
    throw error;
  }
}
async function buscarPorStatus(status) {
  const sql = "SELECT * FROM missoes WHERE status = $1;";
  try {
    const resultado = await pool.query(sql, [status]);
    return resultado.rows;
  } catch (error) {
    console.error("Erro ao buscar por status:", error.message);
    throw error;
  }
}

async function criarDados(titulo, descricao, dificuldade, xp_recompensa) {
  const sql = `
    INSERT INTO missoes (titulo, descricao, dificuldade, xp_recompensa) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *;
  `;
  const valores = [titulo, descricao, dificuldade, xp_recompensa];
  try {
    const resultado = await pool.query(sql, valores);
    console.log("Sucesso ao criar dados");
    return resultado.rows[0];
  } catch (error) {
    console.error("Erro ao enviar:", error.message);
    throw error;
  }
}

async function deletarDados(id) {
  const sql = "DELETE FROM missoes WHERE id = $1 RETURNING *;";
  try {
    const resultado = await pool.query(sql, [id]);
    return resultado.rows[0];
  } catch (error) {
    console.error("Erro ao deletar:", error.message);
    throw error;
  }
}
async function atualizarDados(
  id,
  titulo,
  descricao,
  dificuldade,
  xp_recompensa,
) {
  const sql = `
    UPDATE missoes 
    SET titulo = $1, descricao = $2, dificuldade = $3, xp_recompensa = $4 
    WHERE id = $5 
    RETURNING *;
  `;
  const valores = [titulo, descricao, dificuldade, xp_recompensa, id];

  try {
    const resultado = await pool.query(sql, valores);
    return resultado.rows[0];
  } catch (error) {
    console.error("Erro ao atualizar:", error.message);
    throw error;
  }
}
module.exports = {
  puxarDados,
  criarDados,
  deletarDados,
  atualizarDados,
  buscarPorDificuldade,
  buscarPorStatus,
};

const pool = require("./db");

async function testeConeccao() {
  try {
    const resultado = await pool.query("SELECT NOW()");
    console.log("conexão estabelecida");
    console.log("horário do banco:", resultado.rows[0].now);
  } catch (error) {
    console.error("erro ao conectar:", error.message);
  } finally {
    await pool.end();
  }
}
testeConeccao();

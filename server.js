// server.js
const express = require('express');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Configuração de conexão com o banco de dados (Render fornece essas variáveis automaticamente)
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    console.log("Conectado ao banco de dados PostgreSQL.");
  })
  .catch(err => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

// Endpoint para retornar todos os jobs
app.get('/jobs', (req, res) => {
  client.query('SELECT * FROM jobs', (err, result) => {
    if (err) {
      res.status(500).send("Erro ao recuperar dados do banco de dados");
      return;
    }
    res.json(result.rows);  // Retorna os dados da tabela "jobs"
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

const express = require('express');
const app = express();
const PORT = 3000;

// Array para armazenar os valores temporariamente (simulando um banco de dados)
let valoresArmazenados = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para receber os valores do formulário e armazená-los
app.post('/armazenarValores', (req, res) => {
  const { valor } = req.body;

  // Armazena o valor no array
  valoresArmazenados.push(valor);

  res.status(200).send('Valor armazenado com sucesso!');
});

// Rota para obter os valores armazenados
app.get('/obterValores', (req, res) => {
  res.json(valoresArmazenados);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

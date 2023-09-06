import express from 'express';
import dotenv from 'dotenv';

// Carregue as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Acesse a variável de ambiente PORT
const port = process.env.PORT || 3000; // 3000 é um valor padrão caso a variável de ambiente não esteja definida.

// Configurar resposta JSON
app.use(express.json());

//public folder for images
app.use(express.static('public'));

//routes

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
import express from 'express';
import dotenv from  'dotenv';
import Router from './routes/UserRoutes';

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
app.use('/users', Router)

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});

/*
ATENÇÃO

Quando clonar o repositório ainda será necessário executar os comandos:
-npm i express
-npm i -D @types/express
-npm i ts-node ts-node-dev typescript
-npm i dotenv
-npm i jsonwebtoken
-npm i -D @types/jsonwebtoken
-npm i typeorm
-npm i pg
-npm i -D @types/pg
*/
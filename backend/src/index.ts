import express, { application } from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app
const corsOptions = {
  origin: "http://localhost:3000", // Permitir apenas esta origem
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permitir esses métodos HTTP
};
app.use(cors(corsOptions));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// suportar parâmetros JSON no body da requisição
app.use(express.json());
// inicializa o servidor na porta especificada
app.use(
  session({
    secret: "secretcode", // Chave secreta usada para criptografar a sessão
    resave: true, // Força a sessão a ser regravada no armazenamento
    saveUninitialized: true, // Salva sessões não inicializadas (vazias)
  })
);

app.use(passport.initialize()); // Inicializa o Passport para autenticação
app.use(passport.session()); // Configura o Passport para usar sessões

/*app.use(
  session({
    secret: "secretcode", // Chave secreta usada para criptografar a sessão
    resave: true, // Força a sessão a ser regravada no armazenamento
    saveUninitialized: true, // Salva sessões não inicializadas (vazias)
    cookie: {
      secure: false, // Defina como true se estiver usando HTTPS
      maxAge: 3600000, // Tempo de vida do cookie da sessão em milissegundos (1 hora neste exemplo)
    },
  })
);*/

passport.serializeUser((user: any, done: any) => {
  return done(null, user); // Função para serializar o usuário (armazenar na sessão)
});

passport.deserializeUser((user: any, done: any) => {
  return done(null, user); // Função para desserializar o usuário (recuperar da sessão)
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "483922791543-k64unliohtrncpe20rbl1nh2gg171v0p.apps.googleusercontent.com", // ID do cliente do Google
      clientSecret: "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", // Chave secreta do cliente do Google
      callbackURL: "/auth/google/callback", // URL de retorno após a autenticação do Google
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      console.log(profile); // Registra os detalhes do perfil do usuário autenticado
      cb(null, profile); // Chama de volta (callback) com o perfil do usuário
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "729058979032529",
      clientSecret: "de94d440353eb3aa8b2e4fded2a5f601",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      console.log(profile); // Registra os detalhes do perfil do usuário autenticado
      cb(null, profile); // Chama de volta (callback) com o perfil do usuário
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
); // Rota para iniciar a autenticação do Google

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }), // Rota para lidar com o retorno da autenticação do Google
  function (req, res) {
    // Autenticação bem-sucedida, redireciona para a página inicial.
    res.redirect("http://localhost:3100");
  }
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3100");
  }
);

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});

app.get("/getuser", (req, res) => {
  res.send(req.user);
});

/*app.get("/logout", (req,res) => {
  if(req.user){
    req.logout();
    res.send("Logout Concluido");
  }
});*/

// define a rota para o pacote /routes
app.use(routes);
function cookieParser(): any {
  throw new Error("Function not implemented.");
}

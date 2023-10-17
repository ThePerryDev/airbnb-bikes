import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
const GoogleStrategy = require('passport-google-oauth20');

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app
const corsOptions = {
  origin: 'http://localhost:3000', // Permitir apenas esta origem
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permitir esses métodos HTTP
};
app.use(cors(corsOptions))
// suportar parâmetros JSON no body da requisição
app.use(express.json());
// inicializa o servidor na porta especificada
app.use(
  session({
    secret:"secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user:any, done:any) =>{
  return done(null, user);
});

passport.deserializeUser((user:any, done:any) =>{
  return done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: "483922791543-k64unliohtrncpe20rbl1nh2gg171v0p.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "/auth/google/callback"
},
function(accessToken:any, refreshToken:any, profile:any, cb:any) {
  console.log(profile);
  cb(null, profile);
}));
  
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/home');
  });

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});

app.get("/getuser", (req,res) => {
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

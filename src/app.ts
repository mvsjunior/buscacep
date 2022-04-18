import helmet from 'helmet';
import express,{Request, Response} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mustache from 'mustache-express';
import https from 'https';
import fs from 'fs';
import mainRouter from './routes/index';

const app = express();


// ============================
// Setting View Engine
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.engine('mustache', mustache());


//app.use('/', mainRouter);


// =====================================
//  Caminho para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ============================
//  Rotas
app.use(mainRouter);

app.use((req: Request, res: Response) => {
    res.send("Página não encontrada");
});

// ======================
//  Helmet
app.use(helmet());

// ======================
//   HTTPS
dotenv.config();

let port = process.env.PORT || 3000 ;

https
  .createServer(
      {
          key: fs.readFileSync(path.join(__dirname, process.env.CERT_KEY_FILE)), 
          cert: fs.readFileSync(path.join(__dirname, process.env.CERT_FILE))
        },
        app )
        .listen(port, ()=>{
            console.log('server is runing at port ' + port)
        });

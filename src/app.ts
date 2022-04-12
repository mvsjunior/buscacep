import express,{Request, Response} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mustache from 'mustache-express';
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


app.listen(80);
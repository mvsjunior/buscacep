"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const mustache_express_1 = __importDefault(require("mustache-express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.set('view engine', 'mustache');
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('mustache', (0, mustache_express_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(index_1.default);
app.use((req, res) => {
    res.send("Página não encontrada");
});
app.use((0, helmet_1.default)());
dotenv_1.default.config();
let port = process.env.PORT || 3000;
https_1.default
    .createServer({
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, "key.pem")),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "cert.pem"))
}, app)
    .listen(port, () => {
    console.log('server is runing at port ' + port);
});

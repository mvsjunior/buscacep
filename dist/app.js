"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mustache_express_1 = __importDefault(require("mustache-express"));
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
app.listen(80);

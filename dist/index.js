"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const node_http_1 = __importDefault(require("node:http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const server = node_http_1.default.createServer(app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname
    .split("/")
    .slice(0, __dirname.split("/").length - 1)
    .join("/"), "public")));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../public/views"));
app.get("/", (req, res) => {
    res.render("index", { title: "Home", user: "Emmanuel" });
});
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    console.log("A new Socket has connected");
});
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

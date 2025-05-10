import express from "express";
const app = express();
import http from "node:http";
import path from "path";
import { Server } from "socket.io";
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    express.static(
        path.join(
            __dirname
                .split("/")
                .slice(0, __dirname.split("/").length - 1)
                .join("/"),
            "public"
        )
    )
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public/views"));

app.get("/", (req, res) => {
    res.render("index", { title: "Home", user: "Emmanuel" });
});

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A new Socket has connected");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

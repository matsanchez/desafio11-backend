import { configMysql, configSqlite } from "./options/db.config.js";
import { auth } from "./middleware/middlewares.js";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { Manager } from "./controllers/manager.js";
import userRouter from "./routes/login.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
const managerProductos = new Manager(configMysql, "productos");
const managerChat = new Manager(configSqlite, "mensajes");

const Store = FileStore(session);
const PORT = process.env.PORT || 8080;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`>>>>> 🚀 Server Up! Port: ${PORT} <<<<<`);
});

app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: new Store({
      path: "./src/sessions",
      ttl: 60,
    }),
    key: "user_sid",
    secret: "c0d3r",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/public/views");
app.set("view engine", "handlebars");
app.use("/api/auth/", userRouter);

const io = new Server(server);

app
  .get("/", auth, async (req, res) => {
    const user_sid = req.session.user;
    res.render("pages/home", { userLogin: user_sid });
  })
  .get("/api/productos-test", async (req, res) => {
    const productosRandom = await managerProductos.getRandomProducts();
    res.render("productos-test", { productos: productosRandom });
  });

io.on("connection", async (socket) => {
  console.log("🔛 Usuario Conectado");

  const loadProducts = async () => {
    const products = await managerProductos.getAll();
    const logChat = await managerChat.getAll();
    socket.emit("server:loadProducts", products);
    socket.emit("server:loadMessages", logChat);
  };
  loadProducts();

  const refreshList = async () => {
    const products = await managerProductos.getAll();
    io.emit("server:loadProducts", products);
  };

  socket.on("client:newProduct", async (obj) => {
    let id = await managerProductos.create(obj);
    let product = await managerProductos.getById(id);
    io.emit("server:newProduct", product);
  });

  socket.on("client:newMessage", async (obj) => {
    let id = await managerChat.create(obj);
    let message = await managerChat.getById(id);
    io.emit("server:newMessage", message);
  });

  socket.on("client:deleteProduct", async (id) => {
    await managerProductos.deleteById(id);
    refreshList();
  });

  socket.on("client:updateProduct", async (id) => {
    let prodId = await managerProductos.getById(id);
    socket.emit("server:updateProduct", prodId);
  });

  socket.on("cliente:sendUpdateProduct", async (prod) => {
    await managerProductos.updateById(prod);
    refreshList();
  });
});

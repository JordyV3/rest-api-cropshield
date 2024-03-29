import express from "express";
// import morgan from "morgan";
import cors from 'cors';
import analisisRoutes from "./routes/analisis.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

app.set('view engine', 'pug')
app.set('views', './views')

app.use( express.static('public') );

// app.use(morgan("dev"));
app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.use("/", indexRoutes);
app.use("/api", analisisRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { PORT } from "./config.js"; //importamos puerto desde archivo config

//import indexRoutes from "./routes/index.routes.js";
import userRoutes from "./routes/users.routes.js";
import clientRoutes from "./routes/clients.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

//me da toda la ruta hasta donde esta index.js
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors()); //para que se conecte cualquier servidor
app.use(express.json()); //permite procesar los datos del cliente y si es json va a poder recibirlo

app.use(userRoutes);
app.use(clientRoutes);
app.use(authRoutes);

app.use(express.static(join(__dirname, "../client/dist")));

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);

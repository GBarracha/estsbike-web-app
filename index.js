"use strict";

import express from "express";
import createTipoDeEvento from "./routes/create-tipoDeEvento.js";
import readTipoDeEvento from "./routes/read-tipoDeEvento.js";
import deleteTipoDeEvento from "./routes/delete-tipoDeEvento.js";
import updateTipoDeEvento from "./routes/update-tipoDeEvento.js";
import createEvento from "./routes/create-evento.js";
import readEvento from "./routes/read-evento.js";
import deleteEvento from "./routes/delete-evento.js";
import updateEvento from "./routes/update-evento.js";
import createMembro from "./routes/create-membro.js";
import readMembros from "./routes/read-membro.js"
import deleteMembro from "./routes/delete-membro.js";
import updateMembro from "./routes/update-membro.js";

const app = express();

app.use(express.static("www",{ "index": "index.html" }));
app.use(express.json());

app.get("/tiposDeEvento", readTipoDeEvento)
app.post("/tiposDeEvento", createTipoDeEvento);
app.delete("/tiposDeEvento/:id", deleteTipoDeEvento);
app.put("/tiposDeEvento/:id", updateTipoDeEvento);

app.get("/eventos", readEvento);
app.post("/eventos", createEvento);
app.delete("/eventos/:id", deleteEvento);
app.put("/eventos/:id", updateEvento);

app.get("/membros", readMembros);
app.post("/membros", createMembro);
app.delete("/membros/:id", deleteMembro);
app.put("/membros/:id", updateMembro);


app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});
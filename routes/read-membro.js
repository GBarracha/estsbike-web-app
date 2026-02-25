"use strict";

import {sendResponse, sendError} from "../scripts/db.js";

const commandReadMembros = "SELECT `id`, `nome` FROM `membros`";

const commandReadTipos = "SELECT mt.membro AS membroId, te.id AS tipoId, te.descritivo FROM membros_tipoDeEventos mt JOIN tipoDeEventos te ON mt.tipoDeEvento = te.id";

export default async function readMembros(request, response) {
    try {
        const membros = await sendResponse(null, commandReadMembros, [], (result) => result);

        const tipos = await sendResponse(null, commandReadTipos, [], (result) => result);

        const membrosMap = membros.map((membro) => ({
            id: membro.id,
            nome: membro.nome,
            tiposDeEventos: tipos
                .filter((tipo) => tipo.membroId === membro.id)
                .map((tipo) => ({ id: tipo.tipoId, descritivo: tipo.descritivo })),
        }));

        response.json(membrosMap);
    } catch (error) {
        console.error("Erro ao carregar membros:", error);
        sendError(response, "Erro interno ao carregar membros.", 500);
    }
}
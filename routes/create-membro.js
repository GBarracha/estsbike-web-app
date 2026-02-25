"use strict";

import {execute, string, number, sendError} from "../scripts/db.js";

const commandInsertMembro = "INSERT INTO `membros` (`nome`) VALUES (?)";

const commandInsertTipos = "INSERT INTO `membros_tipoDeEventos` (`membro`, `tipoDeEvento`) VALUES (?, ?)";

export default async function createMembro(request, response) {
    try {
        const nome = string(request.body.nome);
        const tiposDeEventos = request.body.tiposDeEventos;

        if (!nome || !Array.isArray(tiposDeEventos)) {
            sendError(response, "Dados inválidos!", 400);
            return;
        }

        const result = await execute(commandInsertMembro, [nome]);
        if (!result || !result.insertId) {
            sendError(response, "Erro ao criar o membro!", 500);
            return;
        }

        const membroId = result.insertId;

        for (const tipoId of tiposDeEventos) {
            await execute(commandInsertTipos, [membroId, number(tipoId)]);
        }

        response.json({ id: membroId, nome, tiposDeEventos });
    } catch (error) {
        console.error("Erro ao criar membro:", error);
        sendError(response, "Erro interno ao criar membro.", 500);
    }
}
"use strict";

import { number, string, execute, sendResponse, sendError } from "../scripts/db.js";

const commandUpdateNome = "UPDATE membros SET nome = ? WHERE id = ?";

const commandDeleteTipos = "DELETE FROM membros_tipoDeEventos WHERE membro = ?";

const commandInsertTipos = "INSERT INTO membros_tipoDeEventos (membro, tipoDeEvento) VALUES (?, ?)";

export default async function updateMembro(request, response) {
    const membroId = number(request.params.id);
    const nome = string(request.body.nome);
    const tiposDeEventos = request.body.tiposDeEventos;

    if (!membroId || !nome || !Array.isArray(tiposDeEventos)) {
        sendError(response, "Dados inválidos!", 400);
        return;
    }

    const resultUpdateNome = await execute(commandUpdateNome, [nome, membroId]);
    if (!resultUpdateNome || resultUpdateNome.affectedRows === 0) {
        sendError(response, "Erro ao atualizar o nome ou membro não encontrado!", 404);
        return;
    }

    const resultDeleteTipos = await execute(commandDeleteTipos, [membroId]);
    if (!resultDeleteTipos) {
        sendError(response, "Erro ao atualizar os tipos de eventos!", 500);
        return;
    }

    let sucesso = true;
    for (const tipoId of tiposDeEventos) {
        const resultInsertTipo = await execute(commandInsertTipos, [membroId, number(tipoId)]);
        if (!resultInsertTipo) {
            sucesso = false;
            break;
        }
    }

    if (!sucesso) {
        sendError(response, "Erro ao associar os novos tipos de eventos!", 500);
        return;
    }

    response.json({ id: membroId, nome, tiposDeEventos });
}

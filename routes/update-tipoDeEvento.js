"use strict";

import {number, string, sendResponse, sendError} from "../scripts/db.js";

const commandUpdate = "UPDATE `tipoDeEventos` SET `descritivo` = ? WHERE `id` = ?";

export default async function updateTipoDeEvento(request, response) {
    let id = number(request.params.id);
    let descritivo = string(request.body.descritivo);

    if (id && descritivo) {
        await sendResponse(response, commandUpdate, [descritivo, id], (result) => ({ count: result.affectedRows }));
    } else {
        sendError(response, "Dados inválidos!", 400);
    }
}
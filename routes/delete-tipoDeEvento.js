"use strict";

import {number, sendResponse, sendError} from "../scripts/db.js";

const commandDelete = "DELETE FROM `tipoDeEventos` WHERE `id` = ?";

export default async function deleteTipoDeEvento(request, response) {
    let id = number(request.params.id);
    if (id) {
        await sendResponse(response, commandDelete, [id], (result) => ({ count: result.affectedRows }));
    } else {
        sendError(response, "Deve selecionar um Tipo de Evento válido!");
    }
}
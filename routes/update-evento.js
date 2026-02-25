"use strict";

import {number, date, string, sendResponse, sendError} from "../scripts/db.js";

const commandUpdate = "UPDATE `eventos` SET `descritivo` = ?, tipoDeEvento = ?, data = ? WHERE `id` = ?";

export default async function updateTipoDeEvento(request, response) {
    let id = number(request.params.id);
    let descritivo = string(request.body.descritivo);
    let tipoDeEvento = number(request.body.tipoDeEvento);
    let data = date(request.body.data);

    if (id && descritivo && tipoDeEvento, data) {
        await sendResponse(response, commandUpdate, [descritivo, tipoDeEvento,data, id], (result) => ({ count: result.affectedRows }));
    } else {
        sendError(response, "Dados inválidos!", 400);
    }
}
"use strict";

import {sendResponse} from "../scripts/db.js";

const commandRead = "SELECT `id`, `descritivo` FROM `tipoDeEventos`";

export default async function readTipoDeEvento(request, response) {
    const processResult = (result) => result.map(row => ({
        id: row.id,
        descritivo: row.descritivo
    }));

    await sendResponse(response, commandRead, [], processResult);
};
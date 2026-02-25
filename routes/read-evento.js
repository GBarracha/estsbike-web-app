"use strict";

import {sendResponse} from "../scripts/db.js";

const commandRead = "SELECT e.id, e.descritivo, e.data, t.descritivo AS tipo FROM eventos e JOIN tipoDeEventos t ON e.tipoDeEvento = t.id";

export default async function readEvento(request, response) {
    const processResult = (result) => result.map(row => ({
        id: row.id,
        descritivo: row.descritivo,
        data: row.data,
        tipoDeEvento: row.tipo,
    }));

    await sendResponse(response, commandRead, [], processResult);
};
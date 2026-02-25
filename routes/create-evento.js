"use strict";

import {number, string, date, sendResponse, sendError} from "../scripts/db.js";

const commandCreate = "INSERT INTO `eventos` (`descritivo`,`tipoDeEvento`, `data`) VALUES (?,?,?)";

export default async function createEvento(request, response){
    let descritivo = string(request.body.descritivo);
    let tipoDeEvento = number(request.body.tipoDeEvento);
    let dataEvento = date(request.body.data);
    if(descritivo){
        await sendResponse(response, commandCreate, [descritivo, tipoDeEvento,dataEvento], (result) => ({
            id: result.insertId,
            descritivo,
            tipoDeEvento,
            data: dataEvento,
        }));
    }else{
        sendError(response, "Deve inserir um descritivo para o Evento válido!");
    }
}
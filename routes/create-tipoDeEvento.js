"use strict"

import {string, sendResponse, sendError} from "../scripts/db.js";

const commandCreate = "INSERT INTO `tipoDeEventos` (`descritivo`) VALUES (?)";

export default async function createTipoDeEvento(request, response){
    let descritivo = string(request.body.descritivo);
    if(descritivo){
        await sendResponse(response, commandCreate, [descritivo], (result) => ({
            id: result.insertId,
            descritivo
        }));
    }else{
        sendError(response, "Deve inserir um descritivo para o Tipo de Evento válido!");
    }
}
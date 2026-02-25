"use strict";

import mysql from "mysql2/promise";
import connectionOptions from "./connection-options.js";

/*Este ficheiro é uma adaptação do ficheiro disponibilizado pelo professor Rui César das Neves "db.js" */

async function execute(command, parameters = []) {
    let connection;
    try {
        connection = await mysql.createConnection(connectionOptions);
        let [result] = await connection.execute(command, parameters);
        return result;
    } catch (error) {
        return void 0;
    } finally {
        connection?.end();
    }
}

function number(value) {
    let result = Number(value);
    return isNaN(result) ? void 0 : result;
}

function string(value) {
    return value === undefined ? void 0 : String(value);
}

function date(value) {
    let result = new Date(String(value));
    return isNaN(result.getTime()) ? void 0 : result.toISOString().slice(0, 10);
}

function sendError(response, error = "", status = 400) {
    response.status(status).end(typeof error === "string" ? error : "");
}

async function sendResponse(response, command, parameters, processResult) {
    let result = await execute(command, parameters);

    if (result) {
        if (response) {
            response.json(processResult(result));
        } else {
            return processResult(result);
        }
    } else {
        sendError(response, "Erro do servidor ao carregar o seu pedido!", 500);
    }
}

export {execute, number, string, date,sendError, sendResponse};
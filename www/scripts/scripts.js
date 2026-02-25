"use strict";


class TiposDeEventos {
    #id;
    #descritivo;

    /*
     * Construtor para inicializar um novo tipo de evento.
     * Atribui um id único para o tipo de evento e define o descritivo.
     */
    constructor(id, descritivo) {
        this.#id = id;
        this.#descritivo = descritivo;
    }

    /*
     * Retorna o id único do tipo de evento.
     */
    get id() {
        return this.#id;
    }

    /*
     * Retorna o descritivo do tipo de evento.
     */
    get descritivo() {
        return this.#descritivo;
    }

    /*
     * Define o descritivo do tipo de evento.
     * Valida se o novo descritivo é uma string não vazia e não um número.
     */
    set descritivo(newDescritivo) {
        if (typeof newDescritivo === "string" && newDescritivo.trim().length > 0) {
            this.#descritivo = newDescritivo;
        }
    }

    /*
     * Método estático que cria uma linha de cabeçalho da tabela para o tipo de evento.
     * Retorna a linha com os cabeçalhos "Id" e "Descritivo".
     */
    static toTrHd = function () {
        return createElementsRow("tr", "th", ["Id", "Descritivo"]);
    };

    /*
     * Método de instância que cria uma linha da tabela com os dados do tipo de evento.
     * Retorna uma linha com o id e o descritivo do tipo de evento.
     */
    toTrBd = function () {
        return createElementsRow("tr", "td", [this.id, this.descritivo]);
    };
}

class Eventos {
    #id;
    #descritivo;
    #data;
    #tiposDeEventos;

    /*
     * Construtor para inicializar um novo evento.
     * Atribui um id único para o evento, define o descritivo e a data.
     * Os tipos de eventos são passados como uma lista opcional.
     */
    constructor(id, descritivo, data, tiposDeEventos = []) {
        this.#id = id;
        this.descritivo = descritivo;
        this.data = new Date(data);
        this.#tiposDeEventos = Array.isArray(tiposDeEventos) ? tiposDeEventos : [];
    }

    /*
     * Retorna o id único do evento.
     */
    get id() {
        return this.#id;
    }

    /*
     * Retorna o descritivo do evento.
     */
    get descritivo() {
        return this.#descritivo;
    }

    /*
     * Define o descritivo do evento.
     * Valida se o novo descritivo é uma string não vazia e não um número.
     */
    set descritivo(newDescritivo) {
        if (newDescritivo && typeof newDescritivo === "string" && isNaN(newDescritivo)) {
            this.#descritivo = newDescritivo;
        } else {
            alert("Descritivo impossível");
            throw new Error("Descritivo impossível");
        }
    }

    /*
     * Retorna a data do evento.
     */
    get data() {
        return this.#data;
    }

    /*
     * Define a data do evento.
     * Valida se a data é válida.
     */
    set data(newData) {
        const parsedDate = new Date(newData);
        if (!isNaN(parsedDate)) {
            this.#data = parsedDate;
        } else {
            throw new Error("Data inválida");
        }
    }

    /*
     * Retorna os tipos de eventos associados ao evento.
     */
    get tiposDeEventos() {
        return this.#tiposDeEventos;
    }

    /*
     * Define os tipos de eventos associados ao evento.
     * Valida se os tipos são instâncias da classe TiposDeEventos.
     */
    set tiposDeEventos(newTipos) {
        if (Array.isArray(newTipos) && newTipos.every((tipo) => tipo instanceof TiposDeEventos)) {
            this.#tiposDeEventos = newTipos;
        } else {
            throw new Error("Tipos inválidos");
        }
    }

    /*
     * Adiciona um tipo de evento ao evento.
     * Valida se o tipo de evento é uma instância da classe TiposDeEventos.
     */
    addTipoDeEvento(tipo) {
        if (tipo instanceof TiposDeEventos) {
            this.#tiposDeEventos.push(tipo);
        } else {
            throw new Error("Tipo inválido");
        }
    }

    /*
     * Método estático que cria uma linha de cabeçalho da tabela para o evento.
     * Retorna a linha com os cabeçalhos "Id", "Descritivo", "Data" e "Tipos de Eventos".
     */
    static toTrHd = function () {
        return createElementsRow("tr", "th", ["Id", "Descritivo", "Data", "Tipos de Eventos"]);
    };

    /*
     * Método de instância que cria uma linha da tabela com os dados do evento.
     * Retorna uma linha com o id, descritivo, data formatada e tipos de eventos.
     */
    toTrBd = function () {
        const tipos = this.#tiposDeEventos.map((t) => t.descritivo).join(", ");
        return createElementsRow("tr", "td", [
            this.id,
            this.descritivo,
            this.data.toLocaleDateString(),
            tipos,
        ]);
    };
}

class Membros {
    #id;
    #nome;
    #tiposDeEventos;
    #eventos;

    /*
     * Construtor para inicializar um novo membro.
     * Atribui um id único ao membro e define o nome.
     * Os tipos de eventos e eventos associados são opcionais.
     */
    constructor(id, nome, tiposDeEventos = []) {
        this.#id = id;
        this.nome = nome;
        this.#tiposDeEventos = Array.isArray(tiposDeEventos) ? tiposDeEventos : [];
        this.#eventos = [];
    }

    /*
     * Retorna o id único do membro.
     */
    get id() {
        return this.#id;
    }

    /*
     * Retorna o nome do membro.
     */
    get nome() {
        return this.#nome;
    }

    /*
     * Define o nome do membro.
     * Valida se o novo nome é uma string não vazia e não um número.
     */
    set nome(newNome) {
        if (newNome && typeof newNome === "string" && isNaN(newNome)) {
            this.#nome = newNome;
        } else {
            alert("Descritivo impossível");
            throw new Error("Nome inválido");
        }
    }

    /*
     * Retorna os tipos de eventos preferidos pelo membro.
     */
    get tiposDeEventos() {
        return this.#tiposDeEventos;
    }

    /*
     * Define os tipos de eventos preferidos pelo membro.
     * Valida se os tipos são instâncias da classe TiposDeEventos.
     */
    set tiposDeEventos(newTipos) {
        if (Array.isArray(newTipos) && newTipos.every((tipo) => tipo instanceof TiposDeEventos)) {
            this.#tiposDeEventos = newTipos;
        } else {
            throw new Error("Tipos inválidos");
        }
    }

    /*
     * Retorna os eventos associados ao membro.
     */
    get eventos() {
        return this.#eventos;
    }

    /*
     * Define os eventos associados ao membro.
     * Valida se os novos eventos são instâncias da classe Eventos.
     */
    set eventos(newEventos) {
        if (Array.isArray(newEventos) && newEventos.every((evento) => evento instanceof Eventos)) {
            this.#eventos = newEventos;
        } else {
            throw new Error("Eventos inválidos");
        }
    }

    /*
     * Método estático que cria uma linha de cabeçalho da tabela para o membro.
     * Retorna a linha com os cabeçalhos "Id" e "Nome".
     */
    static toTrHd = function (){
        return createElementsRow("tr", "th", ["Id", "Nome"]);
    };

    /*
     * Método de instância que cria uma linha da tabela com os dados do membro.
     * Retorna uma linha com o id e nome do membro.
     */
    toTrBd = function () {
        return createElementsRow("tr", "td", [this.id, this.nome]);
    };
}

 /*
     * Função auxiliar para criar uma linha de elementos HTML (como <tr>, <th>, <td>).
     * Recebe o tipo de contêiner, o tipo de elemento e os dados a serem inseridos.
     */
const createElementsRow = function (containerTag, elementTag, ats) {
    let container = document.createElement(containerTag);
    ats.forEach(function (at) {
        let elem = document.createElement(elementTag);
        elem.textContent = at;
        return container.appendChild(elem);
    });
    return container;
};

/**
 * Inicialização de variaveis globais para a facilidade de acesso e manipulação das mesmas durante produção do código.
 * Um array de eventos que irá conter todos os eventos criados.
 * Um array de membros que irá conter todos os membros criados.
 * Um array de tipos de eventos que irá conter todos os tipos de eventos criados.
 * Uma variável currentView que nos permite saber em que tabela estamos no momento da ação.
 * Uma variável selectedEvent que indica se temos alguma linha selecionada.
 * Uma constante breakLine que nos permite reutilizar durante o código.
 */
let currentView = "TiposDeEventos"; 
let eventos = [];
let membros = [];
let tiposDeEventos = [];
let selectedEvent = null;
const br = document.createElement("br");

/* A função window.onload é chamada assim que a página é carregada. Ela
   configura os links de navegação e os botões, além de inicializar o conteúdo da página. */
window.onload = async function () {
    const tabelaContainer = document.getElementById("tabelas");
    const tiposLink = document.getElementById("tipoEventos");
    const eventosLink = document.getElementById("eventos");
    const membrosLink = document.getElementById("membros");


    /* Define o comportamento ao clicar no link "TiposDeEventos". Quando clicado,
       o conteúdo é alterado para mostrar os tipos de eventos. */
    tiposLink.addEventListener("click", async function (e) {
        e.preventDefault();
        currentView = "TiposDeEventos";
        await carregarTiposDeEventos();
        renderTiposDeEventos(tabelaContainer);
    });

    /* Define o comportamento ao clicar no link "Eventos". Quando clicado,
       o conteúdo é alterado para mostrar os eventos. */
    eventosLink.addEventListener("click", async function (e) {
        e.preventDefault();
        currentView = "Eventos";
        await carregarEventos();
        renderEventos(tabelaContainer);
    });

    /* Define o comportamento ao clicar no link "Membros". Quando clicado,
       o conteúdo é alterado para mostrar os membros. */
    membrosLink.addEventListener("click", async function (e) {
        e.preventDefault();
        currentView = "Membros";
        await carregarMembros();
        renderMembros(tabelaContainer);
    });

    /* Obtém referências aos botões da interface: Criar, Editar e Apagar. */
    const criarBotao = document.getElementById("criar");
    const editarBotao = document.getElementById("editar");
    const apagarBotao = document.getElementById("apagar");

    /* Define o comportamento ao clicar no botão "Criar". Dependendo da view 
       atual (TiposDeEventos, Eventos ou Membros), o formulário correspondente
       é renderizado para criação de novos itens. */
    criarBotao.addEventListener("click", function (e) {
        e.preventDefault();
        if (currentView === "Eventos") {
            renderFormEventos(tabelaContainer, "criar");
        } else if(currentView === "TiposDeEventos") {
            renderForm(tabelaContainer, "criar");
        } else {
            renderFormMembros(tabelaContainer, "criar");
        }
    });

    /* Define o comportamento ao clicar no botão "Editar". Se um item estiver
       selecionado, um formulário de edição será renderizado. Caso contrário, um alerta
       será mostrado pedindo para selecionar uma linha primeiro. */
    editarBotao.addEventListener("click", function (e) {
        e.preventDefault();
        if (!selectedEvent) {
            alert("Por favor, selecione uma linha para editar.");
            return;
        }
        if (currentView === "Eventos") {
            renderFormEventos(tabelaContainer, "editar", selectedEvent);
        } else if(currentView === "TiposDeEventos") {
            renderForm(tabelaContainer, "editar", selectedEvent);
        } else {
            renderFormMembros(tabelaContainer, "editar", selectedEvent);
        }
    });

    /* Define o comportamento ao clicar no botão "Apagar". Se um item estiver
       selecionado, ele será excluído. Caso contrário, um alerta será mostrado pedindo
       para selecionar uma linha primeiro. */
    apagarBotao.addEventListener("click", function (e) {
        e.preventDefault();
        if (!selectedEvent) {
            alert("Por favor, selecione uma linha para excluir.");
            return;
        }
        if (currentView === "Eventos") {
            excluirEvento(selectedEvent).then(() => {renderEventos(tabelaContainer);});
            
        } else if(currentView === "TiposDeEventos") {
            excluirTipoDeEvento(selectedEvent);
            renderTiposDeEventos(tabelaContainer);
        } else {
            excluirMembro(selectedEvent);
            renderMembros(tabelaContainer);
        }
        selectedEvent = null;
    });

    /* Inicializa a visualização com a exibição dos tipos de eventos. */
    await carregarTiposDeEventos()
    renderTiposDeEventos(tabelaContainer);
};

/* Função para excluir um tipo de evento. Ela verifica se o tipo de evento
   está associado a algum evento ou membro. Se estiver, não permite a exclusão
   e exibe um alerta. Caso contrário, o tipo de evento é removido da lista. */
async function excluirTipoDeEvento(tipo) {
    const tipoEmUso = eventos.some((evento) => evento.tiposDeEventos.includes(tipo));
    const tipoEmUsoPorMembro = membros.some((membro) =>
        membro.tiposDeEventos.includes(tipo)
    );

    if (tipoEmUso) {
        alert("Este Tipo de Evento não pode ser excluído porque está associado a um ou mais eventos.");
        return;
    } else if(tipoEmUsoPorMembro){
        alert("Este Tipo de Evento não pode ser excluído porque está associado aos tipos preferidos de um ou mais membros.");
        return; 
    }
        const response = await fetch(`/tiposDeEvento/${tipo.id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            const index = tiposDeEventos.indexOf(tipo);
            if (index !== -1) {
                tiposDeEventos.splice(index, 1);
            }
            alert("Tipo de Evento excluído com sucesso!");
        } else {
            alert("Erro ao excluir o Tipo de Evento!");
        }
}

/* Função para excluir um evento. Ela verifica se o evento está associado a algum membro.
   Se estiver, não permite a exclusão e exibe um alerta. Caso contrário, o evento é removido da lista. */
async function excluirEvento(evento) {
    const eventoEmUsoPorMembro = membros.some((membro) =>
        membro.eventos.includes(evento)
    );

    if (eventoEmUsoPorMembro) {
        alert("Este Evento não pode ser excluído porque está associado a um ou mais membros.");
        return;
    }
        const response = await fetch(`/eventos/${evento.id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            eventos = eventos.filter(e => e.id !== evento.id);
            alert("Evento excluido com sucesso!")
        } else {
            alert("Erro ao excluir o Evento!");
        }
}

/* Função para renderizar o formulário de criação ou edição de tipos de eventos.
   A função é dinâmica, adaptando-se para criação ou edição conforme o parâmetro "mode". */
function renderForm(container, mode, tipoSelecionado = null) {
    /* Limpa o conteúdo atual do container antes de renderizar o novo formulário. */
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    /* Criação do formulário de tipo de evento. */
    const form = document.createElement("form");
    form.id = "tipoEventoForm";

    /* Criação do rótulo para o campo de "descritivo". */
    const label = document.createElement("label");
    label.textContent = "Descritivo: ";
    label.setAttribute("for", "descritivoInput");

    /* Criação do campo de entrada (input) para o "descritivo". */
    const input = document.createElement("input");
    input.type = "text";
    input.id = "descritivoInput";
    input.name = "descritivo";

    /* Se o modo for "editar", o valor do campo de entrada é preenchido com o valor do "descritivo"
       do tipo de evento selecionado. */
    if (mode === "editar" && tipoSelecionado) {
        input.value = tipoSelecionado.descritivo;
    }

    /* Criação do botão de submissão. O texto do botão muda dependendo do modo ("Criar" ou "Gravar"). */
    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = mode === "criar" ? "Criar" : "Gravar";

    /* Ação do botão de submissão: ao ser clicado, verifica se o campo "descritivo" não está vazio.
       Se válido, cria ou edita um tipo de evento. */
    submitButton.addEventListener("click", async function () {
        const descritivo = input.value.trim();
        if (!descritivo) {
            alert("O campo descritivo não pode estar vazio!");
            return;
        }

        if (mode === "criar") {
                const response = await fetch("/tiposDeEvento", {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({descritivo}),
                });

                if(response.ok){
                    const novoTipo = await response.json();
                    tiposDeEventos.push(new TiposDeEventos(novoTipo.id, novoTipo.descritivo));
                    alert("Tipo de Evento criado com sucesso!");
                }else{
                    alert("Erro ao criar o Tipo de Evento!")
                }
            
            
        } else if (mode === "editar" && tipoSelecionado) {
                const response = await fetch(`/tiposDeEvento/${tipoSelecionado.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({descritivo}),
                });
    
                if (response.ok) {
                    const atualizado = await response.json();
                    tipoSelecionado.descritivo = atualizado.descritivo;
                    alert("O Tipo de Evento foi atualizado com sucesso!");
                } else {
                    alert("Erro ao atualizar o Tipo de Evento!");
                }
        }

        /* Após a criação ou edição, o conteúdo dos tipos de eventos é re-renderizado. */
        carregarTiposDeEventos();
        renderTiposDeEventos(container);
    });

    /* Criação do botão de cancelamento. Ao ser clicado, o formulário é descartado e
       a lista de tipos de eventos é re-renderizada. */
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener("click", function () {
        renderTiposDeEventos(container);
    });

    /* Adiciona os elementos (rótulo, campo de entrada, botões) ao formulário. */
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
    form.appendChild(input);
    form.appendChild(document.createElement("br"));
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    /* Adiciona o formulário ao container da página. */
    container.appendChild(form);
}

/* Função para renderizar o formulário de criação ou edição de eventos. 
   A função adapta-se para criação ou edição conforme o parâmetro "mode". */
   function renderFormEventos(container, mode, eventoSelecionado = null) {
    /* Limpa o conteúdo atual do container antes de renderizar o novo formulário. */
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    /* Criação do formulário de evento. */
    const form = document.createElement("form");
    form.id = "eventoForm";

    /* Criação do campo para selecionar o tipo de evento. */
    const labelTipo = document.createElement("label");
    labelTipo.textContent = "Tipo de Evento: ";
    const select = document.createElement("select");

    /* Popula o select com as opções dos tipos de evento. */
    tiposDeEventos.forEach((tipo) => {
        const option = document.createElement("option");
        option.value = tipo.id;
        option.textContent = tipo.descritivo;

        /* Se for modo "editar", o tipo de evento selecionado será marcado. */
        if (mode === "editar" && eventoSelecionado && eventoSelecionado.tiposDeEventos.includes(tipo)) {
            option.selected = true;
        }

        select.appendChild(option);
    });

    /* Criação do campo de descrição do evento. */
    const labelDesc = document.createElement("label");
    labelDesc.textContent = "Descritivo: ";
    const inputDesc = document.createElement("input");
    inputDesc.type = "text";
    inputDesc.value = mode === "editar" && eventoSelecionado ? eventoSelecionado.descritivo : "";

    /* Criação do campo de data do evento. */
    const labelData = document.createElement("label");
    labelData.textContent = "Data: ";
    const inputData = document.createElement("input");
    inputData.type = "date";
    inputData.value =
        mode === "editar" && eventoSelecionado
            ? eventoSelecionado.data.toISOString().split("T")[0]
            : "";

    /* Criação do botão para submeter o formulário. */
    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Gravar";
    submitButton.addEventListener("click", async function () {
        const tipoSelecionado = tiposDeEventos.find((tipo) => tipo.id == select.value);
        const descritivo = inputDesc.value.trim();
        const data = inputData.value;

        /* Verifica se todos os campos estão preenchidos. */
        if (!descritivo || !data) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        /* Se for modo "criar", cria um novo evento. Caso contrário, edita o evento existente. */
        if (mode === "criar") {
                const response = await fetch("/eventos", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        descritivo,
                        tipoDeEvento: tipoSelecionado.id,
                        data,
                    }),
                });
                if (response.ok) {
                    const novoEvento = await response.json();
                    eventos.push(
                        new Eventos(
                            novoEvento.id,
                            novoEvento.descritivo,
                            novoEvento.data,
                            [tipoSelecionado]
                        )
                    );
                    alert("Evento criado com sucesso!");
                } else {
                    alert("Erro ao criar evento!");
                }
        } else if (mode === "editar" && eventoSelecionado) {
            try{
                eventoSelecionado.descritivo = descritivo;
                eventoSelecionado.data = new Date(data);
                eventoSelecionado.tiposDeEventos = [tipoSelecionado]; 
                await atualizarEvento(eventoSelecionado)
            }catch(error){
                console.error("Erro ao atualizar o Evento:", error);
            }
            
            
            
        }

        /* Após a criação ou edição, a lista de eventos é re-renderizada. */
        await carregarEventos();
        renderEventos(container);
    });

    /* Criação do botão de cancelamento que retorna à visualização dos eventos. */
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener("click", function () {
        renderEventos(container);
    });

    /* Adiciona os campos e botões ao formulário. */
    form.appendChild(labelTipo);
    form.appendChild(select);
    form.appendChild(document.createElement("br"));
    form.appendChild(labelDesc);
    form.appendChild(inputDesc);
    form.appendChild(document.createElement("br"));
    form.appendChild(labelData);
    form.appendChild(inputData);
    form.appendChild(document.createElement("br"));
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    /* Adiciona o formulário ao container da página. */
    container.appendChild(form);
}

/* Função para renderizar o formulário de criação ou edição de membros.
   A função adapta-se para criação ou edição conforme o parâmetro "mode". */
function renderFormMembros(container, mode, membroSelecionado = null) {
    /* Limpa o conteúdo atual do container antes de renderizar o novo formulário. */
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    /* Criação do formulário de membro. */
    const form = document.createElement("form");
    form.id = "membrosForm";

    /* Criação do campo de nome do membro. */
    const nomeLabel = document.createElement("label");
    nomeLabel.textContent = "Nome: ";
    nomeLabel.setAttribute("for", "nomeInput");

    const nomeInput = document.createElement("input");
    nomeInput.type = "text";
    nomeInput.id = "nomeInput";
    nomeInput.name = "nome";

    /* Se for modo "editar", o nome do membro será pré-preenchido. */
    if (mode === "editar" && membroSelecionado) {
        nomeInput.value = membroSelecionado.nome;
    }

    /* Criação do campo de tipos de eventos preferidos. */
    const tiposLabel = document.createElement("label");
    tiposLabel.textContent = "Tipos de Eventos Preferidos:";

    const tiposContainer = document.createElement("div");
    tiposDeEventos.forEach((tipo) => {
        const checkboxLabel = document.createElement("label");
        checkboxLabel.textContent = tipo.descritivo;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = tipo.id;

        /* Se for modo "editar", os tipos de eventos preferidos serão marcados. */
        if (mode === "editar" && membroSelecionado?.tiposDeEventos?.includes(tipo)) {
            checkbox.checked = true;
        }

        checkboxLabel.prepend(checkbox);
        tiposContainer.appendChild(checkboxLabel);
        tiposContainer.appendChild(document.createElement("br"));
    });

    /* Se for modo "editar", exibe a tabela de eventos inscritos e os botões de inscrição. */
    let eventosLabel, eventosTable, botoesEventosContainer;
    if (mode === "editar" && membroSelecionado) {
        eventosLabel = document.createElement("label");
        eventosLabel.textContent = "Eventos Inscritos:";

        eventosTable = document.createElement("table");
        const eventosHead = document.createElement("thead");
        const eventosBody = document.createElement("tbody");

        eventosHead.appendChild(createElementsRow("tr", "th", ["Id", "Descritivo", "Data"]));
        if (membroSelecionado?.eventos?.length === 0) {
            const emptyRow = createElementsRow("tr", "td", ["Nenhum evento inscrito"]);
            emptyRow.children[0].colSpan = 3;
            eventosBody.appendChild(emptyRow);
        } else {
            membroSelecionado.eventos.forEach((evento) => {
                const row = createElementsRow("tr", "td", [
                    evento.id,
                    evento.descritivo,
                    evento.data.toLocaleDateString(),
                ]);
                eventosBody.appendChild(row);
            });
        }

        eventosTable.appendChild(eventosHead);
        eventosTable.appendChild(eventosBody);

        botoesEventosContainer = document.createElement("div");

        /* Criação dos botões de inscrição e desinscrição de eventos. */
        const inscreverButton = document.createElement("button");
        inscreverButton.type = "button";
        inscreverButton.textContent = "Inscrever em Evento";

        const desinscreverButton = document.createElement("button");
        desinscreverButton.type = "button";
        desinscreverButton.textContent = "Desinscrever de Evento";

        inscreverButton.addEventListener("click", function () {
            /* Exibe as opções para inscrever o membro em um evento. */
            while (botoesEventosContainer.lastChild) {
                botoesEventosContainer.removeChild(botoesEventosContainer.lastChild);
            }

            const selectLabel = document.createElement("label");
            selectLabel.textContent = "Selecione um evento: ";

            const select = document.createElement("select");
            select.id = "selectEvento";

            const eventosDisponiveis = eventos.filter((evento) =>
                evento.tiposDeEventos.some((tipoEvento) =>
                    membroSelecionado.tiposDeEventos.includes(tipoEvento)
                )
            );

            if (eventosDisponiveis.length === 0) {
                alert("Não há eventos disponíveis compatíveis com os tipos preferidos do membro.");
                return;
            }

            eventosDisponiveis.forEach((evento) => {
                const option = document.createElement("option");
                option.value = evento.id;
                option.textContent = evento.descritivo;
                select.appendChild(option);
            });

            const confirmarButton = document.createElement("button");
            confirmarButton.type = "button";
            confirmarButton.textContent = "Confirmar Inscrição";

            confirmarButton.addEventListener("click", function () {
                const eventoId = parseInt(select.value);
                const eventoSelecionado = eventos.find((evento) => evento.id === eventoId);

                if (!eventoSelecionado) {
                    alert("Evento inválido!");
                    return;
                }

                if (!membroSelecionado.eventos.includes(eventoSelecionado)) {
                    membroSelecionado.eventos.push(eventoSelecionado);
                    
                    while (eventosBody.firstChild) {
                        eventosBody.removeChild(eventosBody.firstChild);
                    }

                    membroSelecionado.eventos.forEach((evento) => {
                        const row = createElementsRow("tr", "td", [
                            evento.id,
                            evento.descritivo,
                            evento.data.toLocaleDateString(),
                        ]);
                        eventosBody.appendChild(row);
                    });
                } else {
                    alert("O membro já está inscrito neste evento!");
                }

                while (botoesEventosContainer.lastChild) {
                    botoesEventosContainer.removeChild(botoesEventosContainer.lastChild);
                }

                botoesEventosContainer.appendChild(inscreverButton);
                botoesEventosContainer.appendChild(desinscreverButton);
            });

            botoesEventosContainer.appendChild(selectLabel);
            botoesEventosContainer.appendChild(select);
            botoesEventosContainer.appendChild(confirmarButton);
        });

        desinscreverButton.addEventListener("click", function () {
            if (!membroSelecionado.eventos.length) {
                alert("O membro não está inscrito em nenhum evento.");
                return;
            }

            while (botoesEventosContainer.lastChild) {
                botoesEventosContainer.removeChild(botoesEventosContainer.lastChild);
            }

            const selectLabel = document.createElement("label");
            selectLabel.textContent = "Selecione um evento para desinscrever: ";

            const select = document.createElement("select");
            membroSelecionado.eventos.forEach((evento) => {
                const option = document.createElement("option");
                option.value = evento.id;
                option.textContent = evento.descritivo;
                select.appendChild(option);
            });

            const confirmarButton = document.createElement("button");
            confirmarButton.type = "button";
            confirmarButton.textContent = "Confirmar Desinscrição";

            confirmarButton.addEventListener("click", function () {
                const eventoId = parseInt(select.value);
                const eventoSelecionado = membroSelecionado.eventos.find(
                    (evento) => evento.id === eventoId
                );

                if (!eventoSelecionado) {
                    alert("Evento inválido!");
                    return;
                }

                membroSelecionado.eventos = membroSelecionado.eventos.filter(
                    (evento) => evento.id !== eventoSelecionado.id
                );
                while (eventosBody.firstChild) {
                    eventosBody.removeChild(eventosBody.firstChild);
                }
                membroSelecionado.eventos.forEach((evento) => {
                    const row = createElementsRow("tr", "td", [
                        evento.id,
                        evento.descritivo,
                        evento.data.toLocaleDateString(),
                    ]);
                    eventosBody.appendChild(row);
                });

                while (botoesEventosContainer.lastChild) {
                    botoesEventosContainer.removeChild(botoesEventosContainer.lastChild);
                }

                botoesEventosContainer.appendChild(inscreverButton);
                botoesEventosContainer.appendChild(desinscreverButton);
            });

            botoesEventosContainer.appendChild(selectLabel);
            botoesEventosContainer.appendChild(select);
            botoesEventosContainer.appendChild(confirmarButton);
        });

        botoesEventosContainer.appendChild(inscreverButton);
        botoesEventosContainer.appendChild(desinscreverButton);
    }

    /* Criação do botão de salvar e do botão de cancelar. */
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = mode === "criar" ? "Criar" : "Salvar";
    saveButton.addEventListener("click", async function () {
        const nome = nomeInput.value.trim();
        if (!nome) {
            alert("O nome do membro não pode estar vazio!");
            return;
        }

        /* Coleta os tipos preferidos de eventos do membro. */
        /*const tiposPreferidos = Array.from(
            tiposContainer.querySelectorAll("input[type='checkbox']:checked")
        ).map((checkbox) => tiposDeEventos.find((tipo) => tipo.id == checkbox.value));*/
        const tiposPreferidos = Array.from(
            tiposContainer.querySelectorAll("input[type='checkbox']:checked")
        ).map((checkbox) => parseInt(checkbox.value));

        /* Se for modo "criar", cria um novo membro. Caso contrário, edita o membro existente. */
        if (mode === "criar") {
                const response = await fetch("/membros", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nome,
                        tiposDeEventos: tiposPreferidos,
                    }),
                });
                if (response.ok) {
                    const novoMembro = await response.json();
                    membros.push(
                        new Membros(
                            novoMembro.id,
                            novoMembro.nome,
                            novoMembro.tiposDeEventos.map((tipoId) =>
                                tiposDeEventos.find((tipo) => tipo.id === tipoId)
                            )
                        )
                    );
                    alert("Membro criado com sucesso!");
                } else {
                    alert("Erro ao criar membro!");
                }
        } else if (mode === "editar" && membroSelecionado) {
            membroSelecionado.nome = nome;
            membroSelecionado.tiposDeEventos = tiposPreferidos;
        }

        /* Após a criação ou edição, a lista de membros é re-renderizada. */
        renderMembros(container);
    });

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener("click", function () {
        renderMembros(container);
    });

    /* Adiciona os campos e botões ao formulário. */
    form.appendChild(nomeLabel);
    form.appendChild(nomeInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(tiposLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(tiposContainer);

    /* Se for modo "editar", exibe os eventos inscritos e os botões de inscrição/desinscrição. */
    if (mode === "editar" && membroSelecionado) {
        form.appendChild(eventosLabel);
        form.appendChild(eventosTable);
        form.appendChild(botoesEventosContainer);
    }

    /* Finaliza o formulário com os botões de salvar e cancelar. */
    form.appendChild(saveButton);
    form.appendChild(cancelButton);

    /* Adiciona o formulário ao container. */
    container.appendChild(form);
}

function renderTiposDeEventos(container) {
    /* Atualiza a vista atual para "TiposDeEventos", indicando que estamos exibindo tipos de eventos. */
    currentView = "TiposDeEventos";

    /* Limpa o conteúdo atual do container antes de renderizar os novos elementos. */
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    /* Criação da tabela para exibir os tipos de eventos. */
    const tabela = document.createElement("table");

    /* Criação do cabeçalho da tabela. */
    const head = document.createElement("thead");

    /* Criação do corpo da tabela. */
    const body = document.createElement("tbody");

    /* Preenche o cabeçalho da tabela com as colunas definidas na função 'TiposDeEventos.toTrHd()'. */
    head.appendChild(TiposDeEventos.toTrHd());

    /* Itera sobre cada tipo de evento na lista 'tiposDeEventos'. */
    tiposDeEventos.forEach((tipo) => {
        /* Para cada tipo de evento, cria uma linha de tabela representando esse tipo. */
        const row = tipo.toTrBd();

        /* Adiciona um ouvinte de evento de clique na linha da tabela. Quando a linha é clicada: */
        row.addEventListener("click", function () {
            /* Limpa qualquer seleção anterior. */
            clearSelection(container);

            /* Marca a linha clicada como selecionada. */
            row.classList.add("selected");

            /* Define o tipo de evento clicado como o tipo de evento selecionado. */
            selectedEvent = tipo;
        });

        /* Adiciona a linha recém-criada ao corpo da tabela. */
        body.appendChild(row);
    });

    /* Adiciona o cabeçalho e o corpo à tabela. */
    tabela.appendChild(head);
    tabela.appendChild(body);


    container.appendChild(tabela);
}

 /*
    Limpa o conteúdo do container, cria uma tabela para exibir eventos, 
    e preenche a tabela com as informações dos eventos. 
    Cada linha é clicável e, ao ser clicada, a linha é marcada como selecionada 
    e o evento correspondente é armazenado como selecionado.
    */
function renderEventos(container) {
    currentView = "Eventos";
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const tabela = document.createElement("table");
    const head = document.createElement("thead");
    const body = document.createElement("tbody");

    head.appendChild(Eventos.toTrHd());

    eventos.forEach((evento) => {
        const row = evento.toTrBd();
        row.addEventListener("click", function () {
            clearSelection(container);
            row.classList.add("selected");
            selectedEvent = evento;
        });

        body.appendChild(row);
    });

    tabela.appendChild(head);
    tabela.appendChild(body);
    container.appendChild(tabela);
}

/*
    Limpa o conteúdo do container, cria uma tabela para exibir membros, 
    e preenche a tabela com as informações dos membros. 
    Cada linha é clicável e, ao ser clicada, a linha é marcada como selecionada 
    e o membro correspondente é armazenado como selecionado.
    */
function renderMembros(container) {
    currentView = "Membros";
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const tabela = document.createElement("table");
    const head = document.createElement("thead");
    const body = document.createElement("tbody");

    head.appendChild(Membros.toTrHd());

    membros.forEach((membro) => {
        const row = membro.toTrBd();
        row.addEventListener("click", function () {
            clearSelection(container);
            row.classList.add("selected");
            selectedEvent = membro;
        });

        body.appendChild(row);
    });

    tabela.appendChild(head);
    tabela.appendChild(body);
    container.appendChild(tabela);
}

/*
    Limpa a seleção de qualquer linha previamente marcada no container.
    */
function clearSelection(container) {
    const rows = container.querySelectorAll(".selected");
    rows.forEach((row) => row.classList.remove("selected"));
    selectedEvent = null;
}

    /*
    Remove a classe 'selecionado' de todos os links da navegação e 
    adiciona essa classe ao link com o id fornecido.
    */
function selecionarLink(id) {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => link.classList.remove('selecionado'));

    const linkSelecionado = document.getElementById(id);
    linkSelecionado.classList.add('selecionado');
}

/*
    Adiciona ouvintes de clique para todos os links na navegação. 
    Quando um link é clicado, ele chama a função 'selecionarLink' para atualizar a seleção visual.
    */
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        selecionarLink(link.id);
      });
    });
});

async function carregarTiposDeEventos() {

        const response = await fetch("/tiposDeEvento");

        if (response.ok) {
            const tipos = await response.json();
            tiposDeEventos = tipos.map(tipo => new TiposDeEventos(tipo.id, tipo.descritivo));
        } else {
            alert("Erro ao carregar os Tipos de Eventos!");
        }
};

async function carregarEventos() {
    const response = await fetch("/eventos");
    if (response.ok) {
        const eventosServidor = await response.json();
        eventos = eventosServidor.map(
                (evento) =>
                    new Eventos(
                        evento.id,
                        evento.descritivo,
                        evento.data,
                        [tiposDeEventos.find((tipo) => tipo.descritivo === evento.tipoDeEvento)]
                )
        );
    } else {
            alert("Erro ao carregar os Eventos.");
    }
}

async function atualizarEvento(evento) {
        const response = await fetch(`/eventos/${evento.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                descritivo: evento.descritivo,
                tipoDeEvento: evento.tiposDeEventos[0].id,
                data: evento.data.toISOString().split("T")[0],
            }),
        });

        if (response.ok) {
            alert("Evento atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar o Evento!");
        }
}

async function criarMembro(nome, tiposDeEventos) {

    const response = await fetch("/membros", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ nome, tiposDeEventos: tiposDeEventos.map((tipo) => tipo.id) }),
        });

    if (response.ok) {            
        const novoMembro = await response.json();
        membros.push(new Membros(novoMembro.nome, novoMembro.tiposDeEventos));
        alert("Membro criado com sucesso!");
    } else {
        alert("Erro ao criar membro!");
    }
}

async function carregarMembros() {

        const response = await fetch("/membros");

        if (response.ok) {
            const membrosServidor = await response.json();
            membros = membrosServidor.map((membro) => 
                new Membros(
                    membro.id,
                    membro.nome,
                    membro.tiposDeEventos.map((tipo) =>
                        tiposDeEventos.find((t) => t.id === tipo.id) || tipo
                    )
                )
            );
        } else {
        alert("Erro ao carregar membros!");
    }
}

/* Função para excluir um membro da lista de membros. Ela verifica se o membro selecionado 
   está presente na lista e, em caso afirmativo, faz um pedido ao servidor do tipo DELETE e remove o membro.*/
async function excluirMembro(membroSelecionado) {

        const response = await fetch(`/membros/${membroSelecionado.id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Membro excluído com sucesso.");
            membros = membros.filter((membro) => membro.id !== membroSelecionado.id);
            renderMembros(document.getElementById("tabelas"));
        } else {
            alert("Erro ao excluir o Membro.");
        }
}


javascript
const listaExames =
    document.getElementById("listaExames");


// Recuperar resultados cadastrados

let resultados =
    JSON.parse(
        localStorage.getItem("resultadosExames")
    ) || [];


// Mostrar a data atual no relatório

function mostrarData() {

    const agora = new Date();

    const data =
        agora.toLocaleDateString("pt-BR");

    document.getElementById(
        "dataRelatorio"
    ).textContent =
        "Relatório emitido em: " + data;
}


// Mostrar todos os exames

function mostrarExames(lista = resultados) {

    listaExames.innerHTML = "";


    document.getElementById(
        "totalExames"
    ).textContent = lista.length;


    if (lista.length === 0) {

        listaExames.innerHTML = `
            <tr>
                <td colspan="6">
                    Nenhum exame encontrado.
                </td>
            </tr>
        `;

        return;
    }


    lista.forEach(function(item) {

        const linha =
            document.createElement("tr");


        let classeStatus = "status";


        if (item.status === "Concluído") {

            classeStatus += " concluido";

        } else if (item.status === "Pendente") {

            classeStatus += " pendente";

        } else {

            classeStatus += " analise";

        }


        linha.innerHTML = `

            <td>
                ${item.paciente}
            </td>

            <td>
                ${item.cpf}
            </td>

            <td>
                ${item.exame}
            </td>

            <td>
                ${formatarData(item.data)}
            </td>

            <td>
                ${item.medico}
            </td>

            <td>
                <span class="${classeStatus}">
                    ${item.status}
                </span>
            </td>

        `;


        listaExames.appendChild(linha);

    });

}


// Filtrar exames

function filtrarExames() {

    const paciente =
        document
            .getElementById("paciente")
            .value
            .toLowerCase();


    const tipo =
        document.getElementById(
            "tipoExame"
        ).value;


    const dataInicial =
        document.getElementById(
            "dataInicial"
        ).value;


    const dataFinal =
        document.getElementById(
            "dataFinal"
        ).value;


    const filtrados =
        resultados.filter(function(item) {

            const nomePaciente =
                item.paciente.toLowerCase();


            const correspondePaciente =
                paciente === "" ||
                nomePaciente.includes(paciente);


            const correspondeTipo =
                tipo === "" ||
                item.exame === tipo;


            const correspondeDataInicial =
                dataInicial === "" ||
                item.data >= dataInicial;


            const correspondeDataFinal =
                dataFinal === "" ||
                item.data <= dataFinal;


            return (
                correspondePaciente &&
                correspondeTipo &&
                correspondeDataInicial &&
                correspondeDataFinal
            );

        });


    mostrarExames(filtrados);

}


// Limpar filtros

function limparFiltros() {

    document.getElementById(
        "paciente"
    ).value = "";

    document.getElementById(
        "tipoExame"
    ).value = "";

    document.getElementById(
        "dataInicial"
    ).value = "";

    document.getElementById(
        "dataFinal"
    ).value = "";


    mostrarExames();

}


// Emitir relatório

function imprimirRelatorio() {

    window.print();

}


// Formatar data

function formatarData(data) {

    const partes =
        data.split("-");


    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


// Inicialização

mostrarData();

mostrarExames();

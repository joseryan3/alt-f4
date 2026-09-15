javascript
const form =
    document.getElementById("formResultado");

const listaResultados =
    document.getElementById("listaResultados");


// Recuperar resultados salvos

let resultados =
    JSON.parse(
        localStorage.getItem("resultadosExames")
    ) || [];


// Cadastrar resultado

form.addEventListener("submit", function(event) {

    event.preventDefault();


    const numero =
        document.getElementById(
            "numeroResultado"
        ).value;

    const paciente =
        document.getElementById(
            "paciente"
        ).value;

    const cpf =
        document.getElementById(
            "cpf"
        ).value;

    const exame =
        document.getElementById(
            "tipoExame"
        ).value;

    const data =
        document.getElementById(
            "data"
        ).value;

    const medico =
        document.getElementById(
            "medico"
        ).value;

    const status =
        document.getElementById(
            "status"
        ).value;

    const resultado =
        document.getElementById(
            "resultado"
        ).value;

    const observacoes =
        document.getElementById(
            "observacoes"
        ).value;


    // Criar objeto

    const novoResultado = {

        id: Date.now(),

        numero: numero,

        paciente: paciente,

        cpf: cpf,

        exame: exame,

        data: data,

        medico: medico,

        status: status,

        resultado: resultado,

        observacoes: observacoes

    };


    // Adicionar resultado

    resultados.push(novoResultado);


    // Salvar no navegador

    localStorage.setItem(
        "resultadosExames",
        JSON.stringify(resultados)
    );


    alert(
        "Resultado cadastrado com sucesso!"
    );


    // Limpar formulário

    form.reset();


    // Atualizar tabela

    mostrarResultados();

});


// Mostrar resultados

function mostrarResultados() {

    listaResultados.innerHTML = "";


    if (resultados.length === 0) {

        listaResultados.innerHTML = `
            <tr>
                <td colspan="7">
                    Nenhum resultado cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    resultados.forEach(function(item) {

        const linha =
            document.createElement("tr");


        let classeStatus;


        if (item.status === "Concluído") {

            classeStatus = "status-concluido";

        } else if (item.status === "Pendente") {

            classeStatus = "status-pendente";

        } else {

            classeStatus = "status-analise";

        }


        linha.innerHTML = `

            <td>
                ${item.numero}
            </td>

            <td>
                ${item.paciente}
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

            <td>

                <button
                    class="btn-excluir"
                    onclick="excluirResultado(${item.id})"
                >
                    Excluir
                </button>

            </td>

        `;


        listaResultados.appendChild(linha);

    });

}


// Excluir resultado

function excluirResultado(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir este resultado?"
        );


    if (!confirmar) {
        return;
    }


    resultados =
        resultados.filter(function(item) {

            return item.id !== id;

        });


    localStorage.setItem(
        "resultadosExames",
        JSON.stringify(resultados)
    );


    mostrarResultados();

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


// Carregar ao abrir a página

mostrarResultados();


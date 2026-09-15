javascript
const inputNumero =
    document.getElementById("numeroResultado");

const inputPaciente =
    document.getElementById("paciente");


// Recuperar resultados cadastrados

let resultados =
    JSON.parse(
        localStorage.getItem("resultadosExames")
    ) || [];


// Pesquisar resultado

function pesquisarResultado() {

    const numero =
        inputNumero.value
            .trim()
            .toLowerCase();

    const paciente =
        inputPaciente.value
            .trim()
            .toLowerCase();


    const resultado =
        resultados.find(function(item) {

            const correspondeNumero =
                numero === "" ||
                item.numero
                    .toLowerCase()
                    .includes(numero);


            const correspondePaciente =
                paciente === "" ||
                item.paciente
                    .toLowerCase()
                    .includes(paciente);


            return (
                correspondeNumero &&
                correspondePaciente
            );

        });


    if (!resultado) {

        alert(
            "Nenhum resultado de exame encontrado."
        );

        return;
    }


    // Mostrar os dados

    document.getElementById(
        "numeroExibido"
    ).textContent =
        "Nº " + resultado.numero;


    document.getElementById(
        "nomeExibido"
    ).textContent =
        resultado.paciente;


    document.getElementById(
        "cpfExibido"
    ).textContent =
        resultado.cpf;


    document.getElementById(
        "exameExibido"
    ).textContent =
        resultado.exame;


    document.getElementById(
        "dataExibida"
    ).textContent =
        formatarData(resultado.data);


    document.getElementById(
        "medicoExibido"
    ).textContent =
        resultado.medico;


    document.getElementById(
        "statusExibido"
    ).textContent =
        resultado.status;


    document.getElementById(
        "resultadoExibido"
    ).textContent =
        resultado.resultado;


    document.getElementById(
        "observacoesExibidas"
    ).textContent =
        resultado.observacoes ||
        "Nenhuma observação registrada.";

}


// Limpar pesquisa

function limparPesquisa() {

    inputNumero.value = "";

    inputPaciente.value = "";


    document.getElementById(
        "numeroExibido"
    ).textContent =
        "Nº do resultado";


    document.getElementById(
        "nomeExibido"
    ).textContent = "-";


    document.getElementById(
        "cpfExibido"
    ).textContent = "-";


    document.getElementById(
        "exameExibido"
    ).textContent = "-";


    document.getElementById(
        "dataExibida"
    ).textContent = "-";


    document.getElementById(
        "medicoExibido"
    ).textContent = "-";


    document.getElementById(
        "statusExibido"
    ).textContent = "-";


    document.getElementById(
        "resultadoExibido"
    ).textContent =
        "Nenhum resultado selecionado.";


    document.getElementById(
        "observacoesExibidas"
    ).textContent = "-";

}


// Emitir resultado

function imprimirResultado() {

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


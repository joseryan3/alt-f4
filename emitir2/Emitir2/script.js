javascript
const inputNumero =
    document.getElementById("numeroPedido");

const inputPaciente =
    document.getElementById("paciente");


// Recuperar pedidos cadastrados
// pela página "Cadastro Pedido Exame"

let pedidos =
    JSON.parse(
        localStorage.getItem("pedidosExames")
    ) || [];


// Pesquisar pedido

function pesquisarPedido() {

    const numero =
        inputNumero.value
            .trim()
            .toLowerCase();

    const paciente =
        inputPaciente.value
            .trim()
            .toLowerCase();


    const pedido =
        pedidos.find(function(item) {

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


    if (!pedido) {

        alert(
            "Nenhum pedido de exame encontrado."
        );

        return;
    }


    // Mostrar os dados

    document.getElementById(
        "numeroExibido"
    ).textContent =
        "Nº " + pedido.numero;


    document.getElementById(
        "nomeExibido"
    ).textContent =
        pedido.paciente;


    document.getElementById(
        "cpfExibido"
    ).textContent =
        pedido.cpf;


    document.getElementById(
        "exameExibido"
    ).textContent =
        pedido.exame;


    document.getElementById(
        "dataExibida"
    ).textContent =
        formatarData(pedido.data);


    document.getElementById(
        "prioridadeExibida"
    ).textContent =
        pedido.prioridade;


    document.getElementById(
        "medicoExibido"
    ).textContent =
        pedido.medico;


    document.getElementById(
        "observacoesExibidas"
    ).textContent =
        pedido.observacoes ||
        "Nenhuma observação registrada.";

}


// Limpar pesquisa

function limparPesquisa() {

    inputNumero.value = "";

    inputPaciente.value = "";


    document.getElementById(
        "numeroExibido"
    ).textContent =
        "Nº do pedido";


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
        "prioridadeExibida"
    ).textContent = "-";


    document.getElementById(
        "medicoExibido"
    ).textContent = "-";


    document.getElementById(
        "observacoesExibidas"
    ).textContent = "-";

}


// Emitir pedido

function imprimirPedido() {

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


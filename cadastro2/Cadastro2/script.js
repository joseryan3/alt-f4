javascript
const form = document.getElementById("formPedido");

const listaPedidos =
    document.getElementById("listaPedidos");


// Recuperar pedidos salvos
let pedidos =
    JSON.parse(localStorage.getItem("pedidosExames")) || [];


// Cadastrar pedido
form.addEventListener("submit", function(event) {

    event.preventDefault();


    const numero =
        document.getElementById("numeroPedido").value;

    const paciente =
        document.getElementById("paciente").value;

    const cpf =
        document.getElementById("cpf").value;

    const medico =
        document.getElementById("medico").value;

    const exame =
        document.getElementById("tipoExame").value;

    const data =
        document.getElementById("data").value;

    const prioridade =
        document.getElementById("prioridade").value;

    const observacoes =
        document.getElementById("observacoes").value;


    // Criar objeto do pedido

    const pedido = {

        id: Date.now(),

        numero: numero,

        paciente: paciente,

        cpf: cpf,

        medico: medico,

        exame: exame,

        data: data,

        prioridade: prioridade,

        observacoes: observacoes

    };


    // Adicionar pedido

    pedidos.push(pedido);


    // Salvar no navegador

    localStorage.setItem(
        "pedidosExames",
        JSON.stringify(pedidos)
    );


    alert(
        "Pedido de exame cadastrado com sucesso!"
    );


    // Limpar formulário

    form.reset();


    // Atualizar tabela

    mostrarPedidos();

});


// Mostrar pedidos

function mostrarPedidos() {

    listaPedidos.innerHTML = "";


    if (pedidos.length === 0) {

        listaPedidos.innerHTML = `
            <tr>
                <td colspan="7">
                    Nenhum pedido cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    pedidos.forEach(function(pedido) {

        const linha =
            document.createElement("tr");


        let classePrioridade =
            pedido.prioridade === "Urgente"
                ? "prioridade-urgente"
                : "prioridade-normal";


        linha.innerHTML = `

            <td>
                ${pedido.numero}
            </td>

            <td>
                ${pedido.paciente}
            </td>

            <td>
                ${pedido.exame}
            </td>

            <td>
                ${pedido.medico}
            </td>

            <td>
                ${formatarData(pedido.data)}
            </td>

            <td>
                <span class="${classePrioridade}">
                    ${pedido.prioridade}
                </span>
            </td>

            <td>

                <button
                    class="btn-excluir"
                    onclick="excluirPedido(${pedido.id})"
                >
                    Excluir
                </button>

            </td>

        `;


        listaPedidos.appendChild(linha);

    });

}


// Excluir pedido

function excluirPedido(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este pedido?"
    );


    if (!confirmar) {
        return;
    }


    pedidos = pedidos.filter(function(pedido) {

        return pedido.id !== id;

    });


    localStorage.setItem(
        "pedidosExames",
        JSON.stringify(pedidos)
    );


    mostrarPedidos();

}


// Formatar data

function formatarData(data) {

    const partes = data.split("-");

    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


// Carregar pedidos ao abrir a página

mostrarPedidos();

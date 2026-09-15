javascript
const form = document.getElementById("formExame");

const listaExames = document.getElementById("listaExames");


// Recupera os exames salvos no navegador
let exames = JSON.parse(
    localStorage.getItem("exames")
) || [];


// Cadastrar exame
form.addEventListener("submit", function(event) {

    event.preventDefault();


    const paciente =
        document.getElementById("paciente").value;

    const cpf =
        document.getElementById("cpf").value;

    const tipo =
        document.getElementById("tipo").value;

    const data =
        document.getElementById("data").value;

    const medico =
        document.getElementById("medico").value;

    const observacoes =
        document.getElementById("observacoes").value;


    const exame = {

        id: Date.now(),

        paciente: paciente,

        cpf: cpf,

        tipo: tipo,

        data: data,

        medico: medico,

        observacoes: observacoes

    };


    exames.push(exame);


    // Salva no navegador
    localStorage.setItem(
        "exames",
        JSON.stringify(exames)
    );


    alert("Exame cadastrado com sucesso!");


    form.reset();


    mostrarExames();

});


// Mostrar exames na tabela
function mostrarExames() {

    listaExames.innerHTML = "";


    if (exames.length === 0) {

        listaExames.innerHTML = `
            <tr>
                <td colspan="6">
                    Nenhum exame cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    exames.forEach(function(exame) {

        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td>
                ${exame.paciente}
            </td>

            <td>
                ${exame.cpf}
            </td>

            <td>
                ${exame.tipo}
            </td>

            <td>
                ${formatarData(exame.data)}
            </td>

            <td>
                ${exame.medico}
            </td>

            <td>

                <button
                    class="btn-excluir"
                    onclick="excluirExame(${exame.id})"
                >
                    Excluir
                </button>

            </td>

        `;


        listaExames.appendChild(linha);

    });

}


// Excluir exame
function excluirExame(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este exame?"
    );


    if (!confirmar) {
        return;
    }


    exames = exames.filter(function(exame) {

        return exame.id !== id;

    });


    localStorage.setItem(
        "exames",
        JSON.stringify(exames)
    );


    mostrarExames();

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


// Carrega os exames ao abrir a página
mostrarExames();


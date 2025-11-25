/* ---------------- VARIÁVEIS ---------------- */
let filaSP = [];
let filaSE = [];
let filaSG = [];

let ultimasChamadas = [];
let contadorSP = 1;
let contadorSE = 1;
let contadorSG = 1;

let ultimaFoiSP = false;

// Aqui ficam registradas todas as senhas emitidas
let todasSenhas = [];

/* -------- FUNÇÃO PARA EMITIR SENHA -------- */
function emitirSenha(tipo) {
    const agora = new Date();

    const YY = String(agora.getFullYear()).slice(2);
    const MM = String(agora.getMonth() + 1).padStart(2, "0");
    const DD = String(agora.getDate()).padStart(2, "0");

    let seq = 1;

    // define contador correspondente
    if (tipo === "SP") seq = contadorSP++;
    if (tipo === "SE") seq = contadorSE++;
    if (tipo === "SG") seq = contadorSG++;

    const senha = `${YY}${MM}${DD}-${tipo}${String(seq).padStart(2, "0")}`;

    // coloca na fila certa
    if (tipo === "SP") filaSP.push(senha);
    if (tipo === "SE") filaSE.push(senha);
    if (tipo === "SG") filaSG.push(senha);

    // registra no histórico
    todasSenhas.push({
        senha,
        tipo,
        emissao: agora,
        atendimento: null,
        guiche: null
    });

    alert("Senha emitida: " + senha);
}

/* -------- CHAMAR PRÓXIMA SENHA -------- */
function chamarProximo() {
    let chamada = null;
    const agora = new Date();

    // regras simples SP → SE/SG → SP
    if (!ultimaFoiSP && filaSP.length > 0) {
        chamada = filaSP.shift();
        ultimaFoiSP = true;
    } else if (ultimaFoiSP) {
        if (filaSE.length > 0) chamada = filaSE.shift();
        else if (filaSG.length > 0) chamada = filaSG.shift();
        ultimaFoiSP = false;
    }

    // caso não tenha nada no ciclo
    if (!chamada) {
        if (filaSP.length > 0) chamada = filaSP.shift();
        else if (filaSE.length > 0) chamada = filaSE.shift();
        else if (filaSG.length > 0) chamada = filaSG.shift();
    }

    if (!chamada) {
        alert("Nenhuma senha na fila.");
        return;
    }

    // registra últimas chamadas
    ultimasChamadas.unshift(chamada);
    if (ultimasChamadas.length > 5) ultimasChamadas.pop();

    atualizarPainel();

    // registra atendimento no histórico
    let registro = todasSenhas.find(x => x.senha === chamada);
    registro.atendimento = agora;
    registro.guiche = 1; // simples para o 2º período
}

/* -------- ATUALIZA PAINEL -------- */
function atualizarPainel() {
    const ul = document.getElementById("listaChamadas");
    ul.innerHTML = "";
    ultimasChamadas.forEach(s => {
        let li = document.createElement("li");
        li.textContent = s;
        ul.appendChild(li);
    });
}

/* -------- FILTRO DE RELATÓRIO DIÁRIO -------- */
function gerarRelatorioDiario() {
    const hoje = new Date().toISOString().slice(0, 10);
    const filtrado = todasSenhas.filter(item =>
        item.emissao.toISOString().slice(0, 10) === hoje
    );
    gerarRelatorio(filtrado, "RELATÓRIO DIÁRIO");
}

/* -------- FILTRO DE RELATÓRIO MENSAL -------- */
function gerarRelatorioMensal() {
    const agora = new Date();
    const mes = agora.getMonth();
    const ano = agora.getFullYear();

    const filtrado = todasSenhas.filter(item =>
        item.emissao.getMonth() === mes &&
        item.emissao.getFullYear() === ano
    );

    gerarRelatorio(filtrado, "RELATÓRIO MENSAL");
}

/* -------- FUNÇÃO GERAL DE RELATÓRIO -------- */
function gerarRelatorio(lista, titulo) {

    if (lista.length === 0) {
        document.getElementById("resultado").innerHTML =
            "<p>Nenhuma informação encontrada.</p>";
        return;
    }

    let totalEmitidas = lista.length;
    let totalAtendidas = lista.filter(x => x.atendimento !== null).length;

    let emitidas = { SP: 0, SE: 0, SG: 0 };
    let atendidas = { SP: 0, SE: 0, SG: 0 };

    lista.forEach(item => {
        emitidas[item.tipo]++;
        if (item.atendimento !== null) atendidas[item.tipo]++;
    });

    // cálculo simples do TM
    let tempos = [];
    lista.forEach(item => {
        if (item.atendimento) {
            let dif = (item.atendimento - item.emissao) / 60000;
            tempos.push(dif);
        }
    });

    let tm = tempos.length > 0 ?
        (tempos.reduce((a, b) => a + b) / tempos.length).toFixed(2) : "0";

    // monta tabela HTML
    let tabela = `
                <h3>${titulo}</h3>

                <p><b>Total emitidas:</b> ${totalEmitidas}</p>
                <p><b>Total atendidas:</b> ${totalAtendidas}</p>

                <p><b>Emitidas por tipo:</b><br>
                SP: ${emitidas.SP} | SE: ${emitidas.SE} | SG: ${emitidas.SG}</p>

                <p><b>Atendidas por tipo:</b><br>
                SP: ${atendidas.SP} | SE: ${atendidas.SE} | SG: ${atendidas.SG}</p>

                <p><b>Tempo Médio (TM):</b> ${tm} min</p>

                <table>
                    <tr>
                        <th>Senha</th>
                        <th>Tipo</th>
                        <th>Emissão</th>
                        <th>Atendimento</th>
                        <th>Guichê</th>
                    </tr>
            `;

    lista.forEach(item => {
        tabela += `
                    <tr>
                        <td>${item.senha}</td>
                        <td>${item.tipo}</td>
                        <td>${item.emissao.toLocaleString()}</td>
                        <td>${item.atendimento ? item.atendimento.toLocaleString() : ""}</td>
                        <td>${item.guiche ?? ""}</td>
                    </tr>
                `;
    });

    tabela += "</table>";

    document.getElementById("resultado").innerHTML = tabela;
}

function trocarAba(id) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("atual"));
    document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));

    document.getElementById(id).classList.add("atual");

    // botão ativo
    const botao = Array.from(document.querySelectorAll(".tab-btn"))
        .find(btn => btn.textContent.includes(
            id === "aba-senhas" ? "Emitir" :
                id === "aba-atendimento" ? "Atendimento" : "Relatórios"
        ));

    botao.classList.add("active");
}
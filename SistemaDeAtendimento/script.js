// --- NAVEGAÇÃO ENTRE TELAS ---
function mostrarTela(idTela) {
    // Esconde todas as telas
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('ativa');
    });
    // Mostra a tela desejada
    document.getElementById(idTela).classList.add('ativa');
}

// --- LÓGICA DE ATENDIMENTO ---

let filas = { 'SP': [], 'SG': [], 'SE': [] };
let ultimasChamadas = [];
let sequenciaGlobal = 1;
let passoCiclo = 0;
const cicloChamada = ["SP", "SESG", "SP", "SESG"]; // Prioridade alternada

function gerarCodigo(tipo) {
    const sequencial = String(sequenciaGlobal).padStart(3, "0");
    const codigo = `${tipo}${sequencial}`;
    sequenciaGlobal++;
    return codigo;
}

// Função chamada pelo Totem
function emitirSenha(tipo) {
    const codigo = gerarCodigo(tipo);
    filas[tipo].push(codigo);
    alert(`Senha Impressa: ${codigo}\nPor favor, aguarde no painel.`);
    atualizarInterface();
}

// Função chamada pelo Botão "Chamar" do Guichê
function chamarProximo() {
    const tipoCiclo = cicloChamada[passoCiclo];
    let chamada = null;

    if (tipoCiclo === "SP" && filas.SP.length > 0) {
        chamada = filas.SP.shift();
    } else {
        if (filas.SE.length > 0) chamada = filas.SE.shift();
        else if (filas.SG.length > 0) chamada = filas.SG.shift();
        else if (filas.SP.length > 0) chamada = filas.SP.shift();
    }

    passoCiclo = (passoCiclo + 1) % cicloChamada.length;

    if (!chamada) {
        alert("Não há senhas na fila!");
        return;
    }

    // Histórico
    ultimasChamadas.unshift(chamada);
    if (ultimasChamadas.length > 3) ultimasChamadas.pop();

    // Atualizar tela
    tocarSom();
    renderizarChamada(chamada);
    atualizarInterface();
}

function renderizarChamada(senha) {
    // Painel
    document.getElementById('painel-senha-atual').innerText = senha;
    document.getElementById('painel-guiche-atual').innerText = "Guichê 01";
    
    // Guichê
    document.getElementById('guiche-senha-atual').innerText = senha;
    document.getElementById('guiche-status').innerText = "Chamando...";
    document.getElementById('guiche-status').style.color = "#ffeb3b";

    // Tabela Histórico
    const tabela = document.getElementById('tabela-historico');
    tabela.innerHTML = '';
    ultimasChamadas.forEach(s => {
        tabela.innerHTML += `<tr><td>${s}</td><td>Guichê 01</td></tr>`;
    });
}

function atualizarInterface() {
    const lista = document.getElementById('lista-espera-guiche');
    lista.innerHTML = '';

    const todasSenhas = [
        ...filas.SP.map(s => ({s, t: 'Prioridade'})), 
        ...filas.SE.map(s => ({s, t: 'Exame'})),
        ...filas.SG.map(s => ({s, t: 'Geral'}))
    ];

    if(todasSenhas.length === 0) {
        lista.innerHTML = '<li style="opacity:0.5">Fila vazia</li>';
    } else {
        todasSenhas.forEach(item => {
            lista.innerHTML += `<li>${item.s} <span style="font-size:14px; opacity:0.8">(${item.t})</span></li>`;
        });
    }
}

function atualizarStatus(status) {
    const el = document.getElementById('guiche-status');
    el.innerText = status;
    if(status === 'Em andamento') el.style.color = '#90ff95';
    if(status === 'Finalizado') el.style.color = '#a1c4fd';
    if(status === 'Ausente') el.style.color = '#ff9a9e';
}

function tocarSom() {
    // Toca um beep simples se o navegador permitir
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    audio.play().catch(e => console.log("Som bloqueado pelo navegador"));
}
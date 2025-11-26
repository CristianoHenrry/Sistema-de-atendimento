SISTEMA DE ATENDIMENTO 

# 💻 web_ticket: Sistema de Gerenciamento de Atendimento (Filas e Senhas)

O `web_ticket` é um projeto simples, desenvolvido para simular o gerenciamento de filas de atendimento, emissão de senhas por prioridade/categoria e geração de relatórios de desempenho.

## 🌟 Funcionalidades Principais

- **Emissão de Senhas:** Permite a geração de senhas por categorias:
    - **SP:** Senha Prioritária
    - **SE:** Senha Exames
    - **SG:** Senha Geral
- **Lógica de Atendimento:** O sistema prioriza senhas Prioritárias (SP), alternando com as senhas Gerais (SE/SG) para otimizar o fluxo, seguindo o padrão **SP → SE/SG → SP**.
- **Painel de Chamadas:** Exibe as últimas 5 senhas chamadas no painel de atendimento.
- **Relatórios:** Gera relatórios detalhados com base no histórico de senhas, incluindo:
    - Total de senhas emitidas e atendidas.
    - Breakdown por tipo (SP, SE, SG).
    - Cálculo do Tempo Médio (TM) de espera/atendimento.

## 🛠 Estrutura do Projeto

O projeto é 100% front-end e pode ser executado diretamente no navegador.

| Arquivo | Descrição |
| :--- | :--- |
| `index.html` | Estrutura principal da interface (HTML) com as três abas de navegação. |
| `styl.css` | Estilização completa do layout, incluindo paleta de cores e design. |
| `Scp.js` | Toda a lógica de filas, contadores, emissão de senhas, controle de chamadas e geração de relatórios. |
| `README.md` | Este arquivo de descrição do projeto. |
| `TODO.md` | Lista de tarefas futuras, melhorias e correções pendentes. |
| `LICENSE` | Licença de uso do código (Creative Commons). |

## 🚀 Como Executar

Simplesmente abra o arquivo **`index.html`** no seu navegador de preferência. Não há necessidade de servidor web ou instalação de dependências.

---

### 🔑 Configurações Técnicas (Para Desenvolvedores)

- **Senhas:** O formato das senhas geradas é: `AAMMDD-TXX`, onde:
    - `AAMMDD` é a data (Ano, Mês, Dia).
    - `T` é o Tipo (SP, SE, SG).
    - `XX` é o número sequencial do tipo (ex: `SP01`).
- **Filas:** As senhas são gerenciadas por três arrays em JavaScript: `filaSP`, `filaSE` e `filaSG`.

Alunos: Crsitiano Henrry 01780424, Rafael Vera Cruz 01815904, Arthur Correia 01784347, Breno José 01796998, Dyogo Henrique 01774551

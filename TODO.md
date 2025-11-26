Projeto final de Front-End

# ⏳ Lista de Tarefas do Projeto: Sistema de Atendimento

## 🛑 Prioridade Alta (MUST-HAVE)

- [ ]  **Persistência de Dados:** Implementar o armazenamento de dados (filas e histórico) no `localStorage` do navegador para que não se percam ao recarregar a página.
    - [ ]  Função para carregar dados do `localStorage` no início (`onload`).
    - [ ]  Função para salvar dados no `localStorage` após cada emissão ou chamada.
- [ ]  **Melhoria na Lógica de Atendimento:** Corrigir o controle de turno (`ultimaFoiSP`) para garantir a alternância correta entre Prioritária (SP) e Geral/Exames (SE/SG), mesmo quando uma das filas estiver vazia.

## 🛠 Prioridade Média (SHOULD-HAVE)

- [ ]  **Feedback Visual:** Adicionar um campo ou painel para mostrar a **"SENHA ATUAL"** em destaque na aba **Atendimento** após o `chamarProximo()`.
- [ ]  **Controle de Guichê:** Permitir que o operador selecione o Guichê (1, 2, 3...) ao chamar a próxima senha, em vez de ser fixo como `registro.guiche = 1;`.
- [ ]  **Refatoração de Funções:**
    - [ ]  Separar a lógica de cálculo de relatórios da montagem da tabela HTML para melhor manutenção.
    - [ ]  Simplificar a função `trocarAba(id)` para não depender do `textContent` do botão.

## ✨ Prioridade Baixa (NICE-TO-HAVE)

- [ ]  **Melhoria na UX/UI:** Adicionar um indicador visual de "fila vazia" ou desabilitar o botão **"Chamar Próxima Senha"** quando todas as filas estiverem vazias.
- [ ]  **Design Responsivo:** Revisar os estilos (`styl.css`) para garantir que a tabela de relatórios e os botões de emissão de senha fiquem melhores em telas pequenas (mobile).
- [ ]  **Filtro de Relatório:** Adicionar filtros de data mais específicos (ex: de uma data X até uma data Y) ao invés de apenas Diário/Mensal.

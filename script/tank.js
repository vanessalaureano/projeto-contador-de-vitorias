// 1. Capturar elementos do DOM
const formTank = document.getElementById("tank-formulario");
const tankCapitaoReceberInput = document.getElementById("tank-capitao-receber");
const tankRaridadeReceberSelect = document.getElementById("tank-raridade-receber");
const tankNomeReceberInput = document.getElementById("tank-nome-receber");
const tankAdicionarButton = document.getElementById("tank-adicionar");
const tanksLista = document.getElementById("tanks-lista");
const tankListaBody = document.getElementById("tank-lista-body");
const tankBotaoRemoverTodos = document.getElementById("tank-botao-remover-todos");

// 2. Definir uma função para adicionar um novo tank
function adicionarTank(event) {
  event.preventDefault(); // Evitar o comportamento padrão do formulário

  const capitao = tankCapitaoReceberInput.value;
  const raridade = tankRaridadeReceberSelect.value;
  const nomeTank = tankNomeReceberInput.value;
  const vitorias = 0;
  const pontosPorVitoria = 0;

  if (capitao.trim() === "" || nomeTank.trim() === "") {
    // Verificar se os campos estão vazios
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Criar a estrutura HTML para adicionar o tank na tabela
  const tr = document.createElement("tr");
  tr.classList.add("tabela-conteudo");

  const tdCheck = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      tr.style.backgroundColor = "var(--cor-de-fundo-secundaria)";
    } else {
      tr.style.backgroundColor = "";
    }
  });
  tdCheck.appendChild(checkbox);
  tr.appendChild(tdCheck);

  const tdCapitao = document.createElement("td");
  tdCapitao.textContent = capitao;
  tr.appendChild(tdCapitao);

  const tdRaridade = document.createElement("td");
  tdRaridade.textContent = raridade;
  tr.appendChild(tdRaridade);

  const tdNomeTank = document.createElement("td");
  tdNomeTank.textContent = nomeTank;
  tr.appendChild(tdNomeTank);

  const tdVitorias = document.createElement("td");
  tdVitorias.innerHTML = `
    <button class="botao-subtrair botao">-</button>
    <span class="vitorias-quantidade">${vitorias}</span>
    <button class="botao-somar botao">+</button>
  `;
  tr.appendChild(tdVitorias);

  const tdPontosPorVitoria = document.createElement("td");
  tdPontosPorVitoria.innerHTML = `
    <input type="number" class="pontos-por-vitoria-input" value="${pontosPorVitoria}">
  `;
  tr.appendChild(tdPontosPorVitoria);

  const tdBotaoRemover = document.createElement("td");
  const botaoRemover = document.createElement("button");
  botaoRemover.classList.add("botao-remover", "botao");
  botaoRemover.textContent = "Excluir";
  botaoRemover.setAttribute("title", "Remover tank");
  botaoRemover.addEventListener("click", removerTank);
  tdBotaoRemover.appendChild(botaoRemover);
  tr.appendChild(tdBotaoRemover);

  tankListaBody.appendChild(tr);

  // Limpar os campos de inserção do tank
  tankCapitaoReceberInput.value = "";
  tankNomeReceberInput.value = "";

  // Salvar os dados no LocalStorage
  salvarDadosNoLocalStorage();
}

// 3. Definir uma função para atualizar o contador de vitórias
function atualizarContador(event) {
  const botaoClicado = event.target;
  const vitoriasSpan = botaoClicado.parentNode.querySelector(".vitorias-quantidade");
  let vitorias = parseInt(vitoriasSpan.textContent);

  if (botaoClicado.classList.contains("botao-subtrair")) {
    vitorias = Math.max(0, vitorias - 1);
  } else if (botaoClicado.classList.contains("botao-somar")) {
    vitorias++;
  }

  vitoriasSpan.textContent = vitorias;

  // Salvar os dados no LocalStorage
  salvarDadosNoLocalStorage();
}

// 4. Definir uma função para remover um tank
function removerTank(event) {
  const botaoRemover = event.target;
  if (botaoRemover.classList.contains("botao-remover")) {
    const tr = botaoRemover.closest(".tabela-conteudo");
    tr.remove();

    // Salvar os dados no LocalStorage
    salvarDadosNoLocalStorage();
  }
}

// 5. Definir uma função para remover todos os tanks
function removerTodosTanks() {
  tankListaBody.innerHTML = "";

  // Salvar os dados no LocalStorage
  salvarDadosNoLocalStorage();
}

// 6. Inicialização do site ao carregar a página
function iniciarSite() {
  // Adicionar o event listener ao botão "Adicionar tank"
  tankAdicionarButton.addEventListener("click", adicionarTank);

  // Adicionar os event listeners aos botões da tabela
  tanksLista.addEventListener("click", atualizarContador);
  tanksLista.addEventListener("click", removerTank);

  // Corrigir o seletor para o botão de remover todos os tanks
  tankBotaoRemoverTodos.addEventListener("click", removerTodosTanks);

  // Recuperar dados do LocalStorage e preencher a tabela
  const dadosSalvos = localStorage.getItem("tanksData");
  if (dadosSalvos) {
    tankListaBody.innerHTML = dadosSalvos;
  }
}

// Salvar os dados da tabela no LocalStorage
function salvarDadosNoLocalStorage() {
  const tabelaHTML = tankListaBody.innerHTML;
  localStorage.setItem("tanksData", tabelaHTML);
}

// Chamada para iniciar o site ao carregar a página
iniciarSite();

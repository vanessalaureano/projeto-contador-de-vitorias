// Capturar elementos do DOM
const formTank = document.getElementById("tank-formulario");
const capitaoReceberInput = document.getElementById("capitao-receber");
const raridadeReceberSelect = document.getElementById("raridade-receber");
const tankReceberInput = document.getElementById("tank-receber");
const tanksLista = document.getElementById("tanks-lista");

// Função para adicionar um novo tank
function adicionarTank(event) {
  event.preventDefault(); // Evitar o comportamento padrão do formulário

  // Capturar os valores preenchidos pelo usuário
  const capitao = capitaoReceberInput.value;
  const raridade = raridadeReceberSelect.value;
  const tank = tankReceberInput.value;

  if (capitao.trim() === "" || tank.trim() === "") {
    // Verificar se os campos estão vazios
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Criar a estrutura HTML para adicionar o tank na tabela
  const tr = document.createElement("tr");
  tr.classList.add("tabela-conteudo");

  // Adicionar checkbox para o campo "Check"
  const tdCheck = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = false;
  checkbox.addEventListener("change", function () {
    tr.style.backgroundColor = checkbox.checked ? "var(--cor-de-fundo-secundaria)" : "";
  });
  tdCheck.appendChild(checkbox);
  tr.appendChild(tdCheck);

  const tdCapitao = document.createElement("td");
  tdCapitao.textContent = capitao;
  tr.appendChild(tdCapitao);

  const tdRaridade = document.createElement("td");
  tdRaridade.textContent = raridade;
  tr.appendChild(tdRaridade);

  const tdTank = document.createElement("td");
  tdTank.textContent = tank;
  tr.appendChild(tdTank);

  // Campo "Vitórias"
  const tdVitorias = document.createElement("td");
  tdVitorias.innerHTML = `
        <button class="botao-subtrair botao">-</button>
        <span class="vitorias-quantidade">0</span>
        <button class="botao-somar botao">+</button>
    `;
  tdVitorias.addEventListener("click", atualizarContador); // Adicionar event listener para atualizar o contador de vitórias
  tr.appendChild(tdVitorias);

  // Campo "Pontos por vitória"
  const tdPontosPorVitoria = document.createElement("td");
  const pontosPorVitoriaInput = document.createElement("input");
  pontosPorVitoriaInput.type = "number";
  pontosPorVitoriaInput.value = 0;
  tdPontosPorVitoria.appendChild(pontosPorVitoriaInput);
  tr.appendChild(tdPontosPorVitoria);

  // Botão de "Excluir"
  const tdBotaoRemover = document.createElement("td");
  const botaoRemover = document.createElement("button");
  botaoRemover.classList.add("botao-remover", "botao");
  botaoRemover.textContent = "Excluir";
  botaoRemover.setAttribute("title", "Remover tank");
  botaoRemover.addEventListener("click", removerTank); // Adicionar event listener para remover o tank
  tdBotaoRemover.appendChild(botaoRemover);
  tr.appendChild(tdBotaoRemover);

  // Adicionar o tank na tabela
  tanksLista.querySelector("tbody").appendChild(tr);

  // Limpar os campos do formulário
  capitaoReceberInput.value = "";
  tankReceberInput.value = "";

  // Exibir a tabela de tanks
  tanksLista.classList.remove("lista-oculta");

  // Salvar os dados no LocalStorage
  salvarDadosNoLocalStorage();
}

// Função para atualizar o contador de vitórias
function atualizarContador(event) {
  const botaoClicado = event.target;
  if (botaoClicado.classList.contains("botao-subtrair")) {
    const vitoriasSpan = botaoClicado.nextElementSibling;
    let vitorias = parseInt(vitoriasSpan.textContent);
    vitorias = Math.max(0, vitorias - 1);
    vitoriasSpan.textContent = vitorias;
  } else if (botaoClicado.classList.contains("botao-somar")) {
    const vitoriasSpan = botaoClicado.previousElementSibling;
    let vitorias = parseInt(vitoriasSpan.textContent);
    vitorias++;
    vitoriasSpan.textContent = vitorias;
  }

  // Salvar os dados no LocalStorage
  salvarDadosNoLocalStorage();
}

// Função para remover um tank
function removerTank(event) {
  const botaoRemover = event.target;
  if (botaoRemover.classList.contains("botao-remover")) {
    const tr = botaoRemover.closest(".tabela-conteudo");
    tr.remove();

    // Verificar se existem mais tanks na tabela
    const tanksNaTabela = tanksLista.querySelectorAll(".tabela-conteudo");
    if (tanksNaTabela.length === 0) {
      // Se não existir mais tanks, ocultar a tabela
      tanksLista.classList.add("lista-oculta");
    }

    // Salvar os dados no LocalStorage
    salvarDadosNoLocalStorage();
  }
}

// Função para remover todos os tanks
function removerTodosTanks() {
  tanksLista.querySelector("tbody").innerHTML = "";

  // Ocultar a tabela de tanks
  tanksLista.classList.add("lista-oculta");

  // Salvar os dados no LocalStorage
  salvarDadosNoLocalStorage();
}

// Inicialização do site ao carregar a página
function iniciarSite() {
  // Adicionar os event listeners aos botões
  formTank.addEventListener("submit", adicionarTank);
  const botaoRemoverTodos = document.getElementById("botao-remover-todos");
  botaoRemoverTodos.addEventListener("click", removerTodosTanks);

  // Recuperar dados do LocalStorage e preencher a tabela
  const dadosSalvos = localStorage.getItem("tanksData");
  if (dadosSalvos) {
    tanksLista.querySelector("tbody").innerHTML = dadosSalvos;
    tanksLista.classList.remove("lista-oculta");
  }
}

// Salvar os dados da tabela no LocalStorage
function salvarDadosNoLocalStorage() {
  const tabelaHTML = tanksLista.querySelector("tbody").innerHTML;
  localStorage.setItem("tanksData", tabelaHTML);
}

// Chamada para iniciar o site ao carregar a página
iniciarSite();

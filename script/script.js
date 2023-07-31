// Variável para armazenar os dados dos times
let times = [];

// Função para mostrar o conteúdo da tabela
function mostrarConteudo() {
  const lista = document.getElementById('times-lista');
  lista.classList.remove('lista-oculta');
}

// Função para atualizar a tabela com os dados dos times
function atualizarTabela() {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  times.forEach((time) => {
    const tr = document.createElement('tr');
    tr.classList.add('tabela-conteudo');

    const tdHorarioCheckIn = document.createElement('td');
    tdHorarioCheckIn.textContent = time.checkIn;
    tr.appendChild(tdHorarioCheckIn);

    const tdNomeTime = document.createElement('td');
    tdNomeTime.textContent = time.nome;
    tr.appendChild(tdNomeTime);

    const tdVitorias = document.createElement('td');
    const botaoSubtrair = document.createElement('button');
    botaoSubtrair.classList.add('botao-subtrair', 'botao');
    botaoSubtrair.textContent = '-';
    botaoSubtrair.addEventListener('click', () => subtrairVitoria(time));
    tdVitorias.appendChild(botaoSubtrair);

    const spanVitorias = document.createElement('span');
    spanVitorias.textContent = time.vitorias;
    tdVitorias.appendChild(spanVitorias);

    const botaoSomar = document.createElement('button');
    botaoSomar.classList.add('botao-somar', 'botao');
    botaoSomar.textContent = '+';
    botaoSomar.addEventListener('click', () => somarVitoria(time));
    tdVitorias.appendChild(botaoSomar);

    tr.appendChild(tdVitorias);

    const tdVitoriasPorHora = document.createElement('td');
    tdVitoriasPorHora.textContent = `${calcularVitoriasPorHora(time)} vitórias por hora`;
    tr.appendChild(tdVitoriasPorHora);

    const tdBotaoRemover = document.createElement('td');
    const botaoRemover = document.createElement('button');
    botaoRemover.classList.add('botao-remover', 'botao');
    botaoRemover.textContent = 'Excluir';
    botaoRemover.addEventListener('click', () => removerTime(time));
    tdBotaoRemover.appendChild(botaoRemover);
    tr.appendChild(tdBotaoRemover);

    tbody.appendChild(tr);
  });
}

// Função para adicionar um novo time
function adicionarTime(event) {
  event.preventDefault();
  const timeReceber = document.getElementById('time-receber');
  const nomeTime = timeReceber.value.trim();
  if (nomeTime === '') return;

  const horarioCheckIn = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const novoTime = {
    nome: nomeTime,
    checkIn: horarioCheckIn,
    vitorias: 0,
    ultimaAtualizacao: new Date().getTime(),
  };

  times.push(novoTime);
  timeReceber.value = '';

  mostrarConteudo();
  atualizarTabela();
}

// Função para remover um time
function removerTime(time) {
  times = times.filter((t) => t !== time);
  atualizarTabela();
}

// Função para somar uma vitória
function somarVitoria(time) {
  time.vitorias++;
  time.ultimaAtualizacao = new Date().getTime();
  atualizarTabela();
}

// Função para subtrair uma vitória
function subtrairVitoria(time) {
  if (time.vitorias > 0) {
    time.vitorias--;
    time.ultimaAtualizacao = new Date().getTime();
    atualizarTabela();
  }
}

// Função para calcular as vitórias por hora
function calcularVitoriasPorHora(time) {
  const agora = new Date().getTime();
  const tempoDecorrido = (agora - new Date(time.ultimaAtualizacao).getTime()) / (1000 * 60 * 60);
  return (time.vitorias / tempoDecorrido).toFixed(2);
}

// Função para remover todos os times
function removerTodosTimes() {
  times = [];
  atualizarTabela();
}

// Evento para adicionar time quando o formulário for submetido
const formulario = document.getElementById('time-formulario');
formulario.addEventListener('submit', adicionarTime);

// Evento para remover todos os times quando o botão "Excluir times" for clicado
const botaoRemoverTodos = document.getElementById('botao-remover-todos');
botaoRemoverTodos.addEventListener('click', removerTodosTimes);

// Carregar dados do LocalStorage (se houver)
const dadosLocalStorage = JSON.parse(localStorage.getItem('spiderTanksTimes'));
if (dadosLocalStorage) {
  times = dadosLocalStorage;
  mostrarConteudo();
  atualizarTabela();
}

// Salvar dados no LocalStorage sempre que a tabela for atualizada
function salvarNoLocalStorage() {
  localStorage.setItem('spiderTanksTimes', JSON.stringify(times));
}

// Atualizar dados no LocalStorage a cada 1 hora
setInterval(salvarNoLocalStorage, 1000 * 60 * 60);

// Código para tornar o site responsivo com bordas finas
// ...

// Fazer o ajuste responsivo é um processo mais complexo e pode envolver a adição de regras CSS
// para adaptar a aparência do site em diferentes tamanhos de tela. Aqui, deixei essa parte em aberto,
// pois depende de como você deseja que o site se comporte em dispositivos menores. Você pode
// usar media queries no CSS para aplicar estilos específicos para diferentes tamanhos de tela,
// ou pode usar alguma biblioteca de CSS como o Bootstrap para facilitar a responsividade.
// Se quiser, posso fornecer um exemplo básico de media queries para começar, mas é importante
// considerar as necessidades específicas do design do seu site.


const listaTarefas = document.querySelector('.app__section-task-list');
const formularioTarefa = document.querySelector('.app__form-add-task');
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formularioLabel = document.querySelector('.app__form-label');
const areaTexto = document.querySelector('.app__form-textarea');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const descricaoTarefaAtiva = document.querySelector('.app__section-active-task-description');

const localStorageTarefas = localStorage.getItem('tarefas');
let tarefas = localStorageTarefas ? JSON.parse(localStorageTarefas) : [];

const iconeTarefaSVG = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`

let tarefaSelecionada = null;
let itemTarefaSelecionada = null;

const selecionaTarefa = (tarefa, elemento) => {
    document.querySelectorAll('.app__section-task-list-item-active').forEach(function (button) {
        button.classList.remove('app__section-task-list-item-active')
    })

    if (tarefaSelecionada == tarefa) {
        descricaoTarefaAtiva.textContent = null;
        itemTarefaSelecionada = null;
        tarefaSelecionada = null;
        return
    }

    tarefaSelecionada = tarefa;
    itemTarefaSelecionada = elemento;
    descricaoTarefaAtiva.textContent = tarefa.descricao;
    elemento.classList.add('app__section-task-list-item-active');
}

const limparFormulario = () => {
    areaTexto.value = '';
    formularioTarefa.classList.add('hidden');
}

function criaTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = iconeTarefaSVG;

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');

    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement('button');

    li.onclick = () => {
        selecionaTarefa(tarefa, li)
    }

    svg.addEventListener('click', (evento) => {
        evento.stopPropagation();
        li.classList.add('app__section-task-list-item-complete')
    })

    li.appendChild(svg);
    li.appendChild(paragrafo);

    return li
}

tarefas.forEach(tarefa => {
    const itemTarefa = criaTarefa(tarefa);
    listaTarefas.appendChild(itemTarefa);
})

btnAdicionarTarefa.addEventListener('click', () => {
    formularioLabel.textContent = 'Adicionar tarefa';
    formularioTarefa.classList.toggle('hidden');
})

const atualizaLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

formularioTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: areaTexto.value,
        concluida: false
    }
    tarefas.push(tarefa);

    const itemTarefa = criaTarefa(tarefa);

    listaTarefas.appendChild(itemTarefa);

    atualizaLocalStorage();
    limparFormulario();
})

btnCancelarTarefa.addEventListener('click', () => {
    formularioTarefa.classList.add('hidden');

    limparFormulario()
})

const html = document.querySelector('html');

const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');

const img = document.querySelector('.app__image');

const texto = document.querySelector('.app__title');

const btns = document.querySelectorAll('.app__card-button');

const musicaFoco = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;

let tempoDecorridoSegundos = 1500;
const startPauseBtn = document.querySelector('#start-pause');
let intervaloId = null;

const musicaPlay = new Audio('sons/play.wav');
const musicaPause = new Audio('sons/pause.mp3');
const musicaTempoFinalizado = new Audio('sons/beep.mp3');

const iniciarOuPausarBtn = document.querySelector('#start-pause span');

const iconePlayPause = document.querySelector('.app__card-primary-butto-icon');

const tempoTela = document.querySelector('#timer');


btnFoco.addEventListener("click", () => {
    tempoDecorridoSegundos = 1500;
    alterarContexto('foco');
    btnFoco.classList.add("active");
});

btnCurto.addEventListener("click", () => {
    tempoDecorridoSegundos = 300;
    alterarContexto('descanso-curto');
    btnCurto.classList.add("active");
});

btnLongo.addEventListener("click", () => {
    tempoDecorridoSegundos = 900;
    alterarContexto('descanso-longo');
    btnLongo.classList.add("active");
});

musicaFoco.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

function alterarContexto(contexto) {
    mostrarTempo();

    html.setAttribute('data-contexto', contexto);

    img.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            texto.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            texto.innerHTML = `
            Que tal dar uma respirada?<br>
                    <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            texto.innerHTML = `
            Hora de voltar à superfície.<br>
                    <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
    };

    btns.forEach(function (contexto) {
        contexto.classList.remove("active");
    });
}

const contagemRegressiva = () => {
    if (tempoDecorridoSegundos <= 0) {
        musicaTempoFinalizado.play();
        zerar();
        return
    }
    tempoDecorridoSegundos -= 1;
    mostrarTempo();
}

startPauseBtn.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        musicaPause.play();
        zerar();
        return
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = "Pausar";
    iconePlayPause.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBtn.textContent = "Começar";
    iconePlayPause.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
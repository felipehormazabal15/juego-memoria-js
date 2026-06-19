const EMOJIS = [
    "🍎","🚀","🐱","🌵",
    "🎲","🎧","⚽","🍕",
    "🐶","🍔","🚗","🎸"
];

const state = {
    cartas: [],
    primeraCarta: null,
    segundaCarta: null,
    bloqueado: false,
    movimientos: 0,
    parejasTotales: 8,
    parejasEncontradas: 0
};

const tablero = document.getElementById("tablero");
const movimientosEl = document.getElementById("movimientos");
const mensajeEl = document.getElementById("mensaje");
const dificultadEl = document.getElementById("dificultad");

function mezclar(array){

    const copia = [...array];

    for(let i = copia.length - 1; i > 0; i--){

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [copia[i], copia[j]] =
        [copia[j], copia[i]];
    }

    return copia;
}

function crearMazo(parejas){

    const seleccion = EMOJIS.slice(0, parejas);

    const cartas = seleccion.flatMap(
        emoji => [
            {
                id: crypto.randomUUID(),
                valor: emoji,
                volteada: false,
                encontrada: false
            },
            {
                id: crypto.randomUUID(),
                valor: emoji,
                volteada: false,
                encontrada: false
            }
        ]
    );

    return mezclar(cartas);
}

function iniciarJuego(){

    state.parejasTotales =
        Number(dificultadEl.value);

    state.cartas =
        crearMazo(state.parejasTotales);

    state.primeraCarta = null;
    state.segundaCarta = null;
    state.bloqueado = false;
    state.movimientos = 0;
    state.parejasEncontradas = 0;

    mensajeEl.textContent = "";

    render();
}

function render(){

    tablero.textContent = "";

    const columnas =
        Math.ceil(Math.sqrt(state.cartas.length));

    tablero.style.gridTemplateColumns =
        `repeat(${columnas},1fr)`;

    state.cartas.forEach((carta,index)=>{

        const btn =
            document.createElement("button");

        btn.classList.add("carta");

        if(carta.encontrada){

            btn.classList.add("encontrada");
            btn.textContent = carta.valor;

        }else if(carta.volteada){

            btn.classList.add("volteada");
            btn.textContent = carta.valor;

        }else{

            btn.classList.add("oculta");
            btn.textContent = carta.valor;
        }

        btn.dataset.index = index;

        tablero.appendChild(btn);
    });

    movimientosEl.textContent =
        `Movimientos: ${state.movimientos}`;
}

function limpiarTurno(){

    state.primeraCarta = null;
    state.segundaCarta = null;
    state.bloqueado = false;
}

function manejarCarta(index){

    if(state.bloqueado) return;

    const carta = state.cartas[index];

    if(carta.encontrada) return;

    if(carta.volteada) return;

    carta.volteada = true;

    if(state.primeraCarta === null){

        state.primeraCarta = index;

        render();
        return;
    }

    state.segundaCarta = index;
    state.movimientos++;
    state.bloqueado = true;

    render();

    const primera =
        state.cartas[state.primeraCarta];

    const segunda =
        state.cartas[state.segundaCarta];

    if(primera.valor === segunda.valor){

        primera.encontrada = true;
        segunda.encontrada = true;

        state.parejasEncontradas++;

        limpiarTurno();

        if(
            state.parejasEncontradas ===
            state.parejasTotales
        ){
            mensajeEl.textContent =
                "🎉 ¡Has ganado!";
        }

        render();

    }else{

        setTimeout(()=>{

            primera.volteada = false;
            segunda.volteada = false;

            limpiarTurno();

            render();

        },800);
    }
}

tablero.addEventListener("click",(e)=>{

    const carta =
        e.target.closest(".carta");

    if(!carta) return;

    manejarCarta(
        Number(carta.dataset.index)
    );
});

document
.getElementById("reiniciar")
.addEventListener("click", iniciarJuego);

document.addEventListener("keydown",(e)=>{

    if(e.key.toLowerCase() === "r"){
        iniciarJuego();
    }
});

dificultadEl.addEventListener(
    "change",
    iniciarJuego
);

iniciarJuego();
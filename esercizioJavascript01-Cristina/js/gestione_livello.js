
// valore iniziale dell'energia
var energia = 0;

// costanti e parametri per la configurazioen del gioco
var PILLOLA = 1;
var DELTA_ENERGIA = 20;
var OSTACOLO = 3;
var SFONDO = 0;
var CHIAVE = 2;
var PORTA = 4;
var livello = -1;
var USCITA=5;
var ENTRATA = 6;
var SPINGIBILE = 7;
var BUCO = 8;
var SPINGIBILEsuBUCO = 9;
var PORTALE = 10;

var statoOmino = "ominoSx";
var ominoConChiave = "ConChiave";
var omino = statoOmino;

var numeroChiave = 0;
var pathImg = "img1/";

// dichiarazione variabili di lavoro
var i = 0;
var j = 0;
var countPillole = 0;

// definizione id matrice, come array di array
var piano = new Array();

function generaPiano(N, M) {
	var p = document.getElementById("piano");
	while (p.hasChildNodes()) {
		p.removeChild(p.firstChild);
	}
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < M; j++) {
            var image = new Image();
            image.id = "c" + i + "_" + j;
            if(piano[i][j] === PORTALE)
                image.src = pathImg + piano[i][j]+".gif";
            else
                image.src = pathImg + piano[i][j]+".png";
            p.appendChild(image);
        }
        p.appendChild(document.createElement('br'));
    }
    disegnaOmino();
}

function cambiaStanza(liv) {
    document.getElementById("livello").innerHTML = "STANZA " + liv + ":";
    pulisciTesto();

    if (liv > livello) {
        ominoX = precedenteX[liv];
        ominoY = precedenteY[liv];
    }
    else {
        ominoX = prossimoX[liv];
        ominoY = prossimoY[liv];
    }

    switch (liv) {

        case 0:
            if (liv > livello) {
                ominoX = 1;
                ominoY = 9;
            }
            break;
    }
    livello = liv;
    piano = eval("piano" + livello); 
    R = piano.length;
    C = piano[0].length;
    creaAudio('music/walk.wav', 1);
	generaPiano(R,C);
}
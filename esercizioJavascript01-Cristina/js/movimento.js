
//gestione dell'evento onkeydown:
var puoMuovere = true;
var staMuovendo = true;
var haMosso = false;
var verso = {
	sinistra: {
		y: -1,
		x: 0,
	},
	destra: {
		y: +1,
		x: 0,
	},
	su: {
		y: 0,
		x: -1,
	},
	giu: {
		y: 0,
		x: +1,
	},
}
var ominoVerso = {
	x: 0,
	y:0,
};
function checkKeyDown(e) {
	e = e || window.event;
	switch(e.keyCode){
		case 39: destra(); break;
		case 40: giu();    break;
		case 37: sinistra();   break;
		case 38: su();    break;
		case 70: interazione();

	}
    //alert ("The Unicode character code is: " + e.keyCode);   
}

// gestione dell'evento onkey press:
function checkKeyPress (event){

	//if (!staMuovendo) {
		var chCode = ('charCode' in event) ? event.charCode : event.keyCode;

		switch (chCode) {
			case 100: destra(); break;
			case 115: giu(); break;
			case 97: sinistra(); break;
			case 119: su(); break;

		}
	//	staMuovendo = true;
	//}
	//else {
	//	setTimeout(staMuovendo = false,1);
	//}
    //alert ("The Unicode character code is: " + chCode);   
}


function controllaCella(x, y) {
	if ((x < 0 || x > R) || (y < 0 || y > C)){
            setTimeout(cambiaStanza(livello + 1), 500);
            return false;
        }
            
	switch (piano[x][y]){
		case CHIAVE:
			chiave.numero++;
			testo("hai ottenuto la  CHIAVE");
			piano[x][y] = SFONDO; 
			aggiornamentoBorsa(chiave.val);
			if (!presoChiave) {
				presoChiave = !presoChiave;
				dialogo(dialogoPresoChiave);
				disegnaPiano();
				return true;
			}
			return true;
		case OSTACOLO: 
			return false;
		case PILLOLA:
			energia = energia + DELTA_ENERGIA;
			document.getElementById("energia").innerHTML = energia;
			piano[x][y] = SFONDO;
			countPillole--;
			if (countPillole == 0) {
				document.getElementById("energia").innerHTML = "<img src=\"coppa.jpg\" >";
			}
			return true;
		case SPINGIBILE:
			if (controllaCellaSpingibile(x, y))
				creaAudio('music/spinta.wav', 1);
			return false;
		case SPINGIBILEsuBUCO:
			if (controllaCellaSpingibile(x, y)) {
				piano[x][y] = BUCO;
				piano[prossimoX[livello]][prossimoY[livello]] = OSTACOLO;
				var el = document.getElementById('piano');
				el.classList.remove('screenShake');
				disegnaCella(x, y);
				disegnaCella(prossimoX[livello], prossimoY[livello]);
			}
			return false;
		case PORTALE:
			if(livello === 2){
				setTimeout(cambiaStanza(livello + 1), 500);
			}
			else{
				setTimeout(cambiaStanza(livello - 1), 500);
			}
		case PORTA:
			return false;
        case USCITA:
            setTimeout(cambiaStanza(livello + 1), 500);
                return false;
        case ENTRATA:
            setTimeout(cambiaStanza(livello - 1), 500);
                return false;
		default: 
				return true; 
	}

	return true; 
}

function controllaCellaSpingibile(x, y) {
	var nx = x + ominoVerso.x;
	var ny = y + ominoVerso.y;
	switch (piano[nx][ny]) {
		case SFONDO:
			piano[x][y] = SFONDO;
			piano[nx][ny] = SPINGIBILE;
			disegnaCella(x, y);
			disegnaCella(nx, ny);
			return true;
		case BUCO:
			piano[x][y] = SFONDO;
			piano[nx][ny] = SPINGIBILEsuBUCO;
			disegnaCella(x, y);
			disegnaCella(nx, ny);
			creaAudio('music/door.wav', 1);
			var el = document.getElementById('piano');
			el.classList.add('screenShake');
			piano[prossimoX[livello]][prossimoY[livello]] = SFONDO;
			disegnaCella(prossimoX[livello], prossimoY[livello]);
			return true;
	}
	return false;

}

function sposta(daX, daY, aX, aY) {
	if ((controllaCella(aX, aY)) && (puoMuovere)) {
			var daSrc = "c" + daX + "_" + daY;
			var aSrc = "c" + aX + "_" + aY;

			console.log(daSrc + " " + aSrc);
			document.getElementById(daSrc).src = pathImg + piano[daX][daY] + ".png";
			ominoX = aX;
			ominoY = aY;
			creaAudio('music/walk.wav',1);
		}
	disegnaOmino();
	if (!haMosso) {
		setTimeout(dialogo(dialogoIniziale), 1000);
		haMosso = true;
	}
}

function su(){
	var newX = ominoX - 1;
	ominoVerso.x = verso.su.x;
	ominoVerso.y = verso.su.y;
	statoOmino = "ominoSu";
	sposta (ominoX,ominoY, newX,ominoY);
}

function sinistra(){
	var newY = ominoY - 1;
	ominoVerso.x = verso.sinistra.x;
	ominoVerso.y = verso.sinistra.y;
	statoOmino = "ominoSx";
	sposta (ominoX,ominoY, ominoX,newY);
}

function giu(){
	var newX = ominoX + 1;
	ominoVerso.x = verso.giu.x;
	ominoVerso.y = verso.giu.y;
	statoOmino = "ominoSx";
	sposta (ominoX,ominoY, newX,ominoY);
}

function destra(){
	var newY = ominoY + 1;
	ominoVerso.x = verso.destra.x;
	ominoVerso.y = verso.destra.y;
	statoOmino = "ominoDx";
	sposta (ominoX,ominoY, ominoX,newY);
}

function interazione(){
	switch(statoOmino){
		case "ominoSu":
			controlloCellaIterazione(ominoX-1,ominoY);
		case "ominoSx":
			controlloCellaIterazione(ominoX+1,ominoY);
			controlloCellaIterazione(ominoX,ominoY-1);
		case "ominoDx":
			controlloCellaIterazione(ominoX,ominoY+1);
	}
}

function controlloCellaIterazione(x,y){
	switch(piano[x][y]){
		case PORTA:
			if (chiave.numero > 0) {
				piano[x][y] = SFONDO;
				chiave.numero--;
				creaAudio('music/getItem.wav', 1);

				disegnaCella(x, y);
				testo("hai aperto la porta");
				aggiornamentoBorsa(CHIAVE);
				disegnaOmino();
				//setTimeout(el.classList.remove('screenShake'), 500);
			}
			else {
				testo("porta bloccata");
			}
	}
}

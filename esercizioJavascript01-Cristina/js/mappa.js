function mostraMatriceHTML(){
	var s = "";

	for (var i=0; i<R; i++) {
		for (var j=0; j<C;j++){
			s = s + piano[i][j] + " " ;
		}
		s = s + "<br>";
	}
	document.getElementById("messaggioDebug").innerHTML=s; 
}

function disegnaPiano(){
	//for (var i=0; i<R; i++){
	//	for (var j=0; j<C;j++){
	//		disegnaCella(i,j);
	//	}
	//}
	// disegna l'omino in una data posizione
	//disegnaCellaSpeciale(ominoX,ominoY,omino,".gif");
	// disegna l'arma in una data posizione
	//disegnaCellaSpeciale(chiaveX,chiaveY,CHIAVE,".png");

	generaPiano(R,C);
}
function generaPillole(){
    countPillole ++; //vanno raccolti tutti, meglio contarli
	generaOggetto(PILLOLA);
}

function generaOstacolo(){
	generaOggetto(OSTACOLO);
}

function generaOggetto(valOggetto){
	// si genera un indice di riga casuale tra 0 e R
	var r = Math.random(); 
	rx = Math.floor( r * R);
	// si genera un indice di colonna casuale tra 0 e C
	var c = Math.random(); 
	ry = Math.floor( c * C);
	// utilizzando rx e rc si ha una posizione casuale nel piano di gioco
	if (piano[rx][ry]>0) 
		generaOggetto(valOgetto);
	//posiziona oggetto nella matrice
	else
		piano[rx][ry] = valOggetto;
	// in rx, ry c'è un nuovo valore quindi meglio ridisegnare la cella
	disegnaCella(rx,ry);
	
	
}

function disegnaCella(i,j){
	var id = "c"+i+"_"+j;
	var src = pathImg + piano[i][j] + ".png";
	document.getElementById(id).src= src;
} 

function disegnaCellaSpeciale(i,j,valore,tipo) {
	var id = "c"+i+"_"+j;
	var src = pathImg + valore + tipo;
	console.log(id + " " + src);
	document.getElementById(id).src=src;
	
} 

function disegnaOmino() {

	if (chiave.numero > 0) {
			omino = statoOmino+ominoConChiave;
	}
	else{
			omino = statoOmino;
	}
	disegnaCellaSpeciale(ominoX,ominoY,omino,".gif");
} 
var t = "";
function testo(oggetto) {
	t = t + oggetto + "<br>";
	document.getElementById("testo").innerHTML = t;
}

function pulisciTesto() {
	t = " ";
	document.getElementById("testo").innerHTML = t;
}
function inizializza() {

	document.getElementById('iniziale').remove();

	creaEl('h1', 'livello', 'livello', 'body');
	creaEl('div','main', 'main', 'body');
	creaEl('div', 'piano', 'piano', 'main');
	document.getElementById('piano').setAttribute('align', 'center');
	creaEl('div', 'borsa', 'borsa', 'main');
	creaEl('p', 'testo', 'testo', 'body');
	cambiaStanza(0);
	var music = new Audio("music/AfterworldMain.mp3");
	music.autoplay = true;
	music.volume = 0.2;
	music.loop = true;
	body.appendChild(music);
}

function creaEl(el,id, classe, padre) {
	var div = document.createElement(el);
	div.id = id;
	div.className = classe;
	document.getElementById(padre).appendChild(div);
}

function creaAudio(nome, volume) {
	var audio = new Audio(nome);
	audio.volume = volume;
	audio.play();
}
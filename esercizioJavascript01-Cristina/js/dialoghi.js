
const Dialogo = {
    max: 0,
    cont:[],
    modello: {
        img:'',
        nome:'',
        contenuto:'',
    },
    creaDialogo(img, nome, contenuto) {
        var dial = Object.create(this.modello);
        dial.img = img;
        dial.nome = nome;
        dial.contenuto = contenuto;
        this.cont.push(dial);
    }
};

const dialogoIniziale = Object.create(Dialogo);
dialogoIniziale.max = 4;
dialogoIniziale.creaDialogo(null, '', '');

var presoChiave = false;
const dialogoPresoChiave = Object.create(Dialogo);
dialogoPresoChiave.max = 3;


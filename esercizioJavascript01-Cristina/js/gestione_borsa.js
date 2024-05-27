
function aggiornamentoBorsa(argomento) {

    switch (argomento) {
        case CHIAVE:

            //creare lo spazio nella borsa
            if (!chiave.haInBorsa) {
                creaCasellaBorsa(chiave);
                chiave.haInBorsa = true;
            }
            else {
                //cancellare dalla borsa
                if (numeroChiave == 0) {
                    cancellaOggettoDallaBorsa(chiave);
                    chiave.haInBorsa = false;
                }
                //cambia valore dell'oggetto
                else {
                    cambiaValoreOggettoBorsa(chiave);
                }
            }
            break;
    }
}

function creaCasellaBorsa(oggetto) {
    var c = document.getElementById("borsa");

    //crea l' oggetto nella borsa
    var div = document.createElement('div');
    div.id = oggetto.id;
    div.className = "oggettoInBorsa";
    c.appendChild(div);

    div = document.getElementById(div.id);

    //aggiunta della div dell' icona
    var imgDiv = document.createElement('div');
    imgDiv.id = oggetto.imageId;
    imgDiv.className = 'imageCol';
    div.appendChild(imgDiv);

    //aggiunta dell' icona 
    var image = new Image();
    image.src = pathImg + oggetto.val + ".png";
    imgDiv.appendChild(image);

    //aggiunta della div del testo
    var textDiv = document.createElement('div');
    textDiv.id = oggetto.textId;
    textDiv.className = 'textCol';
    div.appendChild(textDiv);
    //aggiunta della descrizione
    var t = document.createTextNode(oggetto.text + " x" + oggetto.numero); 
    textDiv.appendChild(t);
    div.setAttribute('onclick', "oggettoDescrizione('" + oggetto.textId+"','"+oggetto.descrizioneId+"','"+oggetto.descrizione + "')");
}
function oggettoDescrizione(parentId,id,text) {
    var parentDiv = document.getElementById(parentId);
    if (parentDiv.children.length >= 1) {
        console.log(true);
        document.getElementById(id).remove();
    }
    else {
        console.log(false);
        var desc = document.createElement('div');
        desc.id = id;
        desc.className = 'descrizioneOggetto';
        desc.innerHTML = text;
        parentDiv.appendChild(desc);
    }
}
function cambiaValoreOggettoBorsa(oggetto) {
    document.getElementById(oggetto.textId).innerHTML = oggetto.text + " x" + oggetto.numero;
}

function cancellaOggettoDallaBorsa(oggetto) {
    const div = document.getElementById(oggetto.id);
    div.remove();
}
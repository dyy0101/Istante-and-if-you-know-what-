var imgDialogo = [];
var nomeDialogo = [];
var contenutoDialogo = [];

function rappresentaDialogBox(num,max) {
    var canvas = document.createElement("div");
    canvas.id = "canvas";
    canvas.className = "canvas";
    document.getElementById("body").appendChild(canvas);

    var shadow = document.createElement("div");
    shadow.id = "shadow";
    shadow.className = "shadow";
    document.getElementById(canvas.id).appendChild(shadow);

    var dialogBackGraund = document.createElement("div");
    dialogBackGraund.className = "dialogBackGraund";
    document.getElementById(canvas.id).appendChild(dialogBackGraund);

    var dialogBox = document.createElement("div");
    dialogBox.id = "dialogBox";
    dialogBox.className = "dialogBox";
    dialogBox.onclick = function () { num++; controllaDialogo(num,max); };
    document.getElementById(canvas.id).appendChild(dialogBox);

    var img = document.createElement("img");
    img.id = "dialogImg";
    document.getElementById(dialogBox.id).appendChild(img);

    var textDiv = document.createElement("div");
    textDiv.id = "textDiv";
    textDiv.className = "textDiv";
    document.getElementById(dialogBox.id).appendChild(textDiv);


    var dialogName = document.createElement("div");
    dialogName.id = "dialogName";
    dialogName.className = "dialogName";
    document.getElementById(textDiv.id).appendChild(dialogName);

    var dialogContent = document.createElement("div");
    dialogContent.id = "dialogContent";
    dialogContent.className = "dialogContent";
    document.getElementById(textDiv.id).appendChild(dialogContent);
}

function cancellaDialogBox() {
    const div = document.getElementById("canvas");
    div.remove();
    puoMuovere = true;
}

function testoDialogo(imgContent, nome, contenuto) {
    if (imgContent === null) {
        document.getElementById("dialogImg").remove();
        document.getElementById("dialogBox").classList.add("dialogAlVuoto");
    }
    else {
        document.getElementById("dialogBox").classList.remove("dialogAlVuoto");
        if (document.getElementById("dialogImg") === null) {
            var img = document.createElement("img");
            img.id = "dialogImg";
            img.src = pathImg + imgContent + ".png";
            document.getElementById("dialogBox").insertBefore(img, document.getElementById("textDiv"));
        }
        else {
            document.getElementById("dialogImg").src = pathImg + imgContent + ".png";
        }
    }
    document.getElementById("dialogName").innerHTML = nome;
    var c = [];
    c=contenuto;
    /*for(var i=0; c[i]!=null; i++){
        setTimeout(document.getElementById("dialogContent").innerHTML = c[i], 100000);

    }*/

    document.getElementById("dialogContent").innerHTML = contenuto;
}

function controllaDialogo(num,max) {
    puoMuovere = false;
    if (num==0)
        rappresentaDialogBox(num,max);
    if (num == max) {
        cancellaDialogBox();
    }
    else {
        testoDialogo(imgDialogo[num], nomeDialogo[num], contenutoDialogo[num]);
        num++;
    }
}

function dialogo(id){
    var max = id.max;
    nomeDialogo = id.nome;
    contenutoDialogo = id.contenuto;
    imgDialogo = id.img;
    controllaDialogo(0, max);
}

var accionesSol=[];
var reglasSol=[];
var estadosSol=[];
var estados = []
var acciones = []
var reglas = []

function getDocumento(URL){
    fetch(URL)
    .then(response => response.text())
    .then(data => {
        var xmlDoc = new DOMParser().parseFromString(data, "text/xml");
        // Obtener el elemento div para la lista de ejercicios
        var exerciseListDiv = document.getElementById('exercise-list');

        // Obtener el elemento <Ejercicios>
        var ejerciciosElement = xmlDoc.getElementsByTagName('Ejercicios')[0];

        console.log(ejerciciosElement);

        // Crear el elemento de lista <ul>
        var ul = document.createElement('ul');

        // Obtener todos los elementos <ejercicio>
        var ejercicios = ejerciciosElement.getElementsByTagName('ejercicio');

        // Recorrer los elementos <ejercicio>
        for (var i = 0; i < ejercicios.length; i++) {
        var ejercicio = ejercicios[i];

        // Obtener el ID del ejercicio
        var ejercicioId = ejercicio.getAttribute('id');

        // Obtener el título del ejercicio
        var ejercicioTitulo = ejercicio.getElementsByTagName('titulo')[0].textContent;
        var tipoEjercicio = ejercicio.getElementsByTagName('tipo')[0].textContent;

        // Crear el elemento de lista <li> para el título del ejercicio
        var li = document.createElement('li');
        li.innerHTML = '<a draggable="true" ondragstart="drag(event)" id="' + i + '" tipo="'+ tipoEjercicio +'">' + ejercicioTitulo + ' ' + ejercicioId + '</a><br>';
        addSol(ejercicioTitulo, tipoEjercicio);

        // Obtener los subrequisitos
        var subrequisitos = ejercicio.getElementsByTagName('subrequisito');

        var k = 0;
        // Verificar si existen subrequisitos
        if (subrequisitos.length > 0) {
            // Crear el elemento de lista <ul> para los subrequisitos
            var subrequisitosUl = document.createElement('ul');

            // Recorrer los subrequisitos
            for (var j = 0; j < subrequisitos.length; j++) {
            var subrequisito = subrequisitos[j];

            // Obtener el título del subrequisito
            var subrequisitoTitulo = subrequisito.getElementsByTagName('titulo')[0].textContent;
            var subtipoEjercicio = subrequisito.getElementsByTagName('tipo')[0].textContent;

            // Crear el elemento de lista <li> para el subrequisito
            var subrequisitoLi = document.createElement('li');
            subrequisitoLi.innerHTML =  '<a draggable="true" ondragstart="drag(event)" id=sub"' + i +"." + j + '" tipo="'+ subtipoEjercicio +'">' + subrequisitoTitulo + '</a>';

            addSol(subrequisitoTitulo, subtipoEjercicio);
            // Agregar el subrequisito al elemento de lista <ul> de subrequisitos
            subrequisitosUl.appendChild(subrequisitoLi);
            }

            // Agregar el elemento de lista <ul> de subrequisitos al elemento de lista <li> del ejercicio
            li.appendChild(subrequisitosUl);
            k++;
        }

        // Agregar el elemento de lista <li> al elemento de lista <ul>
        ul.appendChild(li);
        }

        // Agregar el elemento de lista <ul> al div de la lista de ejercicios
        exerciseListDiv.appendChild(ul);
    })
    .catch(error => console.error(error));
}

function getConfig() {
    return fetch("https://raw.githubusercontent.com/Vasapg/PIE-SCORM/main/Self-Assesment-6/exercises/config.xml")
      .then(response => response.text())
      .then(data => {
        var xmlDoc = new DOMParser().parseFromString(data, "text/xml");
        localStorage.setItem("nEjercicio", 0);
        localStorage.setItem("maxEjercicio", parseInt(xmlDoc.getElementsByTagName("numExercises")[0].childNodes[0].nodeValue));
        var titulos = [];
        var urls = [];
        
        // obtiene todas las etiquetas "title" y "url"
        var titleTags = xmlDoc.getElementsByTagName("title");
        var urlTags = xmlDoc.getElementsByTagName("url");
        console.log(titleTags);
        console.log(urlTags);
        console.log(xmlDoc);
        
        // itera sobre las etiquetas y guarda los contenidos en los arrays
        for (var i = 0; i < titleTags.length; i++) 
        {
          titulos.push(titleTags[i].textContent);
          urls.push(urlTags[i].textContent);
        }
        console.log(titulos);
        console.log(urls);
        localStorage.setItem("urls", JSON.stringify(urls));
        localStorage.setItem("titulos", JSON.stringify(titulos));
      });
  }
  
  async function getUrl() {
    if (!localStorage.getItem("urls")) {
      await getConfig();
    }
    var nEjercicio = parseInt(localStorage.getItem("nEjercicio"));
    console.log(nEjercicio);

    var url = JSON.parse(localStorage.getItem("urls"));
    url = url[nEjercicio];

    getDocumento(url);
    nEjercicio = nEjercicio + 1;
    localStorage.setItem("nEjercicio", nEjercicio);
  }
  


function comprobarXHTTP(){
    var xhttp;
        if(window.XMLHttpRequest){
            xhttp = new XMLHttpRequest();
        }
        else{
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhttp;
}


function formatearTexto(texto)
{
    return texto.replace(/[\n]/gi,"<br>");
}

function Comp()
{
    localStorage.setItem("accionesRespuesta", JSON.stringify(acciones));
    localStorage.setItem("reglasRespuesta", JSON.stringify(reglas));
    localStorage.setItem("estadosRespuesta", JSON.stringify(estados));
    localStorage.setItem("accionesSol", JSON.stringify(accionesSol));
    localStorage.setItem("reglasSol", JSON.stringify(reglasSol));
    localStorage.setItem("estadosSol", JSON.stringify(estadosSol));
    location='solutionsComp.html';
}

       //clear the boxes
function clearing(){
        document.getElementById("accionesdiv").innerHTML = "<u>Acciones</u><br>"
        acciones = []
        document.getElementById("reglasdiv").innerHTML = "<u>Reglas</u><br>"
        reglas = []
        document.getElementById("estadosdiv").innerHTML = "<u>Estados</u><br>"
        estados = []
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        console.log(ev.target.id);
        ev.dataTransfer.setData("text", ev.target.id);
        console.log(ev);
    }

    function drop(ev) {
        ev.preventDefault();
        var texto = ev.dataTransfer.getData("text");
        console.log(texto);
        texto = document.getElementById(texto);
        console.log(texto);

        box = ev.target.id
        if(box == "accionesdiv"){
            if(!acciones.includes(texto.textContent)){
                document.getElementById(box).innerHTML = document.getElementById(box).innerHTML+texto.innerHTML+"<br>"
                acciones.push(texto.textContent)
            }
            

        } else if(box == "reglasdiv"){
            if(!reglas.includes(texto.textContent)){
                document.getElementById(box).innerHTML = document.getElementById(box).innerHTML+texto.innerHTML+"<br>"
                reglas.push(texto.textContent)
            }
            
            
        } else if(box == "estadosdiv"){
            if(!estados.includes(texto.textContent)){
                document.getElementById(box).innerHTML = document.getElementById(box).innerHTML+texto.innerHTML+"<br>"
                estados.push(texto.textContent)
            }
        }
        console.log(acciones, estados, reglas);
    }

    function addSol(texto, tipo)
    {
        if(tipo == "1")
            accionesSol.push(texto)
        else if(tipo == "2")
            reglasSol.push(texto)    
        else if(tipo == "3")
            estadosSol.push(texto)
        console.log(texto, tipo);
    }

//if(!localStorage.getItem("texto"))
localStorage.clear();
window.onload = getUrl();
    /*
else
{
    var texto = localStorage.getItem("texto");
    var body = document.getElementById("documentoXML");
    var textHTML = document.createElement("p");
    textHTML.innerHTML = formatearTexto(texto);

    var espacioHTML  = document.createElement("hr");
    body.appendChild(textHTML);
    body.appendChild(espacioHTML);
}*/

function fillBoxes(leftRules, leftActions, leftStates, rightRules, rightActions, rightStates) {
    fillColumn('.left-column .box.rules .box-content', '.right-column .box.rules .box-content', 
    leftRules, rightRules,  "reglasCorrectas", "reglasIncorrectas");
    fillColumn('.left-column .box.actions .box-content', '.right-column .box.actions .box-content', 
    leftActions, rightActions, "accionesCorrectas", "accionesIncorrectas");
    fillColumn('.left-column .box.states .box-content', '.right-column .box.states .box-content', 
    leftStates, rightStates, "estadosCorrectos", "estadosIncorrectos");
}

function fillColumn(selector, selectorRight, leftItems, rightItems, typeCorr, typeInco) {
    var boxContents = document.querySelectorAll(selector);
    var boxContentsRight = document.querySelectorAll(selectorRight);
    var correctas = 0;
    var incorrectas = 0;
    
    for (var i = 0; i< rightItems.length ; i++) {
            var boxContent = boxContents[0];
            var rightItem = rightItems[i];
            element = document.createElement('div');
            element.textContent = rightItem;
            boxContentsRight[0].appendChild(element);
    }

    for (var i = 0; i < leftItems.length ; i++) {
        var boxContent = boxContents[0];
        var leftItem = leftItems[i];
        var rightItem = rightItems[i];

        var element = document.createElement('div');
        element.textContent = leftItem;

        if (rightItems.includes(leftItem)) {
            element.classList.add('highlight-green');
            correctas++;
        } else {
            element.classList.add('highlight-red');
            incorrectas++;
        }
        boxContent.appendChild(element);
    }
    localStorage.setItem(typeCorr, correctas);
    localStorage.setItem(typeInco, incorrectas);
}

var leftRules = JSON.parse(localStorage.getItem("reglasRespuesta"));
var leftActions = JSON.parse(localStorage.getItem("accionesRespuesta"));
var leftStates = JSON.parse(localStorage.getItem("estadosRespuesta"));

var rightRules = JSON.parse(localStorage.getItem("reglasSol"));
var rightActions =JSON.parse(localStorage.getItem("accionesSol"));
var rightStates = JSON.parse(localStorage.getItem("estadosSol"));

console.log(leftRules, leftActions, leftStates, rightRules, rightActions, rightStates);

fillBoxes(leftRules, leftActions, leftStates, rightRules, rightActions, rightStates);

var notas=[]
var i=0;

// Función para crear una nueva fila en la tabla
function agregarFila(tabla, tipo, correctas, incorrectas, nota) {
    var fila = tabla.insertRow();
    var celdaTipo = fila.insertCell();
    var celdaCorrectas = fila.insertCell();
    var celdaIncorrectas = fila.insertCell();
    var celdaNota = fila.insertCell();

    celdaTipo.innerHTML = tipo;
    celdaCorrectas.innerHTML = correctas;
    celdaIncorrectas.innerHTML = incorrectas;
    celdaNota.innerHTML = nota;
}

// Función para calcular la nota
function calcularNota(correctas, incorrectas) {
    notas[i] = correctas - (incorrectas/2);
    i++;
    return correctas - (incorrectas / 2);
}

// Obtener la tabla
var tabla = document.getElementById("tablaNotas");

// Encabezados de columna
var encabezado = tabla.createTHead().insertRow();
encabezado.innerHTML = "<th>Tipo</th><th>Correctas</th><th>Incorrectas</th><th>Nota</th>";

// Datos de ejemplo
var accionesCorrectas = JSON.parse(localStorage.getItem("accionesCorrectas"));
var accionesIncorrectas = JSON.parse(localStorage.getItem("accionesIncorrectas"));
var reglasCorrectas = JSON.parse(localStorage.getItem("reglasCorrectas"));
var reglasIncorrectas = JSON.parse(localStorage.getItem("reglasIncorrectas"));
var estadosCorrectos = JSON.parse(localStorage.getItem("estadosCorrectos"));
var estadosIncorrectos = JSON.parse(localStorage.getItem("estadosIncorrectos"));

// Agregar filas de datos
agregarFila(tabla, "Acciones", accionesCorrectas, accionesIncorrectas, calcularNota(accionesCorrectas, accionesIncorrectas));
agregarFila(tabla, "Reglas", reglasCorrectas, reglasIncorrectas, calcularNota(reglasCorrectas, reglasIncorrectas));
agregarFila(tabla, "Estados", estadosCorrectos, estadosIncorrectos, calcularNota(estadosCorrectos, estadosIncorrectos));

// Fila final para sumar las columnas de "Nota"
var filaSuma = tabla.insertRow();
filaSuma.innerHTML = "<td>Total</td><td>" + (accionesCorrectas + reglasCorrectas + estadosCorrectos) + "</td><td>" + 
(accionesIncorrectas + reglasIncorrectas + estadosIncorrectos) + "</td><td>"+ notas.reduce(function(acc, current) {
    return acc + current;
  }, 0); +"</td>";

var max = parseInt(localStorage.getItem("maxEjercicio"));
var current = parseInt(localStorage.getItem("nEjercicio"));
console.log(max);
console.log(current);
if((max) == current)
{
    document.getElementById("final").style.display = "block";
    document.getElementById("next").style.display = "none";
}

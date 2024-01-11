const readline = require("readline");

// Lista de tareas
let tasks = [];

// Función para añadir una tarea
function addTask(indicador, descripcion) {
  const nuevaTarea = { indicador, descripcion, completada: false };
  tasks.push(nuevaTarea);
  console.log(`Tarea añadida: ${descripcion}`);
}

// Función para eliminar una tarea por indicador
function deleteTask(indicador) {
  tasks = tasks.filter((task) => task.indicador !== indicador);
  console.log(`Tarea con indicador ${indicador} eliminada.`);
}

// Función para marcar una tarea como completada
function completeTask(indicador) {
  const tarea = tasks.find((task) => task.indicador === indicador);
  if (tarea) {
    tarea.completada = true;
    console.log(`Tarea con indicador ${indicador} marcada como completada.`);
  } else {
    console.log(`No se encontró ninguna tarea con indicador ${indicador}.`);
  }
}

// Función para mostrar todas las tareas
function showTasks() {
  console.log("Lista de tareas:");
  tasks.forEach((task) => {
    const estado = task.completada ? "Completada" : "Pendiente";
    console.log(`- ${task.indicador}: ${task.descripcion} (${estado})`);
  });
}

// Configuración de la interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Función para manejar la entrada del usuario
function handleInput() {
  rl.question(
    "¿Qué acción deseas realizar? (add/delete/complete/show/exit): ",
    function (answer) {
      switch (answer.toLowerCase()) {
        case "add":
          rl.question("Indicador de la tarea: ", function (indicador) {
            rl.question("Descripción de la tarea: ", function (descripcion) {
              addTask(indicador, descripcion);
              handleInput();
            });
          });
          break;
        case "delete":
          rl.question(
            "Indicador de la tarea a eliminar: ",
            function (indicador) {
              deleteTask(indicador);
              handleInput();
            }
          );
          break;
        case "complete":
          rl.question(
            "Indicador de la tarea a marcar como completada: ",
            function (indicador) {
              completeTask(indicador);
              handleInput();
            }
          );
          break;
        case "show":
          showTasks();
          handleInput();
          break;
        case "exit":
          rl.close();
          break;
        default:
          console.log(
            "Comando no reconocido. Por favor, elige una opción válida."
          );
          handleInput();
          break;
      }
    }
  );
}

console.log("¡Bienvenido a la lista de tareas!");
handleInput();

//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer');


let comando = argv._[0];

switch ( comando ){

    case 'crear':
       let tarea = porHacer.crear( argv.description ); // La funcion devuelve un objeto
     console.log(tarea);
    break;

    case 'listar':
        
        let listado = porHacer.getListado(); // la funcion devuelve un objeto
        //console.log( listado);
        for ( let tarea of listado){
            console.log('====== Por Hacer ========='.green);
            console.log(tarea.description);
            console.log('Estado: ', tarea.completado);
            console.log('=========================='.green);
        }

    break;

    case 'actualizar':
       let actualizado = porHacer.actualizar(argv.description);
       if (actualizado) {
           console.log ( 'Actualizado', argv.description, argv.completado);
       } else {
           console.log ('No actualizado');
       }
    break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.description);
        console.log(borrado); // devuelve true (si borrado) o false (no borrado)
    
    break;    

    default:
        console.log('Comando no es reconocido.');
}
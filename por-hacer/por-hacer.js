const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer); // Introducimos el arreglo de objetos.

    fs.writeFile('db/data.json',data, (err)=>{ // Toma como referencia el archivo raiz app
        if (err) throw new Error('No se pudo grabar', err);
    });

}


const borrar = (description) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter( tarea =>{ //Recorre el array. Guarda todo menos el elemento buscado.
        return tarea.description !== description         // Si devuelve true se guarda el registro
                                                        // y sigue con la siguiente iteración.
    });

    if (listadoPorHacer.length === nuevoListado.length) { // Si tiene la misma longitud entonces no borro elementos
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}

const cargarDB = () => {  //Carga el arreglo de objetos que hay en el archivo json
    try {
        listadoPorHacer = require('../db/data.json'); //Si no existen datos en el archivo entonces da error

    } catch (error) { // Si da error salta a este catch
        listadoPorHacer = [];
    }
}   

const getListado = () => {
cargarDB();

return listadoPorHacer;
}

 const actualizar = (description, completado = true) =>{ // dos argumentos, el segundo por defecto es true

    cargarDB();

    // Itera un array y devuelve la primera posición que cumpla el predicado. Si no lo encuentra devuelve -1
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.description === description; //la primera vez que cumpla el predicado devuelve indice y termina.
                                                  //findIndex itera cada elemento del array dentro de tarea
                                                  //Si nunca se cumple la condición devuelve -1
    })

    if ( index >=0 ) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

 }


const crear = (description) => {

    cargarDB();

    let porHacer ={  // crea un objeto con dos caracteristicas
        description,
        completado: false
    };

    listadoPorHacer.push ( porHacer ); // añadimos un elemento objeto al array

    guardarDB();

    return porHacer; // envia devuelto el objeto creado

}

module.exports = {
    crear,
    getListado, 
    actualizar,
    borrar
}
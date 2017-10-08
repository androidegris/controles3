/**
 * basedatos.js:
 * ----------
 *    Inicio de base de datos SQLite. Crea una tabla de asesores con
 * los siguientes campos:
 * 
 *  id:       Id se genera al ingresar usuario a la base de datos
 *  nombre:   Nombre del usuario
 *  user:     Nombre de identificacion del usuario (debe ser unico)
 *  password: Contraseña para la autenticacion del usuario
 * 
 * y otra de Reportes con los siguientes:
 * 
 *  id:          Id se genera al ingresar reporte en la base de datos
 *  asesor:      Nombre de identificación asesor
 *  cliente:     Nombre de identificación cliente
 *  fecha:       Fecha en que se realizo
 *  hora_inicio: Hora inicio
 *  hora_fin:    Hora fin
 *  descripcion: Descripcion
 * 
 * Andres J. Guzman M.
 * Universidad Simon Bolivar, 2016.
 */

var fs = require("fs");
var file = "controles.db";
var exists = fs.existsSync(file); // Vemos si no existe para crearla
var sqlite3 = require('sqlite3').verbose();


// Funcion inicia la base de datos
function iniciar(){
    if(!exists) {
        console.log("Creating DB file."); // Se crea si no existe
        fs.openSync(file, "w");
    }
    var db = new sqlite3.Database(file);

    db.serialize(function() {
    if(!exists) {
        // Se crean tablas
        db.run("CREATE TABLE IF NOT EXISTS Asesores " +
        "(_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, " +
        "user TEXT UNIQUE NOT NULL, password TEXT NOT NULL)");
        
        db.run("CREATE TABLE IF NOT EXISTS Clientes " +
        "(_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL)");
        
        db.run("CREATE TABLE IF NOT EXISTS Reportes "+
        "(_id INTEGER PRIMARY KEY AUTOINCREMENT, asesor TEXT NOT NULL, cliente TEXT NOT NULL, "+
        "dia INTEGER NOT NULL, mes INTEGER NOT NULL, anio INTEGER NOT NULL, hora_inicio DOUBLE, "+
        "hora_fin DOUBLE, descripcion TEXT, h_fact DOUBLE,"+
        "FOREIGN KEY (asesor) REFERENCES Asesores (user), "+
        "UNIQUE (asesor, cliente, dia, mes, anio));");
        
        db.run("CREATE TABLE IF NOT EXISTS Actividades " +
        "(_id INTEGER PRIMARY KEY AUTOINCREMENT, asesor TEXT NOT NULL, cliente TEXT NOT NULL, "+
        "dia INTEGER NOT NULL, mes INTEGER NOT NULL, anio INTEGER NOT NULL, descripcion TEXT," +
        "FOREIGN KEY  (asesor, cliente, dia, mes, anio) REFERENCES Reportes (asesor, cliente, dia, mes, anio))");
        
        
  
        var insertar = "INSERT INTO Clientes VALUES (?,?)";
        console.log("Las tablas han sido correctamente creada");
        /*
        try {
            //Insertamos Clientes manualmente
            db.run(insertar,[null,"INDUSTRIAL PARAISO "],
                function(error){
                    if (error){
                     console.log(error);
                    }
                });
            db.run(insertar,[null,"COLEGIO HEBRAICA"],
                function(error){
                    if (error){
                     console.log(error);
                    }
                });
        } catch (err) {
        // manejamos error
            console.log("ERROR");
            console.log(err);
        }
        */
    }
        // Vemos lista de usuarios en la base de datos        
        console.log("Lista de Asesores");
        db.each("SELECT nombre,user FROM Asesores", function(err, row) {
            console.log("Usuario: "+ row.user + " Nombre: " + row.nombre );
        });
        console.log("Lista de Clientes");
        db.each("SELECT nombre FROM Clientes", function(err, row) {
            console.log("Cliente: " + row.nombre );
        });
        
    });

    db.close();
}



// Exportamos funciones
exports.iniciar = iniciar;

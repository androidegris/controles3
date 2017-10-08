
var querystring = require("querystring");
var file = "controles.db";
var fs = require('fs');
var moment = require('moment'); // Libreria para la fecha
moment.locale('es');
var bcrypt = require('bcrypt'); // Libreria login encriptado
const saltRounds = 2;
var async = require("async"); // Libreria para manejar sincronia


// Desplega formulario de actualizar
function pruebaActualizarInsertar(respuesta,data) {
    console.log("Manipulador de petición 'prueba Actualizar' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>PRUEBA ACTUALIZAR SERVIDOR</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
                "<body>"+
                    '<form action="/actualizarServidorInsertar" method="post">'+
    '<input type="TEXT" name="user" placeholder="Asesor" size="40">'+
                                    "<br>"+
    '<input type="password" placeholder="Clave" name="password" size="40">'+
                                    "<br>"+
    '<input type="TEXT" placeholder="Cantidad insertar" name="c_insert" size="40">'+
                                    "<br>"+
    '<textarea name="lista_insert" rows="10" cols="40" placeholder="Lista insertar"></textarea>'+
                                    "<br>"+
    '<input type="TEXT" placeholder="Cantidad Actividades insertar" name="c_insert_act" size="40">'+
                                    "<br>"+
    '<textarea name="lista_insert_act" rows="10" cols="40" placeholder="Actividades"></textarea>'+
                                    "<br>"+
                                        '<input type="submit" value="ENVIAR"/>'+
                                    "</form>"+
                                "</body>"+
                            "</html>"+
                        "</body>"+
                    '</html>';
    respuesta.writeHead(200, {"Content-Type": "text/html"});
    respuesta.write(body);
    respuesta.end(); 
}





// Funcion actualiza reportes del servidor
function actualizarServidorInsertar(respuesta,data) {
    console.log("Manipulador de petición 'actualizarServidor Insertar' ha sido llamado.");
    var usuario = querystring.parse(data)["user"];
    var clave = querystring.parse(data)["password"];
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    try {
        db.get("SELECT user,password FROM Asesores WHERE user =?",
        [usuario], 
        function(error, row) {
            if (error || row == undefined){ // Vemos si usuario existe
                console.log(error);
                console.log("Error en Login");
                respuesta.write("Error en Login"+ "\n");
            }
            else { // Si existe revisamos que su clave este correcta
            if (row.user == usuario) {
                // Comprobamos con la clave encriptada
                bcrypt.compare(clave, row.password, function(err, res) {
                if (res == true) {
                    console.log("Login Exitoso");
                    //Login exitoso buscamos reportes a insertar
                    var lista_insert = querystring.parse(data)["lista_insert"];
                    var c_insert =  parseInt(querystring.parse(data)["c_insert"],10);
                    var datos_insert = lista_insert.split("\n");
                    var contador = 0;
                    var l_insert = [];
                    while (c_insert > contador) { // Dividimos datos y guardamos
                        var d_insert = datos_insert[contador].split("-");
                        var asesor_insert = d_insert[0];
                        var cliente_insert = d_insert[1];
                        var dia_insert = parseInt(d_insert[2],10);
                        var mes_insert = parseInt(d_insert[3],10);
                        var anio_insert = parseInt(d_insert[4],10);
                        var h_ini = parseFloat(d_insert[5],10);
                        var h_fin= parseFloat(d_insert[6],10);
                        var h_fact= parseFloat(d_insert[7],10);
                        var desc = d_insert[8];
                        var reporte_insert = [asesor_insert, cliente_insert,
                                             dia_insert, mes_insert, anio_insert,
                                             h_ini, h_fin, h_fact, desc];
                        l_insert.push(reporte_insert);
                        contador = contador + 1;
                    }
                    console.log("ESTE ES ARREGLO DE REPORTES A AGREGAR");
                    console.log(l_insert);
                    // insertamos reportes con async
                    
                    // Funcion async
                    async.eachSeries(l_insert,
                        // Funcion donde cada elemento de l_insert es pasado
                    function(r_insert, callback){
                        // Vemos si reporte existe
                        db.get("SELECT asesor  FROM Reportes WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?",
                        [r_insert[0],r_insert[1],r_insert[2],r_insert[3],r_insert[4]], 
                        function(error, row) { // Vemos si existe reporte
                        if (error || row == undefined){ // Si no existe lo insertamos
                        // Insertamos nuevo reporte
                        var insertar = "INSERT INTO Reportes VALUES (?,?,?,?,?,?,?,?,?,?)";
                        db.run(insertar,[null,
                        r_insert[0],r_insert[1],r_insert[2],r_insert[3],r_insert[4],
                        r_insert[5],r_insert[6],r_insert[8],r_insert[7]],
                            function(error){
                                if (error){
                                    console.log(error);
                                    console.log("Error registro transferencia");
                                    callback("Error: Problemas con el reporte"+ "\n");
                                }
                                else {
                                    // Si es exitoso editamos reporte
                                    console.log("Exito Reporte Insertado");
                                    callback();
                                    }
                                    }); 
                        }
                        else {
                            // Si ya existe lo actualizamos
                            var actualizar = "UPDATE Reportes SET "+
                            "hora_inicio = ?,hora_fin = ?, h_fact = ? ,descripcion = ? WHERE asesor = ? " +
                            "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?";
                            db.run(actualizar,
                            [   
                                r_insert[5],r_insert[6],r_insert[7],r_insert[8],
                                r_insert[0],r_insert[1],r_insert[2],r_insert[3],
                                r_insert[4]
                            ],
                                function(error){
                                    if (error){
                                        console.log(error);
                                        console.log("Error actualizando reporte");
                                        callback("Error: actualizando reporte"+ "\n");
                                    }
                                    else {
                                        console.log("Reporte actualizado");
                                        callback();
                                    }
                                });
                        }
                        }); // Termino Insertar
                    },
                    // Cuando terminaron todos los insertar reportes
                    function(err){
                        if (err){
                            console.log(err);
                            console.log("Error: Problemas en insertinar");
                            respuesta.end("Error: Problemas en insertinar");
                            db.close();
                        }
                        else{
                            console.log("Exito operacion insertarReporte");
                            
                            // Insertamos actividades
                            
                            
                            
                            
                            
                            respuesta.end("Exito actualizar servidor");
                            db.close();  
                            
                        }
                    }
            ); // Termino async insertinar
        
                    
                } // Caso Fallo Login
                else{
                    console.log("Error en Login");
                    respuesta.write("Error en Login"+ "\n"); 
                    respuesta.end();
                    db.close();
                }
                });
            }
            // No existe usuario
            else{
                console.log("Error en Login");
                respuesta.write("Error en Login"+ "\n");   
                respuesta.end();
                db.close();
            }
            }
        }); // termina get login
    } catch (err) {
        // manejamos error
        console.log(err);        
        db.close();
    }
}




















// FUNCIONA REPORTES
function actualizarServidorInsertarReportes(respuesta,data) {
    console.log("Manipulador de petición 'actualizarServidor Insertar' ha sido llamado.");
    var usuario = querystring.parse(data)["user"];
    var clave = querystring.parse(data)["password"];
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    try {
        db.get("SELECT user,password FROM Asesores WHERE user =?",
        [usuario], 
        function(error, row) {
            if (error || row == undefined){ // Vemos si usuario existe
                console.log(error);
                console.log("Error en Login");
                respuesta.write("Error en Login"+ "\n");
            }
            else { // Si existe revisamos que su clave este correcta
            if (row.user == usuario) {
                // Comprobamos con la clave encriptada
                bcrypt.compare(clave, row.password, function(err, res) {
                if (res == true) {
                    console.log("Login Exitoso");
                    //Login exitoso buscamos reportes a insertar
                    var lista_insert = querystring.parse(data)["lista_insert"];
                    var c_insert =  parseInt(querystring.parse(data)["c_insert"],10);
                    var datos_insert = lista_insert.split("\n");
                    var contador = 0;
                    var l_insert = [];
                    while (c_insert > contador) { // Dividimos datos y guardamos
                        var d_insert = datos_insert[contador].split("-");
                        var asesor_insert = d_insert[0];
                        var cliente_insert = d_insert[1];
                        var dia_insert = parseInt(d_insert[2],10);
                        var mes_insert = parseInt(d_insert[3],10);
                        var anio_insert = parseInt(d_insert[4],10);
                        var h_ini = parseFloat(d_insert[5],10);
                        var h_fin= parseFloat(d_insert[6],10);
                        var h_fact= parseFloat(d_insert[7],10);
                        var desc = d_insert[8];
                        var reporte_insert = [asesor_insert, cliente_insert,
                                             dia_insert, mes_insert, anio_insert,
                                             h_ini, h_fin, h_fact, desc];
                        l_insert.push(reporte_insert);
                        contador = contador + 1;
                    }
                    console.log("ESTE ES ARREGLO DE REPORTES A AGREGAR");
                    console.log(l_insert);
                    // insertamos reportes con async
                    
                    // Funcion async
                    async.eachSeries(l_insert,
                        // Funcion donde cada elemento de l_insert es pasado
                    function(r_insert, callback){
                        // Vemos si reporte existe
                        db.get("SELECT asesor  FROM Reportes WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?",
                        [r_insert[0],r_insert[1],r_insert[2],r_insert[3],r_insert[4]], 
                        function(error, row) { // Vemos si existe reporte
                        if (error || row == undefined){ // Si no existe lo insertamos
                        // Insertamos nuevo reporte
                        var insertar = "INSERT INTO Reportes VALUES (?,?,?,?,?,?,?,?,?,?)";
                        db.run(insertar,[null,
                        r_insert[0],r_insert[1],r_insert[2],r_insert[3],r_insert[4],
                        r_insert[5],r_insert[6],r_insert[8],r_insert[7]],
                            function(error){
                                if (error){
                                    console.log(error);
                                    console.log("Error registro transferencia");
                                    callback("Error: Problemas con el reporte"+ "\n");
                                }
                                else {
                                    // Si es exitoso editamos reporte
                                    console.log("Exito Reporte Insertado");
                                    callback();
                                    }
                                    }); 
                        }
                        else {
                            // Si ya existe lo actualizamos
                            var actualizar = "UPDATE Reportes SET "+
                            "hora_inicio = ?,hora_fin = ?, h_fact = ? ,descripcion = ? WHERE asesor = ? " +
                            "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?";
                            db.run(actualizar,
                            [   
                                r_insert[5],r_insert[6],r_insert[7],r_insert[8],
                                r_insert[0],r_insert[1],r_insert[2],r_insert[3],
                                r_insert[4]
                            ],
                                function(error){
                                    if (error){
                                        console.log(error);
                                        console.log("Error actualizando reporte");
                                        callback("Error: actualizando reporte"+ "\n");
                                    }
                                    else {
                                        console.log("Reporte actualizado");
                                        callback();
                                    }
                                });
                        }
                        }); // Termino Insertar
                    },
                    // Cuando terminaron todos los insertar reportes
                    function(err){
                        if (err){
                            console.log(err);
                            console.log("Error: Problemas en insertinar");
                            respuesta.end("Error: Problemas en insertinar");
                            db.close();
                        }
                        else{
                            console.log("Exito operacion insertarReporte");
                            
                            // Insertamos actividades
                            
                            
                            
                            
                            
                            respuesta.end("Exito actualizar servidor");
                            db.close();  
                            
                        }
                    }
            ); // Termino async insertinar
        
                    
                } // Caso Fallo Login
                else{
                    console.log("Error en Login");
                    respuesta.write("Error en Login"+ "\n"); 
                    respuesta.end();
                    db.close();
                }
                });
            }
            // No existe usuario
            else{
                console.log("Error en Login");
                respuesta.write("Error en Login"+ "\n");   
                respuesta.end();
                db.close();
            }
            }
        }); // termina get login
    } catch (err) {
        // manejamos error
        console.log(err);        
        db.close();
    }
}






// Funciona eliminar reportes y actividades 
function eliminarActServidor(respuesta,data) {
    console.log("Manipulador de petición 'actualizarServidor' ha sido llamado.");
    var usuario = querystring.parse(data)["user"];
    var clave = querystring.parse(data)["password"];
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    try {
        db.get("SELECT user,password FROM Asesores WHERE user =?",
        [usuario], 
        function(error, row) {
            if (error || row == undefined){ // Vemos si usuario existe
                console.log(error);
                console.log("Error en Login");
                respuesta.write("Error en Login"+ "\n");
            }
            else { // Si existe revisamos que su clave este correcta
            if (row.user == usuario) {
                // Comprobamos con la clave encriptada
                bcrypt.compare(clave, row.password, function(err, res) {
                if (res == true) {
                    console.log("Login Exitoso");
                    //Login exitoso buscamos reportes a eliminar
                    var lista_elim = querystring.parse(data)["lista_elim"];
                    var c_elim =  parseInt(querystring.parse(data)["c_elim"],10);
                    var datos_elim = lista_elim.split("\n");
                    var contador = 0;
                    var l_elim = [];
                    while (c_elim > contador) { // Dividimos datos y guardamos
                        var d_elim = datos_elim[contador].split("-");
                        var asesor_elim = d_elim[0];
                        var cliente_elim = d_elim[1];
                        var dia_elim = parseInt(d_elim[2],10);
                        var mes_elim = parseInt(d_elim[3],10);
                        var anio_elim = parseInt(d_elim[4],10);
                        var reporte_elim = [asesor_elim,cliente_elim,dia_elim,mes_elim,anio_elim];
                        l_elim.push(reporte_elim);
                        contador = contador + 1;
                    }
                    console.log("ESTE ES ARREGLO DE REPORTES A ELIMINAR");
                    console.log(l_elim);
                    // Eliminamos reportes con async
                    
                    // Funcion async
                    async.eachSeries(l_elim,
                        // Funcion donde cada elemento de l_elim es pasado
                    function(r_elim, callback){
                        // Vemos si reporte existe
                        db.get("SELECT asesor  FROM Reportes WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?",
                        [r_elim[0],r_elim[1],r_elim[2],r_elim[3],r_elim[4]], 
                        function(error, row) { // Vemos si existe reporte
                        if (error || row == undefined){ // Si no existe no hacemos nada
                            console.log(error);
                            console.log("Reporte no existe, no se hace nada");
                            callback();
                        }
                        else {
                        // Si es exitoso eliminamos reporte
                        var eliminar = "DELETE FROM Reportes WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?";
                        db.run(eliminar,[r_elim[0],r_elim[1],r_elim[2],r_elim[3],r_elim[4]],
                            function(error){
                                if (error){
                                    console.log(error);
                                    console.log("Error eliminando reporte");
                                    callback("Error: eliminando  el reporte"+ "\n");
                                }
                                else {
                                    console.log("Reporte Eliminado");
                                    var eliminar2 = "DELETE FROM Actividades WHERE asesor = ? " +
                                    "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?";
                                   db.run(eliminar2,[r_elim[0],r_elim[1],r_elim[2],r_elim[3],r_elim[4]],
                                function(error){
                                    if (error){
                                        console.log(error);
                                        console.log("Error registro actividad");
                                        callback("Error: Problemas registro actividad"+ "\n");
                                    }
                                    else {
                                        // Si es exitoso editamos reporte
                                        console.log("Eliminadas actividades asociadas");
                                        callback();
                                    }
                                });
                                }
                            });
                        }
                        });
                    },
                    // Cuando terminaron todos los eliminar reportes
                    function(err){
                        if (err){
                            console.log(err);
                            console.log("Error: Problemas en eliminar");
                            respuesta.end("Error: Problemas en eliminar");
                            db.close();
                        }
                        else{
                            console.log("Exito operacion eliminar");
                            
                            
                    //Buscamos actividades a eliminar
                    var lista_elim_act = querystring.parse(data)["lista_elim_act"];
                    var c_elim_act =  parseInt(querystring.parse(data)["c_elim_act"],10);
                    var datos_elim_act = lista_elim_act.split("\n");
                    var contador_act = 0;
                    var l_elim_act = [];
                    while (c_elim_act > contador_act) { // Dividimos datos y guardamos
                        var d_elim_act = datos_elim_act[contador_act].split("-");
                        var asesor_elim_act = d_elim_act[0];
                        var cliente_elim_act = d_elim_act[1];
                        var dia_elim_act = parseInt(d_elim_act[2],10);
                        var mes_elim_act = parseInt(d_elim_act[3],10);
                        var anio_elim_act = parseInt(d_elim_act[4],10);
                        var desc_elim_act = d_elim_act[5];
                        var reporte_elim_act = [asesor_elim_act,cliente_elim_act,
                                                dia_elim_act,mes_elim_act,
                                                anio_elim_act,desc_elim_act];
                        l_elim_act.push(reporte_elim_act);
                        contador_act = contador_act + 1;
                    }
                    console.log("ESTE ES ARREGLO DE ACTIVIDADES A ELIMINAR");
                    console.log(l_elim_act);
                   
                   
                   
                   
                   async.eachSeries(l_elim_act,
                        // Funcion donde cada elemento de l_elim es pasado
                    function(r_elim, callback){
                        var eliminar2 = "DELETE FROM Actividades WHERE asesor = ? " +
                                        "AND cliente = ? AND dia = ? AND "+
                                        "mes = ? AND anio = ? AND descripcion = ?";
                        db.run(eliminar2,[r_elim[0],r_elim[1],r_elim[2],
                                             r_elim[3],r_elim[4],r_elim[5]],
                                function(error){
                                    if (error){
                                        console.log(error);
                                        console.log("Error registro actividad");
                                        callback("Error: Problemas registro actividad"+ "\n");
                                    }
                                    else {
                                        // Si es exitoso 
                                        console.log("Eliminada actividad"+r_elim[5]);
                                        callback();
                                    }
                                });
                    },
                    // Cuando terminaron todos los eliminar actividades
                    function(err){
                        if (err){
                            console.log(err);
                            console.log("Error: Problemas en eliminar actividades");
                            respuesta.end("Error: Problemas en eliminar actividades");
                            db.close();
                        }
                        else{
                            console.log("Exito operacion eliminar ");   
                        
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                    
                            respuesta.end("Exito actualizar servidor");
                            db.close();  
                        }
                    
                    }); // Termino async eliminar actividades  
                        }
                    }
            ); // Termino async eliminar
        
                    
                } // Caso Fallo Login
                else{
                    console.log("Error en Login");
                    respuesta.write("Error en Login"+ "\n"); 
                    respuesta.end();
                    db.close();
                }
                });
            }
            // No existe usuario
            else{
                console.log("Error en Login");
                respuesta.write("Error en Login"+ "\n");   
                respuesta.end();
                db.close();
            }
            }
        }); // termina get login
    } catch (err) {
        // manejamos error
        console.log(err);        
        db.close();
    }
}





// FUNCIONA ELIMINAR REPORTES Y ACTIVIDADES ASOCIADAS
function eliminarServidor(respuesta,data) {
    console.log("Manipulador de petición 'actualizarServidor' ha sido llamado.");
    var usuario = querystring.parse(data)["user"];
    var clave = querystring.parse(data)["password"];
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    try {
        db.get("SELECT user,password FROM Asesores WHERE user =?",
        [usuario], 
        function(error, row) {
            if (error || row == undefined){ // Vemos si usuario existe
                console.log(error);
                console.log("Error en Login");
                respuesta.write("Error en Login"+ "\n");
            }
            else { // Si existe revisamos que su clave este correcta
            if (row.user == usuario) {
                // Comprobamos con la clave encriptada
                bcrypt.compare(clave, row.password, function(err, res) {
                if (res == true) {
                    console.log("Login Exitoso");
                    //Login exitoso buscamos reportes a eliminar
                    var lista_elim = querystring.parse(data)["lista_elim"];
                    var c_elim =  parseInt(querystring.parse(data)["c_elim"],10);
                    var datos_elim = lista_elim.split("\n");
                    var contador = 0;
                    var l_elim = [];
                    while (c_elim > contador) { // Dividimos datos y guardamos
                        var d_elim = datos_elim[contador].split("-");
                        var asesor_elim = d_elim[0];
                        var cliente_elim = d_elim[1];
                        var dia_elim = parseInt(d_elim[2],10);
                        var mes_elim = parseInt(d_elim[3],10);
                        var anio_elim = parseInt(d_elim[4],10);
                        var reporte_elim = [asesor_elim,cliente_elim,dia_elim,mes_elim,anio_elim];
                        l_elim.push(reporte_elim);
                        contador = contador + 1;
                    }
                    console.log("ESTE ES ARREGLO DE REPORTES A ELIMINAR");
                    console.log(l_elim);
                    // Eliminamos reportes con async
                    
                    // Funcion async
                    async.eachSeries(l_elim,
                        // Funcion donde cada elemento de l_elim es pasado
                    function(r_elim, callback){
                        // Vemos si reporte existe
                        db.get("SELECT asesor  FROM Reportes WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?",
                        [r_elim[0],r_elim[1],r_elim[2],r_elim[3],r_elim[4]], 
                        function(error, row) { // Vemos si existe reporte
                        if (error || row == undefined){ // Si no existe no hacemos nada
                            console.log(error);
                            console.log("Reporte no existe, no se hace nada");
                            callback();
                        }
                        else {
                        // Si es exitoso eliminamos reporte
                        var eliminar = "DELETE FROM Reportes WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?";
                        db.run(eliminar,[r_elim[0],r_elim[1],r_elim[2],r_elim[3],r_elim[4]],
                            function(error){
                                if (error){
                                    console.log(error);
                                    console.log("Error eliminando reporte");
                                    callback("Error: eliminando  el reporte"+ "\n");
                                }
                                else {
                                    console.log("Reporte Eliminado");
                                    var eliminar2 = "DELETE FROM Actividades WHERE asesor = ? " +
                                    "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?";
                                   db.run(eliminar2,[r_elim[0],r_elim[1],r_elim[2],r_elim[3],r_elim[4]],
                                function(error){
                                    if (error){
                                        console.log(error);
                                        console.log("Error registro actividad");
                                        callback("Error: Problemas registro actividad"+ "\n");
                                    }
                                    else {
                                        // Si es exitoso editamos reporte
                                        console.log("Eliminadas actividades asociadas");
                                        callback();
                                    }
                                });
                                }
                            });
                        }
                        });
                    },
                    // 3rd param is the function to call when everything's done
                    function(err){
                        if (err){
                            console.log(err);
                            console.log("Error: Problemas en eliminar");
                            respuesta.end("Error: Problemas en eliminar");
                            db.close();
                        }
                        else{
                            respuesta.end("Exito operacion eliminar");
                            db.close();    
                        }
                    }
            ); // Termino async eliminar
                }
                else{
                    console.log("Error en Login");
                    respuesta.write("Error en Login"+ "\n"); 
                    respuesta.end();
                    db.close();
                }
                });
            }
            // No existe usuario
            else{
                console.log("Error en Login");
                respuesta.write("Error en Login"+ "\n");   
                respuesta.end();
                db.close();
            }
            }
        }); // termina get login
    } catch (err) {
        // manejamos error
        console.log(err);        
        db.close();
    }
}



































function insertarReporte(asesor, cliente, dia, mes, anio,
                         h_ini, h_fin, descripcion, h_fact) {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var respuesta = "";
    var insertar = "INSERT INTO Reportes VALUES (?,?,?,?,?,?,?,?,?,?)";
    db.run(insertar,[null,asesor,cliente,dia,mes,anio,h_ini,h_fin,descripcion,null],
        function(error){
                if (error){
                        console.log(error);
                        console.log("Error registro transferencia");
                        respuesta = "Error: Problemas con el reporte"+ "\n";
                }
                else {
                        console.log("Reporte Exitoso\n");
                }
                return respuesta;
        }
        ); 
}






function verReporte(asesor, cliente, dia, mes, anio) {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var respuesta = "";
    db.get("SELECT _id  FROM Reportes WHERE asesor = ? " +
            "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?",
            [asesor,cliente,dia,mes,anio], 
            function(error, row) { // Vemos si existe reporte
                if (error || row == undefined){ // Si no existe damos error
                    console.log(error);
                    console.log("Error reporte no existe");
                    respuesta.write("Error: Reporte no existe"+ "\n");
                    respuesta.end();
                }
                else {
                    console.log("Reporte Exitoso\n");
                }
            }
        ); 
}





// Procesa intento de Eliminar Reporte
function subirEliminarReporte(respuesta,data) {
    console.log("Manipulador de petición 'subirEliminarReporte' ha sido llamado.");
    var asesor = querystring.parse(data)["asesor"];
    var cliente = querystring.parse(data)["cliente"];
    var dia = parseInt(querystring.parse(data)["dia"],10);
    var mes = parseInt(querystring.parse(data)["mes"],10);
    var anio = parseInt(querystring.parse(data)["anio"],10);
    var clave = querystring.parse(data)["password"];
    if (dia <= 0 || mes <= 0  || anio <= 0 || dia > 31 || mes > 12  || anio < 2016 ) { // Revisamos fecha negativa
        respuesta.write("Error: Fecha no es correcta");
        respuesta.end();    
    }
    else {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    db.serialize
    try {
        db.get("SELECT user,password  FROM Asesores WHERE user =?",
        [asesor], 
        function(error, row) { // Vemos si usuario fuente existe
            if (error || row == undefined){ // Si no existe damos error
                console.log(error);
                console.log("Error en Login undefined");
                respuesta.write("Error: Problema en datos del usuario"+ "\n");
                respuesta.end();
            }
            else { 
                if (row.user == asesor) {
                    // Comprobamos con la clave encriptada
                    bcrypt.compare(clave, row.password, function(err, res) {
                    if (res == true) {
                        console.log("Login Exitoso");
                        // Vemos si reporte existe
                        db.get("SELECT asesor  FROM Reportes WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?",
                        [asesor,cliente,dia,mes,anio], 
                        function(error, row) { // Vemos si existe reporte
                        if (error || row == undefined){ // Si no existe damos error
                            console.log(error);
                            console.log("Error reporte no existe");
                            respuesta.write("Error: Reporte no existe"+ "\n");
                            respuesta.end();
                        }
                        else {
                        // Si es exitoso eliminamos reporte
                        var eliminar = "DELETE FROM Reportes WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?";
                        db.run(eliminar,[asesor,cliente,dia,mes,anio],
                            function(error){
                                if (error){
                                    console.log(error);
                                    console.log("Error eliminando reporte");
                                    respuesta.write("Error: eliminando  el reporte"+ "\n");
                                    respuesta.end();
                                }
                                else {
                                    console.log("Reporte Eliminado");
                                    respuesta.write("Reporte Eliminado\n"); 
                                    var eliminar2 = "DELETE FROM Actividades WHERE asesor = ? " +
                                "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?";
                                db.run(eliminar2,[asesor,cliente,dia,mes,anio],
                                function(error){
                                    if (error){
                                        console.log(error);
                                        console.log("Error registro actividad");
                                        respuesta.write("Error: Problemas registro actividad"+ "\n");
                                        respuesta.end();
                                    }
                                    else {
                                        // Si es exitoso editamos reporte
                                        console.log("Reporte Exitoso");
                                        respuesta.write("Reporte Exitoso\n");
                                        respuesta.end();
                                    }
                                });
                            }
                    });
                        }
                        });
                    }
                    else{
                        console.log("Error en Login");
                        respuesta.write("Error: Error en Login"+ "\n");
                        respuesta.end();
                    }
                    });
                }
                else{
                    console.log("Error en Login");
                    respuesta.write("Error: Error en Login"+ "\n");
                    respuesta.end();
                } 
            }
        });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
    }
}
/**
 * manejador.js:
 * ----------
 *    Funciones que manejan las peticiones al servidor y devuelven la respuesta
 * adecuada.
 *
 * Seccion # 1
 * Redes de Computadoras I (CI-4835)
 * Universidad Simon Bolivar, 2016.
 */

// Dependencias
var querystring = require("querystring");
var file = "controles.db";
var fs = require('fs');
var moment = require('moment'); // Libreria para la fecha
moment.locale('es');
var bcrypt = require('bcrypt-nodejs'); // Libreria login encriptado
var async = require("async"); // Libreria para manejar sincronia

// Desplega formulario de login
function login(respuesta,data) {
    console.log("Manipulador de petición 'login' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>LOGIN</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
       '<img src="/logo.png" alt="Logo" style="width:218px;height:125px;">'+
                '<h1>Login HLS</h1>'+
                "<body>"+
                    '<form action="/subirLogin" method="post">'+
    '<input type="TEXT" name="user" placeholder="Nombre de Usuario" size="40">'+
                            "<br>"+
    '<input type="password" name="password" placeholder="Clave" size="40">'+
                                    "<br>"+
                                        '<input type="submit" value="ENVIAR" />'+
                                    "</form>"+
                                    '<form action="/registro">'+    
                                    "<br>"+
                                '<input type="submit" value="REGISTRO USUARIO" />'+
                                    "</form>" + 
                                '<form action="/registroCliente">'+    
                                    "<br>"+
                                '<input type="submit" value="REGISTRO CLIENTE" />'+
                                    "</form>" + 
                                '<form action="/reporte">'+    
                                    "<br>"+
                                '<input type="submit" value="CREAR REPORTE" />'+
                                    "</form>" +
                                '<form action="/editarReporte">'+    
                                    "<br>"+
                                '<input type="submit" value="EDITAR REPORTE" />'+
                                    "</form>" +
                                '<form action="/eliminarReporte">'+    
                                    "<br>"+
                                '<input type="submit" value="ELIMINAR REPORTE" />'+
                                    "</form>" +
                                '<form action="/actividad">'+    
                                    "<br>"+
                                '<input type="submit" value="CREAR ACTIVIDAD" />'+
                                    "</form>" +
                                '<form action="/verActividad">'+    
                                    "<br>"+
                                '<input type="submit" value="VER ACTIVIDADES" />'+
                                    "</form>" +
                                '<form action="/actividadesAsesor">'+    
                                    "<br>"+
                                '<input type="submit" value="ACTIVIDADES ASESOR" />'+
                                    "</form>" +
                                '<form action="/eliminarActividad">'+    
                                    "<br>"+
                                '<input type="submit" value="ELIMINAR ACTIVIDAD" />'+
                                    "</form>" +
                                '<form action="/listaUsuarios">'+    
                                    "<br>"+
                                '<input type="submit" value="LISTA USUARIOS" />'+
                                    "</form>" +
                                '<form action="/listaClientes">'+    
                                    "<br>"+
                                '<input type="submit" value="LISTA CLIENTES" />'+
                                    "</form>"+
                                '<form action="/subirReportes">'+    
                                    "<br>"+
                                '<input type="submit" value="LISTA REPORTES" />'+
                                    "</form>" +
                                '<form action="/reportesAsesor">'+    
                                    "<br>"+
                                '<input type="submit" value="REPORTES POR ASESOR" />'+
                                    "</form>"+
                                '<form action="/reportesCliente">'+    
                                    "<br>"+
                                '<input type="submit" value="REPORTES POR CLIENTE" />'+
                                    "</form>" +
                                    '<form action="/resumenReportes">'+    
                                    "<br>"+
                                '<input type="submit" value="RESUMEN REPORTES" />'+
                                    "</form>"+
                            "</html>"+
                        "</body>"+
                    '</html>';
    
    
    respuesta.writeHead(200, {"Content-Type": "text/html"});
    respuesta.write(body);
    respuesta.end(); 
}

// Desplega formulario de login
function index(respuesta,data) {
    console.log("Manipulador de petición 'index' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>Controles HLS</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
       '<img src="/logo.png" alt="Logo" style="width:218px;height:125px;">'+
                "<body>"+
                                    '<form action="/registro">'+    
                                    "<br>"+
                                '<input type="submit" value="REGISTRO USUARIO" />'+
                                    "</form>" + 
                                '<form action="/registroCliente">'+    
                                    "<br>"+
                                '<input type="submit" value="REGISTRO CLIENTE" />'+
                                    "</form>" + 
                                '<form action="/listaUsuarios">'+    
                                    "<br>"+
                                '<input type="submit" value="LISTA USUARIOS" />'+
                                    "</form>" +
                                '<form action="/listaClientes">'+    
                                    "<br>"+
                                '<input type="submit" value="LISTA CLIENTES" />'+
                                    "</form>"+
                                '<form action="/subirReportes">'+    
                                    "<br>"+
                                '<input type="submit" value="LISTA REPORTES" />'+
                                    "</form>" +
                                '<form action="/reportesAsesor">'+    
                                    "<br>"+
                                '<input type="submit" value="DESCARGAR RESUMEN REPORTES" />'+
                                    "</form>"+
                                '<form action="/baseDatos.db">'+    
                                    "<br>"+
                                '<input type="submit" value="DESCARGAR BASE DATOS" />'+
                                    "</form>"+
                                '<form action="/eliminarBaseDatos">'+    
                                    "<br>"+
                                '<input type="submit" value="CERRAR MES" />'+
                                    "</form>"+
                            "</html>"+
                        "</body>"+
                    '</html>';
    
    
    respuesta.writeHead(200, {"Content-Type": "text/html"});
    respuesta.write(body);
    respuesta.end(); 
}

// Desplega formulario de registro
function registro(respuesta,data) {
    console.log("Manipulador de petición 'registro' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>REGISTRO</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
                "<body>"+
                    '<form action="/subirRegistro" method="post">'+
  '<input type="TEXT" name="nombre" placeholder="Nombre" size="40">'+
                            "<br>"+
  '<input type="TEXT" name="user" placeholder="Username" size="40">'+
                            "<br>"+
  '<input type="password" name="password" placeholder="Clave" size="40">'+
                                    "<br>"+
                                        '<input type="submit" value="ENVIAR" />'+
                                    "</form>"+
                                "</body>"+
                            "</html>"+
                        "</body>"+
                    '</html>';
    respuesta.writeHead(200, {"Content-Type": "text/html"});
    respuesta.write(body);
    respuesta.end(); 
}

// Desplega formulario de registro
function registroCliente(respuesta,data) {
    console.log("Manipulador de petición 'registroCliente' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>REGISTRO CLIENTE</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
                "<body>"+
                    '<form action="/subirRegistroCliente" method="post">'+
  '<input type="TEXT" name="nombre" placeholder="Nombre Cliente" size="40">'+
                                    "<br>"+
                                        '<input type="submit" value="ENVIAR" />'+
                                    "</form>"+
                                "</body>"+
                            "</html>"+
                        "</body>"+
                    '</html>';
    respuesta.writeHead(200, {"Content-Type": "text/html"});
    respuesta.write(body);
    respuesta.end(); 
}


// Desplega formulario de reporte
function reporte(respuesta,data) {
    console.log("Manipulador de petición 'reporte' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>CREAR REPORTE</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
                "<body>"+
                    '<form action="/subirReporte" method="post">'+
    '<input type="TEXT" name="asesor" placeholder="Asesor" size="40">'+
                            "<br>"+
    '<input type="TEXT" name="cliente" placeholder="Cliente" size="40">'+
                            "<br>"+ 
    '<input type="TEXT" name="dia" placeholder="Dia" size="2">'+
                                    "<br>"+
    '<input type="TEXT" name="mes" placeholder="Mes" size="2">'+
                                    "<br>"+
    '<input type="TEXT" name="anio" placeholder="Año" size="4">'+
                                    "<br>"+
    '<input type="password" placeholder="Clave" name="password" size="40">'+
                                    "<br>"+
    '<input type="TEXT" name="hora_inicio" placeholder="Hora Inicio" maxlength="5">'+
                                    "<br>"+
    '<input type="TEXT" name="hora_fin" placeholder="Hora Fin" maxlength="5">'+
                                    "<br>"+
    '<input type="TEXT" name="hora_fact" placeholder="Hora Fact" maxlength="5">'+
                                    "<br>"+
    '<textarea name=descripcion rows="4" cols="40" placeholder="Descripcion"></textarea>'+
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


// Procesa intento de registro
function subirRegistro(respuesta,data) {
    console.log("Manipulador de petición 'subir Registro' ha sido llamado.");
    var nombre = querystring.parse(data)["nombre"];
    var usuario = querystring.parse(data)["user"];
    var clave = querystring.parse(data)["password"];
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var insertar = "INSERT INTO Asesores VALUES (?,?,?,?)";
    try {
        //Insertamos nuevo usuario con 1000 de saldo
        //Encriptamos clave
        bcrypt.hash(clave, null,null, function(err, hash) {
        db.run(insertar,[null,nombre,usuario,hash],
            function(error){
                if (error){
                    console.log(error);
                    console.log("Error en Registro");
                    var msjError = "SQLITE_CONSTRAINT: UNIQUE constraint failed: Asesores.user";
                    if (error.message == msjError) {
                        respuesta.write("Error: El Usuario ingresado ya existe" + "\n");    
                    }
                    else {
                        respuesta.write("Error en Registro"+ "\n");
                    }
                    respuesta.end();
                }
                else{
                    console.log("Registro Exitoso");
                    respuesta.write("Registro Exitoso" + "\n");
                    console.log("Insertado nuevo asesor " + usuario);
                    db.each("SELECT nombre,user FROM Asesores", 
                    function(err, row) {
                        if (err){
                            console.log(err);
                            throw err;
                        }
                        console.log("Usuario: " + row.user + 
                                    " Nombre: " + row.nombre);
                        respuesta.end();
                    });
                }
            });
        
        });
    } catch (err) {
        // manejamos error
        console.log(err);  
    }
}


// Procesa intento de registro cliente
function subirRegistroCliente(respuesta,data) {
    console.log("Manipulador de petición 'subir Registro Cliente' ha sido llamado.");
    var nombre = querystring.parse(data)["nombre"];
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var insertar = "INSERT INTO Clientes VALUES (?,?)";
    try {
        db.run(insertar,[null,nombre],
            function(error){
                if (error){
                    console.log(error);
                    console.log("Error en Registro");
                    var msjError = "SQLITE_CONSTRAINT: UNIQUE constraint failed: Clientes.user";
                    if (error.message == msjError) {
                        respuesta.write("Error: El Cliente ingresado ya existe" + "\n");    
                    }
                    else {
                        respuesta.write("Error en Registro"+ "\n");
                    }
                    respuesta.end();
                    db.close();
                }
                else{
                    console.log("Registro Exitoso");
                    respuesta.write("Registro Exitoso" + "\n");
                    console.log("Insertado nuevo cliente " + nombre);
                    db.each("SELECT nombre FROM Clientes", 
                    function(err, row) {
                        if (err){
                            console.log(err);
                            throw err;
                        }
                        console.log("Nombre Cliente: " + row.nombre);
                        respuesta.end();
                        db.close();
                    });
                }
            });
    } catch (err) {
        // manejamos error
        console.log(err);        
        db.close();
    }
}


// Procesa intento de Login
function subirLogin(respuesta,data) {
    console.log("Manipulador de petición 'subirLogin' ha sido llamado.");
    var usuario = querystring.parse(data)["user"];
    var clave = querystring.parse(data)["password"];
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
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
                respuesta.end();
                db.close();
            }
            else { // Si existe revisamos que su clave este correcta
                if (row.user == usuario) {
                // Comprobamos con la clave encriptada
                bcrypt.compare(clave, row.password, function(err, res) {
                if (res == true) {
                    console.log("Login Exitoso");
                    respuesta.write("Login Exitoso"+ "\n");
                    respuesta.end();
                    db.close();
                }
                else{
                    console.log("Error en Login");
                    respuesta.write("Error en Login"+ "\n"); 
                    respuesta.end();
                    db.close();
                }
                });
                }
                else{
                    console.log("Error en Login");
                    respuesta.write("Error en Login"+ "\n");   
                    respuesta.end();
                    db.close();
                }
            }
        });
    } catch (err) {
        // manejamos error
        console.log(err);        
        db.close();
    }
}


// Procesa intento de Reporte
function subirReporte(respuesta,data) {
    console.log("Manipulador de petición 'subirReporte' ha sido llamado.");
    var asesor = querystring.parse(data)["asesor"];
    var cliente = querystring.parse(data)["cliente"];
    var dia = parseInt(querystring.parse(data)["dia"],10);
    var mes = parseInt(querystring.parse(data)["mes"],10);
    var anio = parseInt(querystring.parse(data)["anio"],10);
    var clave = querystring.parse(data)["password"];
    var hora_inicio = "" + querystring.parse(data)["hora_inicio"]
    var h_ini = parseFloat(hora_inicio.replace(":","."),10);
    var hora_fin = "" + querystring.parse(data)["hora_fin"];
    var h_fin= parseFloat(hora_fin.replace(":","."),10);
    var hora_fact = "" + querystring.parse(data)["hora_fact"];
    var h_fact= parseFloat(hora_fact.replace(":","."),10);
    var descripcion = querystring.parse(data)["descripcion"];
    if (dia <= 0 || mes <= 0  || anio <= 0 || dia > 31 || mes > 12  || anio < 2016 ) { // Revisamos fecha negativa
        respuesta.write("Error: Fecha no es correcta");
        respuesta.end();    
        console.log("ERROR FECHA");
        console.log(dia+ "/"+ mes + "/" + anio);
    }
    else { // Si es valida seguimos
    if (h_ini < 0 || h_fin < 0  || h_ini >= 24 ||  h_fin >= 24) { // Revisamos fecha negativa
        respuesta.write("Error: Hora incorrecta, deben estar formato 24 horas (13:51)");
        respuesta.end();    
    }
    else {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
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
                        var insertar = "INSERT INTO Reportes VALUES (?,?,?,?,?,?,?,?,?,?)";
                        db.run(insertar,[null,asesor,cliente,dia,mes,anio,h_ini,h_fin,descripcion,h_fact],
                            function(error){
                                if (error){
                                    console.log(error);
                                    console.log("Error registro transferencia");
                                    respuesta.write("Error: Problemas con el reporte"+ "\n");
                                    respuesta.end();
                                }
                                else {
                                    // Vemos _id de reporte
                                    db.get("SELECT _id  FROM Reportes WHERE asesor = ? " +
                                    "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?",
                                    [asesor,cliente,dia,mes,anio], 
                                    function(error, row) { // Vemos si existe reporte
                                    if (error || row == undefined){ // Si no existe damos error
                                        console.log(error);
                                        console.log("Error reporte no creado");
                                        respuesta.write("Error: Reporte no creado"+ "\n");
                                        respuesta.end();
                                    }
                                    else {
                                    // Si es exitoso editamos reporte
                                    console.log("Reporte Exitoso");
                                    console.log("ID DEL REPORTE|" + row._id);
                                    respuesta.write("Reporte Exitoso\n");
                                    respuesta.write("ID DEL REPORTE|" + row._id);
                                    respuesta.end();
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
}




// Procesa intento de Lista Usuarios
function listaUsuarios(respuesta,data) {
    console.log("Manipulador de petición 'listaUsuarios' ha sido llamado.");
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var lista = "";
    try {
        db.each("SELECT nombre,user FROM Asesores", 
                    function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo usuarios"+"\n");
                            throw err;
                        }
                        else { 
                            lista = lista + row.user + "|" + row.nombre +"\n";
                            }
                    },function(err, num){
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo usuarios"+"\n");                            
                            respuesta.end();
                            throw err;
                        }              
                        console.log("Cantidad de Usuarios"+ num);
                        console.log(lista);
                        respuesta.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                        respuesta.write("Cantidad de Usuarios|"+ num.toString() 
                        +"\n");
                        respuesta.write(lista);            
                        respuesta.end();
                    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}


// Procesa intento de Lista Clientes
function listaClientes(respuesta,data) {
    console.log("Manipulador de petición 'listaClientes' ha sido llamado.");
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var lista = "";
    try {
        db.each("SELECT nombre FROM Clientes", 
                    function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo clientes"+"\n");
                            throw err;
                        }
                        else { 
                            lista = lista + row.nombre +"\n";
                            }
                    },function(err, num){
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo clientes"+"\n");                            
                            respuesta.end();
                            throw err;
                        }              
                        console.log("Cantidad de Clientes "+ num);
                        console.log(lista);
                        respuesta.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                        respuesta.write("Cantidad de Clientes|"+ num.toString() 
                        +"\n");
                        respuesta.write(lista);            
                        respuesta.end();
                    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}







function logo(respuesta) {
     var img = fs.readFileSync('./logo1.png');
     respuesta.writeHead(200, {'Content-Type': 'image/png' });
     respuesta.end(img, 'binary');
}

function favicon(respuesta) {
     var img = fs.readFileSync('./favicon.png');
     respuesta.writeHead(200, {'Content-Type': 'image/png' });
     respuesta.end(img, 'binary');
}

// Desplega Formulario Reportes Asesor
function reportesAsesor(respuesta,data) {
    console.log("Manipulador de petición 'reportes Asesor' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>REPORTES</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
       '<img src="/logo.png" alt="Logo" style="width:218px;height:125px;">'+
                "<body>"+
                    '<form action="/subirReportesAsesor" method="post">'+
    '<input type="TEXT" name="asesor" placeholder="Nombre de Usuario" size="40">'+
                                        '<input type="submit" value="ENVIAR" />'+
                                "</body>"+
                            "</html>"+
                        "</body>"+
                    '</html>';
    respuesta.writeHead(200, {"Content-Type": "text/html"});
    respuesta.write(body);
    respuesta.end(); 
}


// Procesa intento Reportes Asesor
function subirReportesAsesor(respuesta,data) {
    console.log("Manipulador de petición 'reportesAsesor' ha sido llamado.");
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var lista = "";
    var asesor = querystring.parse(data)["asesor"];
    try {
        db.each("SELECT * FROM Reportes WHERE asesor =? ORDER BY anio, mes, dia",[asesor],
                    function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");
                            throw err;
                        }
                        else {
                        if (row.h_fact != null && row.h_fact != undefined) {
                          lista = lista + row._id + "|" +
                                    row.cliente + "|" +
                                    row.dia  + "|" +
                                    row.mes + "|" +
                                    row.anio  + "|" +
                                    row.hora_inicio  + "|" +
                                    row.hora_fin  + "|" +
                                    row.descripcion + "|" + 
                                    + row.h_fact + "|"  +
                                    "\n";
                            }
                            else {
                          lista = lista + row._id + "|" +
                                    row.cliente + "|" +
                                    row.dia  + "|" +
                                    row.mes + "|" +
                                    row.anio  + "|" +
                                    row.hora_inicio  + "|" +
                                    row.hora_fin  + "|" +
                                    row.descripcion + "|" + 
                                    "0.0" + "|" +
                                    "\n";
                            }
                            }
                    },function(err, num){
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");                            
                            respuesta.end();
                            throw err;
                        }              
                        console.log("Cantidad de Reportes "+ num);
                        console.log(lista);
                        respuesta.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                        respuesta.write("Cantidad de Reportes|"+ num.toString() 
                        +"\n");
                        respuesta.write(lista);            
                        respuesta.end();
                    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}

// Desplega Formulario Actividades Asesor
function actividadesAsesor(respuesta,data) {
    console.log("Manipulador de petición 'actividades Asesor' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>REPORTES</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
       '<img src="/logo.png" alt="Logo" style="width:218px;height:125px;">'+
                "<body>"+
                    '<form action="/subirActividadesAsesor" method="post">'+
    '<input type="TEXT" name="asesor" placeholder="Nombre de Usuario" size="40">'+
                                        '<input type="submit" value="ENVIAR" />'+
                                "</body>"+
                            "</html>"+
                        "</body>"+
                    '</html>';
    respuesta.writeHead(200, {"Content-Type": "text/html"});
    respuesta.write(body);
    respuesta.end(); 
}

// Procesa intento ver Actividad
function subirActividadesAsesor(respuesta,data) {
    console.log("Manipulador de petición 'subir Actividad Asesor' ha sido llamado.");
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var lista = "";
    var asesor = querystring.parse(data)["asesor"];
    lista = lista + "Asesor: " + asesor + "\n";
    try {
        db.each("SELECT * FROM Actividades WHERE asesor = ? ",
                        [asesor],
                    function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo actividades"+"\n");
                            throw err;
                        }
                        else { 
                            lista = lista + row._id + "|" +
                                    row.cliente + "|" +
                                    row.dia  + "|" +
                                    row.mes + "|" +
                                    row.anio  + "|" +
                                    row.descripcion + "|" +
                                    "\n";
                            }
                    },function(err, num){
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo actividades"+"\n");                            
                            respuesta.end();
                            throw err;
                        }              
                        console.log("Cantidad de actividades "+ num);
                        console.log(lista);
                        respuesta.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                        respuesta.write("Cantidad de actividades|"+ num.toString() 
                        +"\n");
                        respuesta.write(lista);            
                        respuesta.end();
                    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}









// Desplega Formulario Reportes Cliente
function reportesCliente(respuesta,data) {
    console.log("Manipulador de petición 'reportes Cliente' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>REPORTES</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
       '<img src="/logo.png" alt="Logo" style="width:218px;height:125px;">'+
                "<body>"+
                    '<form action="/subirReportesCliente" method="post">'+
    '<input type="TEXT" name="cliente" placeholder="Nombre Cliente" size="40">'+
                                        '<input type="submit" value="ENVIAR" />'+
                                "</body>"+
                            "</html>"+
                        "</body>"+
                    '</html>';
    respuesta.writeHead(200, {"Content-Type": "text/html"});
    respuesta.write(body);
    respuesta.end(); 
}


// Procesa intento Reportes Cliente
function subirReportesCliente(respuesta,data) {
    console.log("Manipulador de petición 'reportesCliente' ha sido llamado.");
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var lista = "";
    var cliente = querystring.parse(data)["cliente"];
    try {
        db.each("SELECT * FROM Reportes WHERE cliente =? ORDER BY anio, mes, dia",[cliente],
                    function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");
                            throw err;
                        }
                        else {
                        if (row.h_fact != null && row.h_fact != undefined) {
                          lista = lista + row._id + "|" +
                                    row.asesor + "|" + 
                                    row.dia  + "|" +
                                    row.mes + "|" +
                                    row.anio  + "|" +
                                    row.hora_inicio  + "|" +
                                    row.hora_fin  + "|" +
                                    row.descripcion + "|" + 
                                    + row.h_fact + "|" + 
                                    "\n";
                            }
                            else {
                          lista = lista + row._id + "|" +
                                    row.asesor + "|" + 
                                    row.dia  + "|" +
                                    row.mes + "|" +
                                    row.anio  + "|" +
                                    row.hora_inicio  + "|" +
                                    row.hora_fin  + "|" +
                                    row.descripcion + "|" + 
                                    "0.0" + "|" +
                                    "\n";
                            }
                        }
                    },function(err, num){
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");                            
                            respuesta.end();
                            throw err;
                        }              
                        console.log("Cantidad de Reportes "+ num);
                        console.log(lista);
                        respuesta.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                        respuesta.write("Cantidad de Reportes|"+ num.toString() 
                        +"\n");
                        respuesta.write(lista);            
                        respuesta.end();
                    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}



// Procesa intento Reportes
function subirReportes(respuesta,data) {
    console.log("Manipulador de petición 'reportes' ha sido llamado.");
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var lista = "";
    try {
        db.each("SELECT * FROM Reportes ORDER BY anio, mes, dia",
                    function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");
                            throw err;
                        }
                        else {
                            if (row.h_fact != null && row.h_fact != undefined) {
                                lista = lista + + row._id + "|" +
                                    row.asesor + "|" +
                                    row.cliente + "|" +
                                    row.dia  + "|" +
                                    row.mes + "|" +
                                    row.anio  + "|" +
                                    row.hora_inicio  + "|" +
                                    row.hora_fin  + "|" +
                                    row.descripcion + "|" + 
                                    + row.h_fact + "|" + 
                                    "\n";
                            }
                            else {
                                lista = lista + + row._id + "|" +
                                    row.asesor + "|" +
                                    row.cliente + "|" +
                                    row.dia  + "|" +
                                    row.mes + "|" +
                                    row.anio  + "|" +
                                    row.hora_inicio  + "|" +
                                    row.hora_fin  + "|" +
                                    row.descripcion + "|" + 
                                    "0.0" + "|" + 
                                    "\n";
                            }
                            
                            }
                    },function(err, num){
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");                            
                            respuesta.end();
                            throw err;
                        }              
                        console.log("Cantidad de Reportes "+ num);
                        console.log(lista);
                        respuesta.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                        respuesta.write("Cantidad de Reportes|"+ num.toString() 
                        +"\n");
                        respuesta.write(lista);            
                        respuesta.end();
                    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}

// Desplega formulario de editarReporte
function editarReporte(respuesta,data) {
    console.log("Manipulador de petición 'reporte' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>EDITAR REPORTE</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
                "<body>"+
                    '<form action="/subirEditarReporte" method="post">'+
    '<input type="TEXT" name="asesor" placeholder="Asesor" size="40">'+
                            "<br>"+
    '<input type="TEXT" name="cliente" placeholder="Cliente" size="40">'+
                            "<br>"+ 
    '<input type="TEXT" name="dia" placeholder="Dia" maxlength="2">'+
                                    "<br>"+
    '<input type="TEXT" name="mes" placeholder="Mes" maxlength="2">'+
                                    "<br>"+
    '<input type="TEXT" name="anio" placeholder="Año" maxlength="4">'+
                                    "<br>"+
    '<input type="password" placeholder="Clave" name="password" size="40">'+
                                    "<br>"+
    '<input type="TEXT" name="hora_inicio" placeholder="Hora Inicio Nueva" maxlength="5">'+
                                    "<br>"+
    '<input type="TEXT" name="hora_fin" placeholder="Hora Fin Nueva" maxlength="5">'+
                                    "<br>"+
    '<textarea name=descripcion rows="4" cols="40" placeholder="Descripcion Nueva"></textarea>'+
                                    "<br>"+
    '<input type="TEXT" name="diaN" placeholder="Dia Nuevo" maxlength="2">'+
                                    "<br>"+
    '<input type="TEXT" name="mesN" placeholder="Mes Nuevo" maxlength="2">'+
                                    "<br>"+
    '<input type="TEXT" name="anioN" placeholder="Año Nuevo" maxlength="4">'+
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

// Procesa intento de Editar Reporte
function subirEditarReporte(respuesta,data) {
    console.log("Manipulador de petición 'subirEditarReporte' ha sido llamado.");
    var asesor = querystring.parse(data)["asesor"];
    var cliente = querystring.parse(data)["cliente"];
    var dia = parseInt(querystring.parse(data)["dia"],10);
    var mes = parseInt(querystring.parse(data)["mes"],10);
    var anio = parseInt(querystring.parse(data)["anio"],10);
    var diaN = parseInt(querystring.parse(data)["diaN"],10);
    var mesN = parseInt(querystring.parse(data)["mesN"],10);
    var anioN = parseInt(querystring.parse(data)["anioN"],10);
    var clave = querystring.parse(data)["password"];
    var hora_inicio = "" + querystring.parse(data)["hora_inicio"];
    var h_ini = parseFloat(hora_inicio.replace(":","."),10);
    var hora_fin = "" + querystring.parse(data)["hora_fin"];
    var h_fin= parseFloat(hora_fin.replace(":","."),10);
    var hora_fact = "" + querystring.parse(data)["hora_fact"];
    var h_fact= parseFloat(hora_fact.replace(":","."),10);var descripcion = querystring.parse(data)["descripcion"];
    if (dia <= 0 || mes <= 0  || anio <= 0 || dia > 31 || mes > 12  || anio < 2016 ||
        diaN <= 0 || mesN <= 0  || anioN <= 0 || diaN > 31 || mesN > 12  || anioN < 2016 ) { // Revisamos fecha negativa
        respuesta.write("Error: Fecha no es correcta");
        respuesta.end();    
    }
    else { // Si es valida seguimos
    if (h_ini < 0 || h_fin < 0  || h_ini >= 24 ||  h_fin >= 24) { // Revisamos fecha negativa
        respuesta.write("Error: Hora incorrecta, deben estar formato 24 horas (13:51)");
        respuesta.end();    
    }
    else {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
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
                        // Si es exitoso editamos reporte
                        var actualizar = "UPDATE Reportes SET dia = ?,mes = ?,anio = ?,"+
                        "hora_inicio = ?,hora_fin = ?,descripcion = ?, h_fact = ? WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?";
                        db.run(actualizar,[diaN,mesN,anioN,h_ini,h_fin,descripcion,h_fact,asesor,cliente,dia,mes,anio],
                            function(error){
                                if (error){
                                    console.log(error);
                                    console.log("Error actualizando reporte");
                                    respuesta.write("Error: Problemas con el reporte"+ "\n");
                                    respuesta.end();
                                }
                                else {
                                    console.log("Reporte Actualizado");
                                    respuesta.write("Reporte Actualizado\n");
                                    respuesta.end();
                                }});
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
}


// Desplega formulario de eliminarReporte
function eliminarReporte(respuesta,data) {
    console.log("Manipulador de petición 'eliminar reporte' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>ELIMINAR REPORTE</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
                "<body>"+
                    '<form action="/subirEliminarReporte" method="post">'+
    '<input type="TEXT" name="asesor" placeholder="Asesor" size="40">'+
                            "<br>"+
    '<input type="TEXT" name="cliente" placeholder="Cliente" size="40">'+
                            "<br>"+ 
    '<input type="TEXT" name="dia" placeholder="Dia" size="2">'+
                                    "<br>"+
    '<input type="TEXT" name="mes" placeholder="Mes" size="2">'+
                                    "<br>"+
    '<input type="TEXT" name="anio" placeholder="Año" size="4">'+
                                    "<br>"+
    '<input type="password" placeholder="Clave" name="password" size="40">'+
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


// Desplega formulario de verActividad
function verActividad(respuesta,data) {
    console.log("Manipulador de petición 'verActividad' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>VER ACTIVIDADES</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
                "<body>"+
                    '<form action="/subirVerActividad" method="post">'+
    '<input type="TEXT" name="asesor" placeholder="Asesor" size="40">'+
                            "<br>"+
    '<input type="TEXT" name="cliente" placeholder="Cliente" size="40">'+
                            "<br>"+ 
    '<input type="TEXT" name="dia" placeholder="Dia" maxlength="2">'+
                                    "<br>"+
    '<input type="TEXT" name="mes" placeholder="Mes" maxlength="2">'+
                                    "<br>"+
    '<input type="TEXT" name="anio" placeholder="Año" maxlength="4">'+
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


// Procesa intento ver Actividad
function subirVerActividad(respuesta,data) {
    console.log("Manipulador de petición 'subirVerActividad' ha sido llamado.");
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var lista = "";
    var asesor = querystring.parse(data)["asesor"];
    var cliente = querystring.parse(data)["cliente"];
    var dia = parseInt(querystring.parse(data)["dia"],10);
    var mes = parseInt(querystring.parse(data)["mes"],10);
    var anio = parseInt(querystring.parse(data)["anio"],10);
    lista = lista + "Asesor: " + asesor +
                    " Cliente: "+ cliente + 
                    " Fecha: "+ dia + "/" + mes + "/" + anio + "\n";
    try {
        db.each("SELECT * FROM Actividades WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ?",
                        [asesor,cliente,dia,mes,anio],
                    function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo actividades"+"\n");
                            throw err;
                        }
                        else { 
                            lista = lista + row._id + "|" +
                                    row.descripcion + "|" +
                                    "\n";
                            }
                    },function(err, num){
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");                            
                            respuesta.end();
                            throw err;
                        }              
                        console.log("Cantidad de Reportes "+ num);
                        console.log(lista);
                        respuesta.write("Cantidad de Reportes|"+ num.toString() 
                        +"\n");
                        respuesta.write(lista);            
                        respuesta.end();
                    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}

// Desplega formulario de actividad
function actividad(respuesta,data) {
    console.log("Manipulador de petición 'actividad' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>CREAR ACTIVIDAD</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
                "<body>"+
                    '<form action="/subirActividad" method="post">'+
    '<input type="TEXT" name="asesor" placeholder="Asesor" size="40">'+
                            "<br>"+
    '<input type="TEXT" name="cliente" placeholder="Cliente" size="40">'+
                            "<br>"+ 
    '<input type="TEXT" name="dia" placeholder="Dia" maxlength="2">'+
                                    "<br>"+
    '<input type="TEXT" name="mes" placeholder="Mes" maxlength="2">'+
                                    "<br>"+
    '<input type="TEXT" name="anio" placeholder="Año" maxlength="4">'+
                                    "<br>"+
    '<input type="password" placeholder="Clave" name="password" size="40">'+
                                    "<br>"+
    '<textarea name=descripcion rows="4" cols="40" placeholder="Descripcion"></textarea>'+
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


// Procesa intento subir Actividad
function subirActividad(respuesta,data) {
    console.log("Manipulador de petición 'subirActividad' ha sido llamado.");
    // Respuesta Web
    // respuesta.writeHead(200, {"Content-Type": "text/html"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var asesor = querystring.parse(data)["asesor"];
    var cliente = querystring.parse(data)["cliente"];
    var dia = parseInt(querystring.parse(data)["dia"],10);
    var mes = parseInt(querystring.parse(data)["mes"],10);
    var anio = parseInt(querystring.parse(data)["anio"],10);
    var descripcion = querystring.parse(data)["descripcion"];
    var clave = querystring.parse(data)["password"];
    if (dia <= 0 || mes <= 0  || anio <= 0 || dia > 31 || mes > 12  || anio < 2016 ) { // Revisamos fecha negativa
        respuesta.write("Error: Fecha no es correcta");
        respuesta.end();    
    }
    else {
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
                        var insertar = "INSERT INTO Actividades VALUES (?,?,?,?,?,?,?)";
                        db.run(insertar,[null,asesor,cliente,dia,mes,anio,descripcion],
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

// Desplega formulario de eliminarActividad
function eliminarActividad(respuesta,data) {
    console.log("Manipulador de petición 'eliminar actividad' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>ELIMINAR ACTIVIDAD</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
                "<body>"+
                    '<form action="/subirEliminarActividad" method="post">'+
    '<input type="TEXT" name="asesor" placeholder="Asesor" size="40">'+
                                    "<br>"+
    '<input type="password" placeholder="Clave" name="password" size="40">'+
                                    "<br>"+
    '<input type="TEXT" placeholder="ID ACTIVIDAD" name="id" size="4">'+
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



// Procesa intento de Eliminar Actividad
function subirEliminarActividad(respuesta,data) {
    console.log("Manipulador de petición 'subirEliminarActividad' ha sido llamado.");
    var asesor = querystring.parse(data)["asesor"];
    var id = parseInt(querystring.parse(data)["id"],10);
    var clave = querystring.parse(data)["password"];
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
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
                        // Vemos si actividad existe
                        db.get("SELECT asesor FROM Actividades WHERE _id = ?",
                        [id], 
                        function(error, row) { // Vemos si existe reporte
                        if (error || row == undefined ||
                           row.asesor != asesor){ // Si no existe damos error
                            console.log(error);
                            console.log("Error reporte no existe o asesor incorrecto");
                            respuesta.write("Error: Reporte no existe o asesor incorrecto"+ "\n");
                            respuesta.end();
                        }
                        else {
                        // Si es exitoso eliminamos actividad
                        var eliminar = "DELETE FROM Actividades WHERE _id = ?";
                        db.run(eliminar,[id],
                            function(error){
                                if (error){
                                    console.log(error);
                                    console.log("Error eliminando actividad");
                                    respuesta.write("Error: eliminando actividad"+ "\n");
                                    respuesta.end();
                                }
                                else {
                                    console.log("Actividad Eliminada");
                                    respuesta.write("Actividad Eliminada\n");
                                    respuesta.end();
                                }});
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

// Da la base de datos como descarga
function verBaseDatos(respuesta,data) {
    console.log("Manipulador de petición 'baseDatos' ha sido llamado.");
    try {
    fs.readFile("controles.db", function(err, text){
        if (err) {
            respuesta.end("ERROR SOLICITUD")
            throw err;
        }
        else {
            respuesta.end(text);    
        }
    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}

// eliminar base de datos
function subirEliminarBaseDatos(respuesta,data) {
    'use strict';
    console.log("Manipulador de petición 'eliminarBaseDatos' ha sido llamado.");
    var clave = querystring.parse(data)["password"];
    var mes = parseInt(querystring.parse(data)["mes"],10);
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    if (clave == "ag1603" || mes == undefined || mes > 12 || mes < 1) {
        
    var msj = "ACTUALIZAR HISTORICO MES " + mes + "\n";
    
    console.log(msj);
    var email   = require("emailjs");
    var server 	= email.server.connect({
            user:	"mispeliculasnode@yahoo.com", 
            password:"comisario123", 
            host:	"smtp.mail.yahoo.com", 
            port: 465,
            ssl:		true
    });
 
    var message	= {
            text:	msj, 
            from:	"Web Mis Peliculas <mispeliculasnode@yahoo.com>", 
            to:		"Andres <usbandroidex@gmail.com>",
            subject:	"[Reportes HLS]",
            attachment: 
            [
                {path:"controles.db", type:"application/x-sqlite3", name:"historico.db"}
            ]
    };
 
    // send the message and get a callback with an error or details of the message that was sent 
    server.send(message, function(err, message) {
        console.log(err || message);
        if (err) {
            var msjE = "Error: No se pudo respaldar base de datos: " + err;
            respuesta.write(msjE);
            respuesta.end();
        }
        else {
            db.serialize(function() {
                db.run("DELETE FROM Actividades WHERE mes = ?", [mes]);
                db.run("DELETE FROM Reportes WHERE mes = ?", [mes]);
                var msjE = "Base de datos borrada exitosamente, Mes: " + mes;
                console.log(msjE);
                respuesta.write(msjE);
                respuesta.end();
            });
        }
    }); 
    }
    else {
        var msjE = "Error: Clave incorrecta o mes no valido, Mes: " + mes;
        respuesta.write(msjE);
        respuesta.end();
    }
}



// eliminar base de datos
function eliminarBaseDatos(respuesta,data) {
    console.log("Manipulador de petición 'eliminar Base Datos' ha sido llamado.");
    var body =  "<head>"+
        '<meta charset="UTF-8">'+
            "<title>ELIMINAR BASE DE DATOS</title>"+
        "</head>"+
        "<body>"+
            "<html>"+
                "<head>"+
                    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
                "</head>"+
                "<body>"+
                    '<form action="/subirEliminarBaseDatos" method="post">'+
    '<input type="password" placeholder="Clave" name="password" size="40">'+
                                    "<br>"+
                                    " <select class='form-control input-lg' id='sel1' name='mes'>" +
                       " <option disabled selected value> Seleccione Mes </option> " +
                        "<option>1</option> "+
                        "<option>2</option> "+
                        "<option>3</option> "+
                        "<option>4</option> "+
                        "<option>5</option> "+
                        "<option>6</option> "+
                        "<option>7</option> "+
                        "<option>8</option> "+
                        "<option>9</option> "+
                        "<option>10</option> "+
                        "<option>11</option> "+
                        "<option>12</option> "+
                        "</select>"+
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



////////////////////////
// ACTUALIZAR SERVIDOR
////////////////////////




// Desplega formulario de actualizar
function pruebaActualizarEliminar(respuesta,data) {
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
                    '<form action="/actualizarServidorEliminar" method="post">'+
    '<input type="TEXT" name="user" placeholder="Asesor" size="40">'+
                                    "<br>"+
    '<input type="password" placeholder="Clave" name="password" size="40">'+
                                    "<br>"+
    '<input type="TEXT" placeholder="Cantidad eliminar" name="c_elim" size="40">'+
                                    "<br>"+
    '<textarea name="lista_elim" rows="10" cols="40" placeholder="Lista Eliminar"></textarea>'+
                                    "<br>"+
    '<input type="TEXT" placeholder="Cantidad Actividades eliminar" name="c_elim_act" size="40">'+
                                    "<br>"+
    '<textarea name="lista_elim_act" rows="10" cols="40" placeholder="Actividades"></textarea>'+
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





// Funcion elimina reportes del servidor
// Entrada debe ser
// user passsword c_elim lista_elim c_elim_act lista_elim_act
// lista_elim:      asesor-cliente-dia-mes-anio-
// lista_elim_act   asesor-cliente-dia-mes-anio-desc-
//
function actualizarServidorEliminar(respuesta,data) {
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
                console.log("Error usuario no existe");
                respuesta.end("Error usuario no existe"+ "\n");
                db.close();
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
                        var d_elim = datos_elim[contador].split("|");
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
                            respuesta.end("Error: Problemas en eliminar"+ "\n");
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
                        var d_elim_act = datos_elim_act[contador_act].split("|");
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
                            respuesta.end("Error: Problemas en eliminar actividades"+ "\n");
                            db.close();
                        }
                        else{
                            console.log("Exito operacion eliminar ");   
                            respuesta.end("Exito actualizar servidor"+ "\n");
                            db.close();  
                        }
                    
                    }); // Termino async eliminar actividades  
                        }
                    }
            ); // Termino async eliminar
        
                    
                } // Caso Fallo Login
                else{
                    respuesta.end("Error en Login"+ "\n"); 
                    console.log("Error en Login");
                    db.close();
                }
                });
            }
            // No existe usuario
            else{
                respuesta.end("Error en Login"+ "\n"); 
                console.log("Error en Login"); 
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





// Funcion inserta reportes al servidor
// Entrada debe ser
// user passsword c_insert lista_insert c_insert_act lista_insert_act
// lista_insert:      asesor-cliente-dia-mes-anio-h_ini-h_fin-h_fact-desc-
// lista_insert_act   asesor-cliente-dia-mes-anio-desc-
//
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
                respuesta.end("Error usuario no existe"+ "\n");
                db.close();
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
                        var d_insert = datos_insert[contador].split("|");
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
                        if (err){ // Si hubo error terminamos
                            console.log(err);
                            console.log("Error: Problemas en insertar");
                            respuesta.end("Error: Problemas en insertar"+ "\n");
                            db.close();
                        }
                        else{ // Si no hubo error buscamos actividades
                            console.log("Exito operacion insertarReporte");
                            // Insertamos actividades
                            //Buscamos actividades a insertar
                    var lista_insert_act = querystring.parse(data)["lista_insert_act"];
                    var c_insert_act =  parseInt(querystring.parse(data)["c_insert_act"],10);
                    var datos_insert_act = lista_insert_act.split("\n");
                    var contador_act = 0;
                    var l_insert_act = [];
                    while (c_insert_act > contador_act) { // Dividimos datos y guardamos
                        var d_insert_act = datos_insert_act[contador_act].split("|");
                        var asesor_insert_act = d_insert_act[0];
                        var cliente_insert_act = d_insert_act[1];
                        var dia_insert_act = parseInt(d_insert_act[2],10);
                        var mes_insert_act = parseInt(d_insert_act[3],10);
                        var anio_insert_act = parseInt(d_insert_act[4],10);
                        var desc_insert_act = d_insert_act[5];
                        var reporte_insert_act = [asesor_insert_act,cliente_insert_act,
                                                dia_insert_act,mes_insert_act,
                                                anio_insert_act,desc_insert_act];
                        l_insert_act.push(reporte_insert_act);
                        contador_act = contador_act + 1;
                    }
                    console.log("ESTE ES ARREGLO DE ACTIVIDADES A INSERTAR");
                    console.log(l_insert_act);
                    
                     async.eachSeries(l_insert_act,
                        // Funcion donde cada elemento de l_insert es pasado
                     function(r, callback){
                         
                         
                         
                        
                         
                         
                         
                         
                         
                        // Vemos si actividad existe
                        db.get("SELECT asesor  FROM Actividades WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ? " +
                        "AND descripcion = ?",
                        [   r[0],r[1],r[2],
                            r[3],r[4],r[5]
                        ], 
                        function(error, row) { // Vemos si existe reporte
                        if (error || row == undefined){ // Si no existe lo insertamos
                        // Insertamos nuevo reporte
                        var insertar = "INSERT INTO Actividades VALUES (?,?,?,?,?,?,?)";
                        db.run(insertar,
                        [
                            null,r[0],r[1],r[2],
                            r[3],r[4],r[5]
                        ],
                            function(error){
                                if (error){
                                    console.log(error);
                                    console.log("Error registro actividad");
                                    callback("Error: Problemas registro actividad"+ "\n");
                                }
                                else {
                                    // Si es exitoso creamos actividad
                                    console.log("Actividad insertada");
                                    callback();
                                }
                            });
                        }
                        else {
                            // Si ya existe no hacemos nada
                            callback()
                        }
                        }); // Termino Insertar
                    },
                    // Cuando terminaron todos los eliminar actividades
                    function(err){
                        if (err){
                            console.log(err);
                            respuesta.end("Error: Problemas en actividades"+ "\n");
                            db.close();
                        }
                        else{
                            console.log("Exito operacion insertar");   
                            respuesta.end("Exito actualizar servidor"+ "\n");
                            db.close();  
                        }
                    
                    }); // Termino async actividades  
                        }
                    }
            ); // Termino async insertar
        
                    
                } // Caso Fallo Login
                else{
                    respuesta.end("Error en Login"+ "\n"); 
                    console.log("Error en Login");
                    db.close();
                }
                });
            }
            // No existe usuario
            else{
                respuesta.end("Error en Login"+ "\n"); 
                console.log("Error en Login");
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



// Resumen Reportes
function resumenReportes(respuesta,data) {
    console.log("Manipulador de petición 'resumenReportes' ha sido llamado.");
    respuesta.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=resumenReportes.txt'});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var lista = [];
    try {
        var select = "SELECT Clientes._id, Clientes.nombre, Reportes.asesor," +
                     "Reportes.descripcion, Reportes.dia, Reportes.mes, "+ 
                     "Reportes.anio, Reportes.hora_inicio," +
                     "Reportes.hora_fin, Reportes.h_fact " +
                     " From Clientes JOIN Reportes ON Clientes.nombre = Reportes.cliente "+
                     " ORDER BY Clientes._id,anio,mes,dia";
        db.each(select, 
                    function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");
                            throw err;
                        }
                        else {
                        var reporte = [row._id, row.nombre, row.asesor,
                                             row.descripcion,
                                             row.dia, row.mes, row.anio, 
                                             row.hora_inicio, row.hora_fin, row.h_fact];
                        lista.push(reporte);
                        }
                    },
                    function(err, num){ // Termine Todos los reportes
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");                            
                            respuesta.end();
                            throw err;
                        }
                    var texto = "";   
                    async.eachSeries(lista,
                        // Funcion donde cada elemento de lista es pasado
                     function(r, callback){
                         var lista_act = "";
                        // Vemos si actividad existe
                        db.each("SELECT descripcion  FROM Actividades WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ? ",
                        [   r[2],r[1],r[4],
                            r[5],r[6]
                        ], 
                        function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");
                            throw err;
                        }
                        else {
                        lista_act = lista_act + row.descripcion + "\n";
                        }
                        },
                    function(err, num){ // Termine Todos las actividades
                        if (err){
                            console.log(err);
                            console.log("Error obteniendo actividades"+"\n");
                            callback();
                            throw err;
                        }
                        else {
                        texto = texto + r[0] + "|" +
                            r[1] + "|" +
                            r[2] + "|" +
                            r[3] + "|" +
                            r[4] + "|" +
                            r[5] + "|" +
                            r[6] + "|" +
                            r[7] + "|" +
                            r[8] + "|" +
                            r[9] + "|" + "\n" + lista_act;
                        callback();
                        }
                        }
                        ); 
                    },
                    // Cuando terminaron todos los eliminar actividades
                    function(err){
                        if (err){
                            console.log(err);
                            respuesta.end("Error: Problemas en actividades"+ "\n");
                            db.close();
                        }
                        else{
                            console.log("Exito operacion");   
                            respuesta.end(texto);
                            db.close();  
                        }
                    }); // Termino async actividades  
                    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}


// Resumen Reportes Asesor
function resumenReportesAsesor(respuesta,data) {
    console.log("Manipulador de petición 'resumenReportesAsesor' ha sido llamado.");
    var usuario = querystring.parse(data)["user"];
    respuesta.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var lista = [];
    try {
        var select = "SELECT Clientes._id, Clientes.nombre, Reportes.asesor," +
                     "Reportes.descripcion, Reportes.dia, Reportes.mes, "+ 
                     "Reportes.anio, Reportes.hora_inicio," +
                     "Reportes.hora_fin, Reportes.h_fact " +
                     " From Clientes JOIN Reportes ON Clientes.nombre = Reportes.cliente "+
                     " WHERE Reportes.asesor = '" + usuario  +"' "
                     " ORDER BY Clientes._id,anio,mes,dia";
        var contadorReportes = 0;
        db.each(select, 
                    function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");
                            throw err;
                        }
                        else {
                        var reporte = [row._id, row.nombre, row.asesor,
                                             row.descripcion,
                                             row.dia, row.mes, row.anio, 
                                             row.hora_inicio, row.hora_fin, row.h_fact];
                        lista.push(reporte);
                        contadorReportes = contadorReportes + 1;
                        }
                    },
                    function(err, num){ // Termine Todos los reportes
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");                            
                            respuesta.end();
                            throw err;
                        }
                    var texto = "";   
                    async.eachSeries(lista,
                        // Funcion donde cada elemento de lista es pasado
                     function(r, callback){
                         var lista_act = "";
                        // Vemos si actividad existe
                        db.each("SELECT descripcion  FROM Actividades WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ? ",
                        [   r[2],r[1],r[4],
                            r[5],r[6]
                        ], 
                        function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");
                            throw err;
                        }
                        else {
                        lista_act = lista_act + row.descripcion + "\n";
                        }
                        },
                    function(err, num){ // Termine Todos las actividades
                        if (err){
                            console.log(err);
                            console.log("Error obteniendo actividades"+"\n");
                            callback();
                            throw err;
                        }
                        else {
                        texto = texto + "|" +  r[0] + "|" +
                            r[1] + "|" +
                            r[2] + "|" +
                            r[3] + "|" +
                            r[4] + "|" +
                            r[5] + "|" +
                            r[6] + "|" +
                            r[7] + "|" +
                            r[8] + "|" +
                            r[9] + "|" + "\n" + lista_act;
                        callback();
                        }
                        }
                        ); 
                    },
                    // Cuando terminaron todos los eliminar actividades
                    function(err){
                        if (err){
                            console.log(err);
                            respuesta.end("Error: Problemas en actividades"+ "\n");
                            db.close();
                        }
                        else{
                            console.log("Exito operacion");  
                            respuesta.write("Cantidad de Reportes|" + contadorReportes + "\n");
                            respuesta.end(texto);
                            db.close();  
                        }
                    }); // Termino async actividades  
                    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}



// Resumen Reportes Cliente
function resumenReportesCliente(respuesta,data) {
    console.log("Manipulador de petición 'resumenReportesCliente' ha sido llamado.");
    var cliente = querystring.parse(data)["cliente"];
    respuesta.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(file);
    var lista = [];
    try {
        var select = "SELECT Clientes._id, Clientes.nombre, Reportes.asesor," +
                     "Reportes.descripcion, Reportes.dia, Reportes.mes, "+ 
                     "Reportes.anio, Reportes.hora_inicio," +
                     "Reportes.hora_fin, Reportes.h_fact " +
                     " From Clientes JOIN Reportes ON Clientes.nombre = Reportes.cliente "+
                     " WHERE Reportes.cliente = '" + cliente  +"' "
                     " ORDER BY Clientes._id,anio,mes,dia";
        var contadorReportes = 0;
        db.each(select, 
                    function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");
                            throw err;
                        }
                        else {
                        var reporte = [row._id, row.nombre, row.asesor,
                                             row.descripcion,
                                             row.dia, row.mes, row.anio, 
                                             row.hora_inicio, row.hora_fin, row.h_fact];
                        lista.push(reporte);
                        contadorReportes = contadorReportes + 1;
                        }
                    },
                    function(err, num){ // Termine Todos los reportes
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");                            
                            respuesta.end();
                            throw err;
                        }
                    var texto = "";   
                    async.eachSeries(lista,
                        // Funcion donde cada elemento de lista es pasado
                     function(r, callback){
                         var lista_act = "";
                        // Vemos si actividad existe
                        db.each("SELECT descripcion  FROM Actividades WHERE asesor = ? " +
                        "AND cliente = ? AND dia = ? AND mes = ? AND anio = ? ",
                        [   r[2],r[1],r[4],
                            r[5],r[6]
                        ], 
                        function(err, row) {
                        if (err){
                            console.log(err);
                            respuesta.write("Error obteniendo reportes"+"\n");
                            throw err;
                        }
                        else {
                        lista_act = lista_act + row.descripcion + "\n";
                        }
                        },
                    function(err, num){ // Termine Todos las actividades
                        if (err){
                            console.log(err);
                            console.log("Error obteniendo actividades"+"\n");
                            callback();
                            throw err;
                        }
                        else {
                        texto = texto + "|" + r[0] + "|" +
                            r[1] + "|" +
                            r[2] + "|" +
                            r[3] + "|" +
                            r[4] + "|" +
                            r[5] + "|" +
                            r[6] + "|" +
                            r[7] + "|" +
                            r[8] + "|" +
                            r[9] + "|" + "\n" + lista_act;
                        callback();
                        }
                        }
                        ); 
                    },
                    // Cuando terminaron todos los eliminar actividades
                    function(err){
                        if (err){
                            console.log(err);
                            respuesta.end("Error: Problemas en actividades"+ "\n");
                            db.close();
                        }
                        else{
                            console.log("Exito operacion");
                            respuesta.write("Cantidad de Reportes|" + contadorReportes + "\n");
                            respuesta.end(texto);
                            db.close();  
                        }
                    }); // Termino async actividades  
                    });
    } catch (err) {
        // manejamos error
        console.log(err);
    }
}


exports.resumenReportesAsesor = resumenReportesAsesor;
exports.resumenReportesCliente = resumenReportesCliente;













exports.pruebaActualizarInsertar = pruebaActualizarInsertar;
exports.actualizarServidorInsertar = actualizarServidorInsertar;
exports.pruebaActualizarEliminar = pruebaActualizarEliminar;
exports.actualizarServidorEliminar = actualizarServidorEliminar;











// Exportamos funciones
exports.login = login;
exports.subirLogin = subirLogin;
exports.registro = registro;
exports.subirRegistro = subirRegistro;
exports.reporte = reporte;
exports.subirReporte = subirReporte;
exports.listaUsuarios = listaUsuarios;
exports.listaClientes = listaClientes;
exports.favicon = favicon;
exports.logo = logo;
exports.subirReportes = subirReportes;
exports.reportesAsesor = reportesAsesor;
exports.subirReportesAsesor = subirReportesAsesor;
exports.reportesCliente = reportesCliente;
exports.subirReportesCliente = subirReportesCliente;
exports.editarReporte = editarReporte;
exports.subirEditarReporte = subirEditarReporte;
exports.eliminarReporte = eliminarReporte;
exports.subirEliminarReporte = subirEliminarReporte;
exports.registroCliente = registroCliente;
exports.subirRegistroCliente = subirRegistroCliente;
exports.eliminarBaseDatos = eliminarBaseDatos;
exports.subirEliminarBaseDatos = subirEliminarBaseDatos;
exports.verBaseDatos = verBaseDatos;
exports.verActividad = verActividad;
exports.subirVerActividad = subirVerActividad;
exports.actividad = actividad;
exports.subirActividad = subirActividad;
exports.eliminarActividad = eliminarActividad;
exports.subirEliminarActividad = subirEliminarActividad;
exports.actividadesAsesor = actividadesAsesor;
exports.subirActividadesAsesor = subirActividadesAsesor;
exports.resumenReportes = resumenReportes;
exports.index = index;
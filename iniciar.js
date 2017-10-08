/**
 * iniciar.js:
 * ----------
 *    Funcion principal que pone en funcionamiento el servidor 
 * y sus dependencias (Base de datos, enrutadores y manejadores)
 *
 * Seccion # 1
 * Redes de Computadoras I (CI-4835)
 * Universidad Simon Bolivar, 2016.
 */

//Dependencias
var servidor = require("./servidor");
var rutas = require("./router");
var manejadorSolicitudes = require("./manejador");
var baseDatos = require("./basedatos");
var manejador = {};
var moment = require('moment');

manejador["/"] = manejadorSolicitudes.index;
manejador["/login"] = manejadorSolicitudes.login;
manejador["/subirLogin"] = manejadorSolicitudes.subirLogin;
manejador["/registro"] = manejadorSolicitudes.registro;
manejador["/subirRegistro"] = manejadorSolicitudes.subirRegistro;
manejador["/reporte"] = manejadorSolicitudes.reporte;
manejador["/subirReporte"] = manejadorSolicitudes.subirReporte;
manejador["/verActividad"] = manejadorSolicitudes.verActividad;
manejador["/subirVerActividad"] = manejadorSolicitudes.subirVerActividad;
manejador["/actividad"] = manejadorSolicitudes.actividad;
manejador["/subirActividad"] = manejadorSolicitudes.subirActividad;
//manejador["/editarActividad"] = manejadorSolicitudes.editarActividad;
manejador["/eliminarActividad"] = manejadorSolicitudes.eliminarActividad;
//manejador["/subirEditarActividad"] = manejadorSolicitudes.subirEditarActividad;
manejador["/subirEliminarActividad"] = manejadorSolicitudes.subirEliminarActividad;
manejador["/listaUsuarios"] = manejadorSolicitudes.listaUsuarios;
manejador["/listaClientes"] = manejadorSolicitudes.listaClientes;
manejador["/subirReportes"] = manejadorSolicitudes.subirReportes;
manejador["/subirReportesAsesor"] = manejadorSolicitudes.subirReportesAsesor;
manejador["/subirReportesCliente"] = manejadorSolicitudes.subirReportesCliente;
manejador["/reportesAsesor"] = manejadorSolicitudes.reportesAsesor;
manejador["/reportesCliente"] = manejadorSolicitudes.reportesCliente;
manejador["/editarReporte"] = manejadorSolicitudes.editarReporte;
manejador["/subirEditarReporte"] = manejadorSolicitudes.subirEditarReporte;
manejador["/eliminarReporte"] = manejadorSolicitudes.eliminarReporte;
manejador["/subirEliminarReporte"] = manejadorSolicitudes.subirEliminarReporte;
manejador["/registroCliente"] = manejadorSolicitudes.registroCliente;
manejador["/subirRegistroCliente"] = manejadorSolicitudes.subirRegistroCliente;
manejador["/favicon.ico"] = manejadorSolicitudes.favicon;
manejador["/logo.png"] = manejadorSolicitudes.logo;
manejador["/baseDatos.db"] = manejadorSolicitudes.verBaseDatos;
manejador["/eliminarBaseDatos"] = manejadorSolicitudes.eliminarBaseDatos;
manejador["/subirEliminarBaseDatos"] = manejadorSolicitudes.subirEliminarBaseDatos;
manejador["/actividadesAsesor"] = manejadorSolicitudes.actividadesAsesor;
manejador["/subirActividadesAsesor"] = manejadorSolicitudes.subirActividadesAsesor;

manejador["/pruebaActualizarInsertar"] = manejadorSolicitudes.pruebaActualizarInsertar;
manejador["/actualizarServidorInsertar"] = manejadorSolicitudes.actualizarServidorInsertar;
manejador["/pruebaActualizarEliminar"] = manejadorSolicitudes.pruebaActualizarEliminar;
manejador["/actualizarServidorEliminar"] = manejadorSolicitudes.actualizarServidorEliminar;
manejador["/resumenReportes"] = manejadorSolicitudes.resumenReportes;
manejador["/resumenReportesAsesor"] = manejadorSolicitudes.resumenReportesAsesor;
manejador["/resumenReportesCliente"] = manejadorSolicitudes.resumenReportesCliente;
manejador["/index"] = manejadorSolicitudes.login;

baseDatos.iniciar();
moment.locale('es');
var fecha = moment().format('MMMM D YYYY, h:mm:ss a');
console.log("Servidor iniciado: " + fecha);
servidor.iniciar(rutas.rutas,manejador);
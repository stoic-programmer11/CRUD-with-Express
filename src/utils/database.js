const {Sequelize} = require('sequelize');

// Creamos una instancia con parametros de conf de nuestra
// base de datos


// Necesitamos un objeto de configuracion
// Esto no es mas que las CREDENCIALES(user,password) de nuestra bd
const db = new Sequelize({
    database: "todoapp2",
    username: "postgres",
    host: "localhost",
    port: "5432",
    password: "root",
    dialect: "postgres",
})

module.exports = db;
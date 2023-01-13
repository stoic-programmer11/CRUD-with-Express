// Instancia para la conexion de la bd

const { DataTypes } = require('sequelize');
const db = require('../utils/database');

// Tipos de datos de sequelize 
// Convertir los tipos de datos de sql VARCHAR
// A sequelize VARCHAR -> STRING (Js)

// https://sequelize.org/docs/v7/other-topics/other-data-types/



// Definir el modelo de usuarios
// los modelos se definen con una Mayuscula

// parametros, nombre de la tabla, atributos

const Users = db.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Users;
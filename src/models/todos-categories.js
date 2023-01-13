const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Categories = require('./categories.models');
const Todos = require('./todos.models')

const TodosCategories = db.define("todos_categories", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    },
    categoriesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "categories_id",
        references: {
            model: Categories,
            key: "id",
        }
    },
    todoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "todo_id",
        references: {
            model: Todos,
            key: "id",
        }
    },

}, {
    timestamps: false,
});

module.exports = TodosCategories;
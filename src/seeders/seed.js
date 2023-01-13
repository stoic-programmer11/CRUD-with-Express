const db = require('../utils/database');

const Users = require('../models/users.model');
const Todos = require('../models/todos.models');


const users = [
    { username: 'Ianacus', email: 'ian@gmail.com', password: "1234" },
    { username: 'Jhorman', email: 'jhorman@gmail.com', password: "1234" },
    { username: 'Lucero', email: 'lucero@gmail.com', password: "1234" },
];

const todos = [
    { title: 'Tarea 1', description: 'shalala shalala', userId: 1 },
    { title: 'Tarea 2', description: 'shalala shalala', userId: 1 },
    { title: 'Tarea imposible', userId: 2 },
    { title: 'Dormir', description: 'Porque node no me deja', userId: 3 },
];

// const categories = []

// const todosCategories = []

db.sync({ force: true })
    .then(() => {
        console.log('Insertando la semilla >:D');
        users.forEach((user) => Users.create(user));

        setTimeout(() => {
            todos.forEach((todo) => Todos.create(todo));
        }, 100);
    })


    .catch((error) => console.log(error));
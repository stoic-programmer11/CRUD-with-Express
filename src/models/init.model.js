// Vamos a importar nuestros modelos creados

const Users = require('./users.model');
const Todos = require('./todos.models');
const Categories = require('./categories.models');
const TodosCategories = require('./todos-categories');


const initModels = () => {

    // Categories;
    // TodosCategories;

    // Aqui van las relacions
    // hasOne -> tiene uno
    // hasMany -> tiene muchos
    // belongsTo -> pertenece a 
    Todos.belongsTo(Users);
    Users.hasMany(Todos);

    // Relacion M-M (Muchos a muchos)
    TodosCategories.belongsTo(Todos, { as: 'task', foreignKey: 'todo_id' });
    Todos.hasMany(TodosCategories, { as: 'task', foreignKey: "todo_id" });

    TodosCategories.belongsTo(Categories, { as: 'category', foreignKey: "category_id" });
    Categories.hasMany(TodosCategories, { as: 'task', foreignKey: "category_id" });
}


module.exports = initModels; 
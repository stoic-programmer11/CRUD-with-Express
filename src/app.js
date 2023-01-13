// Importamos express

const express = require('express');
const db = require('./utils/database');
const initModels = require('./models/init.model');
const Users = require('./models/users.model');
const Todos = require('./models/todos.models');


const app = express();
app.use(express.json());


const PORT = 8000;



// probando la conexion a la base de datos
db.authenticate()
    .then(() => console.log("Autenticacion exitosa"))
    .catch((error) => console.log(error))

// Ejecutamos el inicializador 
initModels();

// Usamos el metodo sync para sincronizar la info de la BD
// Devuelve una promesa y la resolvemos con then
db.sync({ force: false })
    .then(() => console.log('Base de datos sincronizada'))
    .catch((error) => console.log(error))

app.get('/', (req, res) => {
    res.status(200).json({ message: "Bienvenido al servidor" });
});


// definir las rutas de nuestros endpoints (de ahora en adelante)
// todas las consultas de usuarios
// localhost:8000/users -> todo para usuarios
// localhost:8000/todos -> todo para tareas

// GET a /users
app.get('/users', async (req, res) => {
    try {
        // vamos a obtener el resultado de consultar a 
        // todos los usuarios de la Db
        const result = await Users.findAll(); // SELECT * FROM users;
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
})

// Obtener un usuario sabiendo su id
app.get('/users/:id', async (req, res) => {
    try {
        // El .params es :id
        console.log(req.params); // {id: 2}
        // Destructurar guardad ese parametro en la var id
        const { id } = req.params;
        // const id = req.params.id
        const result = await Users.findByPk(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

// Obtener un usuario sabiendo su username
app.get('/users/username/:username', async (req, res) => {
    try {
        console.log(req.params);
        const { username } = req.params;
        // SELECT * FROM users WHERE username = Iannacus
        const result = await Users.findOne({ where: { username: username } });
        // const result = await Users.findOne({ where: { username } });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});


// Creando un usuario
app.post('/users', async (req, res) => {
    try {
        const user = req.body;
        const result = await Users.create(user);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error);
    }
});


// Actualizar un usuario, solo podemos cambiar el password
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const field = req.body;
        const result = await Users.update(field, {
            where: { id: id }
            // where: {id}
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Eliminar un usuario
app.delete('/users/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const result = await Users.destroy({
            where: { id } // where: {id: id}
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
// Entregable 2 - TodosApp

app.get('/todos', async (req, res) => {
    try {
        const result = await Todos.findAll();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

// Obteneruna tarea por id
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todos.findByPk(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

// Crear un nuevo Todo
app.post('/todos', async (req, res) => {
    try {
        const todo = req.body;
        const result = await Todos.create(todo);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Actualizar un Todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const field = req.body;
        const result = await Todos.update(field, {
            where: { id }
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Eliminar un Todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todos.destroy({
            where: { id: id }
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Vamos a terminar los modelos
// Crear las relaciones entre los modelos
// Insertar informacion desde el proyecto

// Estar haciendo los endpoints y consultas

// users

// C12
// Vamos a insertar infor en nuestra bd
// Desde nuestro proyecto de node

// consultar la info con endpoints
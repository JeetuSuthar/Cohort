const express = require("express");
const app = express();

let todos = []; // Array to store todos

// Use express.json() middleware to parse incoming JSON requests
app.use(express.json());

// POST: Add a new todo
app.post('/', function (req, res) {
    const {title , id } = req.body;

    todos.push({
        title:title,
        id:id
    })

    res.status(200).json({message:"Added the todo ", todos})

});

// DELETE: Remove a todo by its id
app.delete('/:id', function (req, res) {
    const id = (req.query.id); // Get id from URL params
    

    // Filter out the todo with the matching id
    todos = todos.filter(todo => todo.id !== id);

    // Send a response indicating success
    res.status(200).json({ message: "Todo deleted successfully", todos });
});

// GET: Retrieve all todos
app.get('/', function (req, res) {
    res.json({
        todos
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});




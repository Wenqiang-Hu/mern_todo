const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./model/template");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://127.0.0.1:27017/mern_todo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

app.get("/todo", async (req, res) => {
    const todo = await Todo.find();

    res.json(todo);
});

app.post("/todo/new", (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
    });
    newTodo.save();
    res.json(newTodo);
});

app.delete("/todo/delete/:id", async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo)

});
app.put("/todo/complete/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
});

// Start the server
app.listen(3002, () => {
    console.log("Server started on port 3002");
});

import React, { useState, useEffect } from "react";

const baseURL = "http://localhost:3002";

function App() {
    const [todo, setTodo] = useState([]);
    const [popup, setPopup] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        fetch(baseURL + "/todo")
            .then((res) => res.json())
            .then((data) => setTodo(data))
            .catch((err) => console.log("Error: ", err));

        console.log(todo);
    };
    const completeTodo = async (id) => {
        const data = await fetch(baseURL + "/todo/complete/" + id, {
            method: "PUT",
        }).then((res) => res.json());

        setTodo((todo) =>
            todo.map((t) => {
                if (t._id === data._id) {
                    t.complete = data.complete;
                }
                return t;
            })
        );
    };

    const deleteTodo = async (id) => {
        const data = await fetch(baseURL + "/todo/delete/" + id, {
            method: "Delete",
        }).then((res) => res.json());

        setTodo((todo) =>
            todo.filter((t) => {
                return t._id !== data._id;
            })
        );
    };

    const addTodo = async () => {
        const data = await fetch(baseURL + "/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: newTodo,
            }),
        }).then((res) => res.json());
        setTodo([...todo, data]);
        setPopup(false);
        setNewTodo("");
    };

    return (
        <div className="App">
            <h1>Welcome, Will</h1>
            <h4>Your Task</h4>
            <div className="todos">
                {todo.map((t) => (
                    <div
                        className={"todo " + (t.complete ? "is-complete" : "")}
                        key={t._id}
                    >
                        <div
                            className="checkbox"
                            onClick={() => completeTodo(t._id)}
                        ></div>
                        <div
                            className="text"
                            onClick={() => completeTodo(t._id)}
                        >
                            {t.text}
                        </div>
                        <div
                            className="delete-todo"
                            onClick={() => deleteTodo(t._id)}
                        >
                            X
                        </div>
                    </div>
                ))}
            </div>

            <div className="addPopup" onClick={() => setPopup(true)}>
                +
            </div>

            {popup ? (
                <div className="popup">
                    <div className="closePopup" onClick={() => setPopup(false)}>
                        X
                    </div>
                    <div className="content">
                        <h3>Add Task</h3>
                        <input
                            type="text"
                            className="add-todo-input"
                            onChange={(e) => setNewTodo(e.target.value)}
                            value={newTodo}
                        />
                        <div className="button" onClick={addTodo}>
                            Create Task
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default App;

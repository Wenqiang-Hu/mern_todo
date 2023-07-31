function App() {
    return (
        <div className="App">
            <h1>Welcome, Will</h1>
            <h4>Your Task</h4>
            <div className="todos">
                <div className="todo">
                    <div className="checkbox"></div>
                    <div className="text">get the milk</div>
                    <div className="delete-todo">X</div>
                </div>
                <div className="todo is-complete">
                    <div className="checkbox"></div>
                    <div className="text">get the milk</div>
                    <div className="delete-todo">X</div>
                </div>
            </div>
        </div>
    );
}

export default App;

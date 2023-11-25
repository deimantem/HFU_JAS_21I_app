import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TodoList from "./Components/TodoList";

// TODO Add edit route
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoList />} />
                 <Route path="/entity/:id" element={<TodoDetail />} />
                 <Route path="/create" element={<AddTodoForm />} />
            </Routes>
        </Router>
    );
};

export default App;